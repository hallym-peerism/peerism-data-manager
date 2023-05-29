const express = require('express')
const router = express.Router()
const models = require('../models')
const { Op, json } = require('sequelize');
const axios = require('axios');
const { getPeers } = require('../communications/node-tracker');



const centerIp = "192.168.0.1"
const centerPort = "10080"

/**
 * 동료 peer로 부터 sensorid를 가지고 있는지 조회
 */
router.get("/hasSensorId/:sensorid", function (req, res) {

    const sid = req.params.sensorid


    models.repo.findAll({
        where: {
            sensorid: sid
        }
    }).then((repos) => {
        res.json(repos)
    }).catch(err => {
        console.error("error : " + err)
        res.status(404).send("404 에러")
    })

})


/**
 * 동료 peer로 부터 title이 있는지 조회 ( 부분 검색이 가능해야함)
 */
router.get("/hasTitle/:title", function (req, res) {

    const title = req.params.title
    models.repo.findAll({
        where: {
            title: { [Op.like] : `%${title}%` }
        }
    }).then((repos) => {
        res.json(repos)
    }).catch(err => {
        console.error("error : " + err)
        res.status(404).send("404 에러")
    })
})



/**
 * query를 입력받아 동료 peer들에게 동일한 sensorid 정보를 조회
 */
router.get('/search/:query', async function (req, res, next) {

    // 동료 피어들에게 요청
    const query = req.params.query;
    
    sensorList = new Array();

    getPeers(centerIp, centerPort).then(async (peers) => {
        let list;
        let url;
        for (let peer of peers) {

            if (query[0] == '~')
                url = `http://${peer.address}:${peer.port}/searchApi/hasSensorId/${query.slice(1, query.length)}`
            else
                url = `http://${peer.address}:${peer.port}/searchApi/hasTitle/${query}`

            

            await axios.get(url).then(response => { 
                const data = response.data
                data.forEach(e => sensorList.push(e))
            }).catch(err => {
                console.error("/search/", query," 에서 에러 발생 : ", err)
            })

        } 
        const response = []

        const snridSet= new Set()
        sensorList.forEach(snr => {
            
            if( snridSet.has(snr.sensorid)){
                const result = response.filter(item => 
                    item.sensorid === snr.sensorid
                    )[0]['count'] += 1 
            }else{
                snridSet.add(snr.sensorid)
                snr['count'] = 1
                response.push( snr )
            } 
                
        })

        res.send(response)

        return
    })

})




module.exports = router


