const express = require('express')
const router = express.Router()
const models = require('../models')

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

    function hash(block) {
        return "hash" // TODO: define a hash function.
    }

    if (records.length < 2) {
        res.send("true")
        return
    }

    for (let i = 1; i < records.length; i++) {
        if (hash(records[i - 1]) !== records[i].beforehash) {
            res.send("false")
            return
        }
    }

    res.send("true")
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