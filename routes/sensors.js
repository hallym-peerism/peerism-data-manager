const express = require('express')
const router = express.Router()
const models = require('../models')

const sequelize = require('sequelize')
const repo = require('../models/repo')(sequelize, sequelize.DataTypes)

router.get('/', async function (req, res) {
    let records = await repo.findAll()
    res.json(records)
})

module.exports = router