module.exports = class Peer {
    constructor (address, port) {
        this.address = address
        this.port = port
    }

    /**
     *
     * @returns {Peer}
     */
    static from(json) {
        return Object.assign(new Peer(), json);
    }
}