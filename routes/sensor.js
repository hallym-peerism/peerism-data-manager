const express = require('express')
const router = express.Router()
const models = require('../models')
const {assertBlockChain, SHA256} = require("../lib/blockchain");

// const sequelize = require('sequelize')
// const svalue = require('../models/svalue')(sequelize, sequelize.DataTypes)

router.get('/:sensorid', function (req, res) {
    models.svalue.findAll({
        where: {
            sensorid: req.params.sensorid
        }
    }).then(records => {
        res.send(JSON.stringify(records, null, 4))
    })
})

router.get('/validation/:sensorid', async function (req, res) {
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

router.post('/add-value', async function (req, res) {

})

router.delete("/:sensorid", function (req, res) {
    models.svalue.destroy({
        where: { sensorid: req.params.sensorid }
    }).then(_ => res.send("success"))
})

router.delete('/:sensorid/:valueid', function (req, res) {
    models.svalue.destroy({
        where: {
            sensorid: req.params.sensorid,
            valueid: req.params.valueid
        }
    }).then(_ => res.send("success"))
})

module.exports = router