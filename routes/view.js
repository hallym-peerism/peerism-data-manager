const express = require('express')
const router = express.Router()
const models = require('../models')
const { getPeers } = require("../communications/node-tracker");
const { assertBlockChain, SHA256 } = require("../lib/blockchain");

router.get('/getSensors/', async function (req, res) {
    responses = []


    await models.repo.findAll({
        order: [['createdAt', 'DESC']],
    }).then(async (repos) => {

        for (let repo of repos) {

            response = {
                sensorid: repo.sensorid,
                title: repo.title,
                description: repo.description,
            }
            const port = 100080
            const ip = "localhost"
            const inputurl = `http://${ip}:${port}/:${repo.sensorid}/:valueid/:value/:init/`
            const exporturl = "http://" + ip + ":" + port + "/view/exportSensorData/" + repo.sensorid
            response['inputurl'] = inputurl
            response['exporturl'] = exporturl

            await models.svalue.findAll({
                where: { sensorid: repo.sensorid },
                order: [['createdAt', 'DESC']],
            }).then((svalues) => {
                const values = JSON.parse(JSON.stringify(svalues))
                response['values'] = values.map((value) => value.value)
                response['createdAt'] = values.map((value) => value.createdAt)

                responses.push(response)
                return
            }).catch((err) => {
                console.error(err)
            })

        }
    })

    res.setHeader('Content-Type', 'application/json').send(responses)

})

router.get('/exportSensorData/:sensorid', async (req, res) => {
    const datas = await models.svalue.findAll({
        where: {
            sensorid: req.params.sensorid
        }
    }).then(records => {
        res.send(JSON.stringify(records))
    }).catch((err) => {
        console.error(err)
        res.status(404).send(" /view/exportSensorData/:sensorid fail")
    })


})


module.exports = router