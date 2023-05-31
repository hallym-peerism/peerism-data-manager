const express = require('express')
const router = express.Router()
const models = require('../models')
const {getPeers} = require("../communications/node-tracker");
const {assertBlockChain, SHA256} = require("../lib/blockchain");

router.get('/getSensor' ,async function (req, res) {
    await models.repo.findAll({
            where: { sensorid: req.params.sensorid },
            order : [ [ 'createdAt', 'DESC' ]],
        }
    )
        .then((repos) => {
            repos.forEach((repo) => {
            
                models.svalue.findAll({
                    where : {sensorid : repo.sensorid},
                }).then((svlause) => {


                    if(svalues.length == 0){
                        console.error("/getSensor : sensorId에 해당하는 데이터가 없음")
                        res.status(404).send("포트포워딩된 IP가 존재하지 않음")
                    }
                    
                    const port = 100080
                    const ip = "localhost"
                    
                    const inputurl = "http://"+ ip +":" + port + "/view/addSensorData/" + repo.sensorId  + "/{value}"
                    const exporturl = "http://"+ ip +":" + port + "/view/exportSensorData/" + repo.sensorId 

                    response = {
                        sensorId : repo.sensorid,
                        title : repo.title,
                        description : repo.description,
                        values : svlause,
                        inputurl : inputurl,
                        exporturl : exporturl
                    }

                } )
            })
        })

        res.send(response)
})

router.get('/view/addSensorData/:sensorId/:values', async (req, res) => {
    await models.svalue.create({
        sensorid: req.params.sensorid,
        value: req.params.value,
        beforehash: SHA256(lastBlock.dataValues) // 어떻게 짤지 고민.
    }).then(() => {
        res.send("success")
    }).catch(() => {
        res.status(404).send(" /view/addSensorData/:sensorId/:values fail")
    })
   
})


router.get('/view/exportSensorData/:sensorid', async (req, res) => {
    const datas = await models.svalue.findAll({
        where: {
            sensorid: req.params.sensorid
        }
    }).then(records => {
        res.send(JSON.stringify(records))
    }).cathc(() => {
        res.status(404).send(" /view/exportSensorData/:sensorid fail")
    }) 


})


module.exports = router