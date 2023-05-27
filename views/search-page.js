
class Sensor {
    constructor(name) {
        this.name = name
        this.key = Math.round(Math.random()*90000000+10000000)
    }

    toDom() {
        let card = document.createElement("div")
        card.className = "card sensor"
        card.innerHTML = `
            <table>
                <tr>
                    <td rowspan="2">
                        <h1>${this.name}</h1><br>
                        <span>key: </span><span class="keyview">${this.key}</span>
                    </td>
                    <td rowspan="1">
                        <span class="ago-badge">
                            <i class="fa-solid fa-clock" style="margin-right: 5px;"></i>
                            a few second ago
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="last-value">
                        <span class="left">last uploaded: </span>
                        <span class="right">10.2</span>
                    </td>
                </tr>
            </table>`
        let canvas = card.querySelector("canvas")
        // let canvasSlot = card.querySelector(".canvas-slot")
        canvas.style.display = "none"
        // canvasSlot.classList.add("collapse")
        card.onclick = () => {
            canvas.style.display = canvas.style.display === "block" ? "none" : "block"
            // if (canvasSlot.classList.contains("collapse")) {
            //     canvasSlot.classList.remove("collapse")
            // } else {
            //     canvasSlot.classList.add("collapse")
            // }
        }
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return [card]
    }
}

window.onload = () => {
    $(".card-slot")
        .append(new Sensor("alice").toDom())
        .append(new Sensor("alice").toDom())
        .append(new Sensor("alice").toDom())
        .append(new Sensor("alice").toDom())
        .append(new Sensor("alice").toDom())
        .append(new Sensor("alice").toDom())
        .append(new Sensor("alice").toDom())
        .append(new Sensor("alice").toDom())
}
