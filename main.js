// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const express = require('express')
const expressApp = express()
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }))

const sqlite3 = require("sqlite3");

const port = 11000

const fs = require("fs")


const db = new sqlite3.Database("./data.db")
db.run("drop table if exists repos")
    .run("create table if not exists repos(sensorid integer,title text,description text)")
    .run("create table if not exists svalues(sensorid integer,valueid integer,value integer,beforehash text)")
    // .run("insert into repos(id,title,description) values(?,?,?)", 0, "alice", "alice's sensor")
    .each("select * from repos", (err, row) => {
        console.log(`${row.sensorid} ${row.title} ${row.description}`);
    })
    .close()

expressApp.post('/new-repo', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

expressApp.get('/values', (req, res) => {
    req.body
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
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
