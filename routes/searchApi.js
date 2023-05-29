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
            title: { [Op.like]: `%${title}%` }
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
                console.error("/search/", query, " 에서 에러 발생 : ", err)
            })

        }
        const response = []

        const snridSet = new Set()
        sensorList.forEach(snr => {

            if (snridSet.has(snr.sensorid)) {
                const result = response.filter(item =>
                    item.sensorid === snr.sensorid
                )[0]['count'] += 1
            } else {
                snridSet.add(snr.sensorid)
                snr['count'] = 1
                response.push(snr)
            }

        })

        res.send(response)

        return
    })

})

/*
    repo.sensorid를 등록된 피어들에게 요청하여 해당 sensorid의 데이터를 가져온다.
*/
router.post('/addRepo', async function (req, res, next) {

    const repo = req.body

    // 등록된 데이터가 repo가 있는지 조회
    await models.repo.findAll({
        where: {
            sensorid: repo.sensorid
        }
    }).then((repos) => {
        repos = JSON.parse(JSON.stringify(repos))
        if (repos.length > 0) {
            res.status(404).send("이미 등록된 sensorid 입니다.")
            return
        }

        models.repo.create({
            sensorid: repo.sensorid,
            title: repo.title,
            description: repo.description
        }).then(() => {
            res.send()
        }).catch(err => {
            console.error("error : " + err)
            res.status(404).send("404 에러")
        })
        getPeers(centerIp, centerPort).then(async (peers) => {

            for (let peer of peers) {

                const url = `http://${peer.address}:${peer.port}/searchApi/getSensorValues/${repo.sensorid}`

                await axios.get(url).then(response => {
                    const datas = response.data
                    if (datas) { //data 가 비어있지 않다면
                        datas.forEach(svalue => {
                            models.svalue.create({
                                sensorid: svalue.sensorid,
                                time: svalue.time,
                                value: svalue.value,
                                valueid: svalue.valueid,
                                beforehash: svalue.beforehash
                            }).catch(err => {
                                console.error(err)
                            })
                        })

                        return // 강제 종료
                    }
                }).catch(err => {
                    console.error("/addRepo", " 에서 에러 발생 : ", err)
                })
            }
        })


    }).catch(err => {
        console.error("error : " + err)
        res.status(404).send("404 에러")
    })


})

/*
해당 sensorid를 보유하고 있으면 svalues 값을 json 형태로 반환.
*/
router.get('/getSensorValues/:sensorid', (req, res, next) => {

    models.svalue.findAll({
        where: {
            sensorid: req.params.sensorid
        }
    }).then((datas) => {
        res.send(datas)

    }).catch((err) => {
        console.error("/getSensorValues/", req.params.sensorid, " error : ", err)
    })

})
// models.repo.create({
//     sensorid : "1234",
//     title : "제목1",
//     description : "소개",
// })
module.exports = router


