
class SensorItemBox {
  constructor(title, sqlRes, icon, repoId) {
    this.title = title;
    this.sqlRes = sqlRes;
    this.icon = icon;
    this.repoId = repoId;
    this.itemboxId;
    this.itembox;

  }

  addDom() {
    /*
     xhr객체는 로컬 html 파일을 불러오기 위해사용한 객체
    */
    const container = document.querySelector('#container');
    const xhr = new XMLHttpRequest();
    const div = document.createElement('div');
    xhr.open('GET', 'item-box.html', false);  // false : 동기처리, true : 비동기처리
    xhr.send();  // html 파일을 불러온다

    const content = xhr.responseText;
    const parser = new DOMParser();

    const doc = parser.parseFromString(content, 'text/html');
    const itembox = doc.querySelector('.itembox-row');

    itembox.querySelector('.text-title').innerHTML = this.title; // 제목 설정
    itembox.querySelector('.text-repoId').innerHTML = this.repoId; // 제목 설정
    this.itembox = itembox;



    div.appendChild(itembox);
    container.appendChild(div);

    this.addChart(); // chart 추가


    return this;
  }

  addChart() {
    const ctx = this.itembox.querySelector("#myChart");

    const data = {
      //labels: ["04.01", "04.01", "04.01", "04.01", "04.02", "04.02", "04.03"],
      labels: this.sqlRes['labels'],
      datasets: [
        {
          // label: "My First dataset",
          backgroundColor: "#9AD0F5",
          borderColor: "#0097FF",
          fill: true,
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.sqlRes['data'],
        },
      ],
    };


    const myChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        scales: {

        },
        aspectRatio: 2, // 속성은 차트의 가로 세로 비율을 설정
        responsive: true, // 속성은 차트가 브라우저 크기에 맞게 반응하는지 여부를 설정
        maintainAspectRatio: false, // 속성은 차트의 가로 세로 비율을 유지할지 여부를 설정
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    const ctxDetail = this.itembox.querySelector("#myChartDetail");

    new Chart(ctxDetail, {
      type: "line",
      data: data,
      options: {
        scales: {

        },
        aspectRatio: 2, // 속성은 차트의 가로 세로 비율을 설정
        responsive: true, // 속성은 차트가 브라우저 크기에 맞게 반응하는지 여부를 설정
        maintainAspectRatio: false, // 속성은 차트의 가로 세로 비율을 유지할지 여부를 설정
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}


const sqlresponse1 = {
  "data": [1, 2, 1.4, 0.2, 3.1, 2.2, 0.5, 3.1, 2.2, 0.5, 3.1, 2.2, 0.5],
  "labels": ['', '', '', ''
    , '', '', '', '', '', '', '', '', '']
}
const sqlresponse2 = {
  "data": [1, 1.2, 1.1, 1.0, 0.5, 0.55, 0.2],
  "labels": ['', '', '', '', '', '', '']
}



const changeHeight = (buttonEle) => {
  const itembox = $( buttonEle.closest('[class^="itembox-row"]') ); // itembox의 부모를 찾는다.
  
  if (itembox.css("height") == "100px") {
    itembox.css("height", "450px");
    itembox.find('.itembox-chartbox').css("visibility", "hidden");

  }
  else {
    $(itembox).css("height", "100px");
    itembox.find('.itembox-chartbox').css("visibility", "visible");
  }

  return itembox;
}