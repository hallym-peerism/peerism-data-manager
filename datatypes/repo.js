module.exports = class Repo {
    constructor (sensorid, title, description) {
        this.sensorid = sensorid
        this.title = title
        this.description = description
    }

    /**
     *
     * @returns {Repo}
     */
    static from(json) {
        return Object.assign(new Repo(), json);
    }
}