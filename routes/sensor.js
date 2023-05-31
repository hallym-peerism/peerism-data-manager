const express = require('express')
const router = express.Router()
const models = require('../models')
const {assertBlockChain, SHA256} = require("../lib/blockchain");
const {getPeers, hasSensor} = require("../communications/node-tracker");

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

router.post("/:sensorid/:valueid/:value", async function (req, res) {
    models.svalue.create({
        sensorid: SHA256(
            req.params.sensorid +
            req.params.valueid +
            req.params.value
        ),
        valueid: 1,
        value: 314,
        beforehash: beforehash
    })
    let peers = await getPeers("127.0.0.1", 8000)
    let hasResults = await Promise.all(peers.map(hasSensor(req.params.sensorid)))
    let availablePeers = peers.filter((_, i) => hasResults[i])
    availablePeers.map()
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
