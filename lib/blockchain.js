const CryptoJS = require("crypto-js")

/**
 *
 * @param msg
 * @returns {string}
 */
function SHA256(msg) {
    return CryptoJS.SHA256(msg).toString(CryptoJS.enc.Hex)
}

/**
 *
 * @param {array<object>} blocks
 * @param {function} currentH
 * @param {function} beforeH
 * @returns {boolean}
 */
function assertBlockChain(blocks, currentH, beforeH) {
    if (blocks.length < 2) return true
    for (let i = 1; i < blocks.length; i++)
        if (currentH(blocks[i] - 1) !== beforeH(blocks[i]))
            return false
    return true
}

module.exports = {
    assertBlockChain: assertBlockChain,
    SHA256: SHA256
}
