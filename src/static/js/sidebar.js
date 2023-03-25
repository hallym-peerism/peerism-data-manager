// 모든 a 태그를 선택합니다.
const links = document.querySelectorAll('.nav-link');
let currentId = document.querySelector(".active").id.toString(); // 현재 페이지 상태 저장.

// a 태그에서 마우스가 벗어날 때 "active" 클래스를 제거하는 함수를 정의합니다.
function removeActiveClass(e) {

  for (link of links) { // 현재 active 상태가 아닌 버튼들의 active 클래스를 제거합니다.
    if (link.id != currentId) {
      link.classList.remove('active');
    }
  }

  if (currentId == e.target.id) {

  } else { // 현재 active 상태가 아닌 버튼의 active 클래스를 제거합니다.
    this.classList.remove('active');
  }
}

// a 태그 위로 마우스가 올라갈 때 "active" 클래스를 추가하는 함수를 정의합니다.
function addActiveClass() {
  this.classList.add('active');
}


// 각 a 태그에 이벤트 리스너를 추가합니다.
links.forEach(link => {
  link.addEventListener('mouseover', addActiveClass);
  link.addEventListener('mouseout', removeActiveClass);
});



// 버튼을 선택합니다.
const buttons = document.querySelectorAll('.nav-link');
const contentDiv = document.getElementById('contents');
// 외부 HTML 파일을 불러오는 함수를 정의합니다.
async function loadExternalHTML(filename) {
  const response = await fetch(filename);

  if (response.status === 200) {
    const html = await response.text();
    contentDiv.innerHTML = html;
  } else {
    contentDiv.innerHTML = '<p>Error loading content.</p>';
  }
}

loadExternalHTML("./sensorView.html")
// 콘텐츠를 변경하는 함수를 정의합니다.

function changeContent(e) {
  // 선택된 버튼에 해당하는 외부 HTML 파일을 불러옵니다.
  const buttonId = e.target.id;
  if (buttonId === 'sensorView') {
    loadExternalHTML('./sensorView.html');
    currentId = 'sensorView';
  } else if (buttonId === 'searchView') {
    currentId = 'searchView';
    // loadExternalHTML('./searchView.html');
    loadExternalHTML('./sensorView-addSensor.html');
  } else if (buttonId === 'settingView') {
    currentId = 'settingView';
    loadExternalHTML('./setting.html');
  }

  for (link of links) { // 현재 active 상태가 아닌 버튼들의 active 클래스를 제거합니다.
    if (link.id != currentId) {
      link.classList.remove('active');
    }
  }
}

// 각 버튼에 이벤트 리스너를 추가합니다.
buttons.forEach(button => {
  button.addEventListener('click', changeContent);
});


