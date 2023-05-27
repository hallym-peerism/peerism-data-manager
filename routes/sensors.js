const express = require('express')
const router = express.Router()
const models = require('../models')
const {getPeers} = require("../communications/node-tracker");

// const sequelize = require('sequelize')
// const repo = require('../models/repo')(sequelize, sequelize.DataTypes)

router.get('/', async function (req, res) {
    let records = await models.repo.findAll()
    res.json(records)
})

/**
 * Raw object of Repo
 * @typedef {Object} JSONParsedRepo
 * @property {number} sensorid - sensor ID
 * @property {string} title - sensor title
 * @property {boolean} description - sensor description
 */

router.post('/', async function (req, res) {
    /**
     * @type {JSONParsedRepo}
     */
    req.body

    models.repo.create(req.body)
        .then(_ => res.send("success"))

    getPeers("", 8000)
        .then(peers => {
            peers[0].address
        })
})

module.exports = router