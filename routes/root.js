const express = require('express')
const router = express.Router()
const models = require('../models')

// const sequelize = require('sequelize')
// const repo = require('../models/repo')(sequelize, sequelize.DataTypes)

router.get("/hasSensor", async (req, res) => {
    let sensorID = req.query.sensorID
    let result = await models.repo.findOne({
        where: {
            sensorid: sensorID
        }
    }).then(repo => repo !== null)
    res.send(result)
})