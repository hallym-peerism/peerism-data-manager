const express = require('express')
const expressApp = express()
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }))

const sqlite3 = require("sqlite3");
const port = 11000
const fs = require("fs")
const db = new sqlite3.Database("./data.db")


const bodyParser = require('body-parser');
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
expressApp.use(cors());

  

const models = require("./models/")

// models.repo.create({
//     sensorid : "1234",
//     title : "제목1",
//     description : "소개",
// })

// models.svalue.create({ 
//     sensorid: "1234",
//     valueid: 12,
//     value: 314,
//     beforehash: "null"
// })
// .then(_ => models.svalue.findAll())
// .then(records => console.log(JSON.stringify(records, null, 4)))

expressApp.use("/sensor", require("./routes/sensor"))
expressApp.use("/sensors", require("./routes/sensors"))
expressApp.use("/searchApi", require("./routes/searchApi"))
expressApp.use("/view", require("./routes/view"))

expressApp.post('/new-repo', (req, res) => {
    console.log(req.body)

    res.send(req.body)
})

expressApp.get('/values', (req, res) => {
    const sensorid = req.body.sensorid
    rows = []
    db.each(`
        select valueid, value, beforehash 
        from svalues 
        where sensorid=${sensorid}
    `, (err, row) => {
        rows.push(row)
    }, (err, count) => {
        res.send(rows)
    })
})

expressApp.get('/', (req, res) => {
    res.send('Hello World!')
})


// /**
//  * use this endpoint when central server sends senser datas.
//  */
// expressApp.post("/send-value", (req, res) => {
//     console.log(req.body)
//     // TODO: implementation of saving data using filesystem or database.
//
//     res.send(JSON.stringify({
//         success: true
//     }))
// })


expressApp.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

