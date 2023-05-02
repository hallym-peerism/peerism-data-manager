
class SensorItemBox {
    constructor(title, icon, repoId) {
      this.title = title;
      this.icon = icon;
      this.repoId = repoId;
  
    }
  
    addDom() {
      /*
       xhr객체는 로컬 html 파일을 불러오기 위해사용한 객체
      */
      const container = document.querySelector('#container');
      const xhr = new XMLHttpRequest();
      const div = document.createElement('div');
      xhr.open('GET', './search-item-box.html', false);  // false : 동기처리, true : 비동기처리
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
  
  
  
      return this;
    }

  }
  
  
  
  