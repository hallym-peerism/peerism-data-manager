class rowItem {
    title;
    sensorid;
    description;
    count;
    constructor(title, sensorid, description, count) {
        this.title = title;
        this.sensorid = sensorid;
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
        const sensorid = item.sensorid;
        const description = item.description;
        const count = item.count;
        this.myself.append(` 
        
          <tr> 
            <td>${title}</td>
            <td>${sensorid}</td> 
            <td>${description}</td>
            <td>${count}</td>
            <td>
            
                <button class="addBtn" onclick="addRepo( '${title}', '${sensorid}', '${description}'  )"><i class="fa-solid fa-plus"></i></button>
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
    }).catch((err) => {
        console.error("검색 url 조회 에러!")
    })
}

const addRepo = (title, sensorid, description) => {
    repo = {
        title: title,
        sensorid: sensorid,
        description: description
    }
    const port = 11000
    const url = `http://127.0.0.1:${port}/searchApi/addRepo/`

    $.ajax({ // fetch는 버그 있음!
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(repo),
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.error("repo 추가 에러!");
        }
    });
}