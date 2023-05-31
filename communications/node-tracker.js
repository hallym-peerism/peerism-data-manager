const http = require("http");
const Peer = require("../datatypes/peer")
const axios = require("axios");

// /**
//  *
//  * @param {string} url address of node-tracker
//  * @param {number} port port of node-tracker
//  * @returns {Promise<[Peer]>} all peers what is turned on.
//  */
// function getPeers(url, port) {
//     return new Promise((resolve, reject) => {
//         http.get({
//             hostname: url,
//             port: port,
//             path: '/nodes',
//             agent: false,
//         }, (res) => {
//             resolve(JSON.parse(res).map(Peer.from))
//         })
//     })
// }


/**
 * a dummy function to test
 * @param {string} url address of node-tracker
 * @param {number} port port of node-tracker
 * @returns {Promise<[Peer]>} all peers what is turned on.
 */
async function getPeers(url, port) {
    return [{
        address : "127.0.0.1",
        port : "11000"
    }].map(Peer.from)
}

/**
 *
 * @param sensorID
 * @returns {function(Peer): Promise<boolean>}
 */
function hasSensor(sensorID) {
    return async function (peer) {
        let url = `${peer.address}:${peer.port}/hasSensor?sensorID=${sensorID}`
        let result = await axios.get(url)
        return result.data === "true"
    }
}

module.exports = {
    getPeers: getPeers,
    hasSensor: hasSensor
}
