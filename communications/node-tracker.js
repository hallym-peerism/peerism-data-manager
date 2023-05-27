const http = require("http");
const Peer = require("../datatypes/peer")

/**
 * 
 * @param {string} url address of node-tracker
 * @param {number} port port of node-tracker
 * @returns {Promise<[Peer]>}
 */
function getPeers(url, port) {
    

    return new Promise((resolve, reject) => {
        http.get({
            hostname: url,
            port: port,
            path: '/nodes',
            agent: false,
        }, (res) => {
            resolve(JSON.parse(res).map(Peer.from))
        })
    })
}

module.exports = {
    getPeers: getPeers
}