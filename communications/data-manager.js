const http = require("http");
const Peer = require("../datatypes/peer")
const Repo = require("../datatypes/repo")

/**
 * 
 * @param {Peer} peer 
 * @returns {Promise<[Repo]>}
 */
function getSensorList(peer) {
    return new Promise((resolve, reject) => {
        http.get({
            hostname: peer.address,
            port: peer.port,
            path: '/sensors',
            agent: false,
        }, (res) => {
            resolve(JSON.parse(res).map(Repo.from))
        })
    })
}

module.exports = {
    getSensorList: getSensorList
}