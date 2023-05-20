const http = require("http");

function getPeers(url, port) {
    return new Promise((resolve, reject) => {
        http.get({
            hostname: url,
            port: port,
            path: '/nodes',
            agent: false,
        }, (res) => {
            resolve(res)
        })
    })
}

module.exports = {
    getPeers: getPeers
}