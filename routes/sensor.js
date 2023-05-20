const express = require('express');
const router = express.Router();
const models = require('../models')

router.get('/:sensorid', function (req, res) {
    models.svalue.findAll({
        where: {
            sensorid: req.params.sensorid
        }
    }).then(records => {
        res.send(JSON.stringify(records, null, 4))
    })
})

router.delete("/:sensorid", function(req, res) {
    models.svalue.destroy({
        where: { sensorid: req.params.sensorid }
    }).then(_ => res.send("success"))
})

router.delete('/:sensorid/:valueid', function(req, res) {
    models.svalue.destroy({
        where: {
            sensorid: req.params.sensorid,
            valueid: req.params.valueid
        }
    }).then(_ => res.send("success"))
})

module.exports = router;