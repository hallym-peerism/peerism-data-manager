const Repo = require("../datatypes/repo")
const axios = require("axios")

/**
 * 
 * @param {Peer} peer 
 * @returns {Promise<[Repo]>}
 */
async function getSensorList(peer) {
    let res = await axios.get(`${peer.address}:${peer.port}/sensors`)
    return JSON.parse(res.data).map(Repo.from)
}

module.exports = {
    getSensorList: getSensorList
}
