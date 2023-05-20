const express = require('express')
const router = express.Router()
const models = require('../models')

// const sequelize = require('sequelize')
// const repo = require('../models/repo')(sequelize, sequelize.DataTypes)

router.get('/', async function (req, res) {
    let records = await models.repo.findAll()
    res.json(records)
})

router.post('/', async function (req, res) {
    models.repo.create(req.body)
        .then(_ => res.send("success"))
})

module.exports = router