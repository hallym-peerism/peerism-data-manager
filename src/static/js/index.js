class Sensor {
    constructor(name, desc) {
        this.name = name
        this.desc = desc
    }

    toDom() {
        let card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
            <div class="card-body">
                <b>Sensor Name:</b> ${this.name} <br>
                <small>
                    <b>Description: </b> ${this.desc} <b>Endpoint:</b> /test-sensor <b>Last Block: </b>EF8AC325
                </small>
            </div>`
        return card
    }
}

window.onload = () => {
    $(".card-slot").append(new Sensor("alice").toDom())
    $(".card-slot").append(new Sensor("alice").toDom())
}