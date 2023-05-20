module.exports = class Peer {
    constructor (address, port) {
        this.address = address
        this.port = port
    }

    static from(json) {
        return Object.assign(new Peer(), json);
    }
}