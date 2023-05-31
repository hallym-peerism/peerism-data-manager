const express = require('express')
const router = express.Router()
const models = require('../models')
const {assertBlockChain, SHA256} = require("../lib/blockchain");
const {getPeers, hasSensor, insertSensorValue} = require("../communications/node-tracker");

// const sequelize = require('sequelize')
// const svalue = require('../models/svalue')(sequelize, sequelize.DataTypes)

router.get("/:sensorid", function (req, res) {
    models.svalue.findAll({
        where: {
            sensorid: req.params.sensorid
        }
    }).then(records => {
        res.send(JSON.stringify(records, null, 4))
    })
})

router.get("/validation/:sensorid", async function (req, res) {
    let records = await models.svalue.findAll({
        where: {
            sensorid: req.params.sensorid
        }
    })

    let assertion = assertBlockChain(records,
        record => SHA256(record.sensorid + record.value),
        record => record.beforehash
    )
    res.send(assertion)
})

router.post("/:sensorid/:valueid/:value/:init", async function (req, res) {
    let lastBlock = await models.svalue.findOne({
        where: { sensorid: req.params.sensorid },
        order: [ [ 'createdAt', 'DESC' ]],
    }).dataValues

    models.svalue.create({
        sensorid: req.params.sensorid,
        valueid: req.params.valueid,
        value: req.params.value,
        beforehash: lastBlock === null ? "" : SHA256(lastBlock.sensorid + lastBlock.valueid + lastBlock.value)
    })
    if (req.params.init === "false") return
    let peers = await getPeers("127.0.0.1", 8000)
    let hasResults = await Promise.all(peers.map(hasSensor(req.params.sensorid)))
    let availablePeers = peers.filter((_, i) => hasResults[i])
    availablePeers.map(
        insertSensorValue(
            req.params.sensorid,
            req.params.valueid,
            req.params.value
        ))
})

router.delete("/:sensorid", function (req, res) {
    models.svalue.destroy({
        where: { sensorid: req.params.sensorid }
    }).then(_ => res.send("success"))
        .catch(reason => res.send(reason))
})

router.delete("/:sensorid/:valueid", function (req, res) {
    models.svalue.destroy({
        where: {
            sensorid: req.params.sensorid,
            valueid: req.params.valueid
        }
    }).then(_ => res.send("success"))
})

module.exports = router
