

const express = require('express')
const expressApp = express() 
const port = 8081



expressApp.get('/', (req, res) => {
    res.send('Hello World!')
})

expressApp.post("/send-value", (req, res) => {
    console.log(req.body)
    res.send(JSON.stringify({
        success: true
    }))
})


expressApp.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



module.exports = expressApp

