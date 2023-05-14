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

new Promise((resolve, reject) => resolve(db))
    .then(db => new Promise((resolve, reject) => {
        db.run("drop table if exists repos", err => {
            resolve(db)
        })
    }))
    .then(db => new Promise((resolve, reject) => {
        db.run("drop table if exists svalues", err => {
            resolve(db)
        })
    }))
    .then(db => new Promise((resolve, reject) => {
        db.run("create table if not exists repos(sensorid,title,description)", err => {
            resolve(db)
        })
    }))
    .then(db => new Promise((resolve, reject) => {
        db.run("create table if not exists svalues(sensorid integer,valueid integer,value integer,beforehash text)", err => {
            console.log(this)
            resolve(db)
        })
    }))
    .then(db => new Promise((resolve, reject) => {
        db.run("insert into repos(sensorid,title,description) values(?,?,?)", 0, "alice", "alice's sensor", err => {
            resolve(db)
        })
    }))
    .then(db => db.each("select * from repos", (err, row) => {
        console.log(`${row.sensorid} ${row.title} ${row.description}`);
    }, err => {
        db.close()
    }))

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


/**
 * use this endpoint when central server sends senser datas.
 */
expressApp.post("/send-value", (req, res) => {
    console.log(req.body)
    // TODO: implementation of saving data using filesystem or database.

    res.send(JSON.stringify({
        success: true
    }))
})

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

    mainWindow.loadFile('index.html')

    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    http.get({
        hostname: '192.168.0.12',
        port: 80,
        path: `/hello?address=${address}`, // TODO: Get address.
        agent: false,
    }, (res) => {
        console.log(res)
    })
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    http.get({
        hostname: '192.168.0.12',
        port: 80,
        path: '/bye',
        agent: false,
    }, (res) => {
        console.log(res)
    })
    if (process.platform !== 'darwin') app.quit()
})
