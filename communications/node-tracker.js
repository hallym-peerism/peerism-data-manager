const http = require("http");
const Peer = require("../datatypes/peer")

/**
 * 
 * @param {string} url address of node-tracker
 * @param {number} port port of node-tracker
 * @returns {Promise<[Peer]>} all peers what is turned on.
 */
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

// 테스트용 더미 함수
function getPeers(url, port) {
    return new Promise((resolve, reject) => {
                    resolve((

                    [{
                        address : "127.0.0.1",
                        port : "11000"
                    }]

                    ).map(Peer.from))
            })
}

module.exports = {
    getPeers: getPeers
}
