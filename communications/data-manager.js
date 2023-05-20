const http = require("http");
const Peer = require("../datatypes/peer")

/**
 * 
 * @param {Peer} peer 
 * @returns {}
 */
function getSensorList(peer) {
    return new Promise((resolve, reject) => {
        http.get({
            hostname: peer.address,
            port: peer.port,
            path: '/sensors',
            agent: false,
        }, (res) => {
            resolve(JSON.parse(res).map(Peer.from))
        })
    })
}

module.exports = {
    getPeers: getPeers
}