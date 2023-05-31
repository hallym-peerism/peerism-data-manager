const http = require("http");
const Peer = require("../datatypes/peer")
const axios = require("axios");


/**
 * a dummy function to test
 * @param {string} url address of node-tracker
 * @param {number} port port of node-tracker
 * @returns {Promise<[Peer]>} all peers what is turned on.
 */
async function getPeers(url, port) {
    return [{
        address: "127.0.0.1",
        port: "11000"
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

/**
 *
 * @param sensorID
 * @param valueID
 * @param value
 * @returns {function(Peer): Promise<axios.AxiosResponse<any>>}
 */
function insertSensorValue(sensorID, valueID, value) {
    return async function (peer) {
        let route = ""
        let url = `${peer.address}:${peer.port}/${route}/${sensorID}/${valueID}/${value}/false`
        return axios.post(url)
    }
}

module.exports = {
    getPeers: getPeers,
    hasSensor: hasSensor,
    insertSensorValue: insertSensorValue
}
