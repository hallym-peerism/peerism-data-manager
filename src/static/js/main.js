document.body.style.opacity = "1";

// jQuery 라이브러리 가져오기
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$.get(
    "/view/main", { },  
    (response) => {//응답 성공
        const snDs = JSON.parse(response)
        for(let snD of snDs){
            new SensorItemBox("제목1", dataExample1, "temp", "#rw2qd").addDom();
        }
    }
).fail(() => {
    console.log("404 에러!!")
})


const dataExample1 = {
  "data": [1, 2, 1.4, 0.2, 3.1, 2.2, 0.5, 3.1, 2.2, 0.5, 3.1, 2.2, 0.5],
  "labels": ['', '', '', ''
    , '', '', '', '', '', '', '', '', '']
}

new SensorItemBox("제목1", dataExample1, "temp", "#rw2qd").addDom();  

// const sqlresponse2 = {
//   "data": [1, 1.2, 1.1, 1.0, 0.5, 0.55, 0.2],
//   "labels": ['', '', '', '', '', '', '']
// }


// new SensorItemBox("제목1", sqlresponse1, "temp", "#rw2qd").addDom();
// new SensorItemBox("제목2", sqlresponse2, "status", "#edasc").addDom();
// new SensorItemBox("제목2", sqlresponse2, "status", "#edasc").addDom();
// new SensorItemBox("제목2", sqlresponse2, "status", "#edasc").addDom();



