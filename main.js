const { app, BrowserWindow } = require('electron')
const path = require('path')
const http = require('http')
const url = require('url')

const express = require('express')
const expressApp = express()
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }))

const sqlite3 = require("sqlite3");
const port = 11000
const fs= require("fs")
const db = new sqlite3.Database("./data.db")

const models = require("./models/")
// console.log("models:")
// console.log(Object.keys(models.repo))

models.svalue.create({
    sensorid: "123",
    valueid: 1,
    value: 314,
    beforehash: "null"
})
.then(_ => models.svalue.findAll())
.then(records => console.log(JSON.stringify(records, null, 4)))

expressApp.use("/sensor", require("./routes/sensor"))
expressApp.use("/sensors", require("./routes/sensors"))


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

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('views/index.html')

    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
