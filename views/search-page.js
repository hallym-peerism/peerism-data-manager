class rowItem {
    title;
    RepoId;
    description;
    count;
    constructor(title, repoId, description, count) {
        this.title = title;
        this.repoId = repoId;
        this.description = description;
        this.count = count;
    }
}


class tableUnit {
    constructor() {
        this.myself = $(`.table > tbody`)
    }

    addRow(item) {

        const title = item.title;
        const repoId = item.repoId;
        const description = item.description;
        const count = item.count;
        const callback = () => { }

        this.myself.append(`
          <tr> 
            <td>${title}</td>
            <td>${repoId}</td> 
            <td>${description}</td>
            <td>${count}</td>
            <td>
                <a href= "" onclick="callback()"><i class="fa-solid fa-plus"></i></a>
            </td>
          </tr>
        ` )
    }

    removeAll() {
        this.myself.empty()
    }
}






const searchEvnt = () => {
    const query = $('#inputQuery').val()
    const tbUnit = new tableUnit()
    const port = 11000
    const url = `http://127.0.0.1:${port}/searchApi/search/${query}`
    tbUnit.removeAll()
    fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "text/plain"
        },
    }).then(async (responses) => {
        responses = await responses.json()

        for (let res of responses) {
            tbUnit.addRow(new rowItem(res.title, res.sensorid, res.description, res.count))
        }
    }).cathc((err) => {
        console.fetch("검색 url 조회 에러!")
    })
}