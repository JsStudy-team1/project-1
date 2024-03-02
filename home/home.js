document.addEventListener('DOMContentLoaded', function () {
  const loadComponent = function (url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  };

  const headerEl = document.getElementById('header');
  if (headerEl) {
    loadComponent('../component/header.html', function (headerContent) {
      headerEl.innerHTML = headerContent;
    });
  };

  const footerEl = document.getElementById('footer');
  if (footerEl) {
    // 'component/footer.html' 파일 로드
    loadComponent('../component/footer.html', function (footerContent) {
      // 새로운 div 요소를 생성합니다.
      const tempDiv = document.createElement('div');

      // 새로운 div에 HTML 내용을 설정
      tempDiv.innerHTML = footerContent;

      // tempDiv의 자식 노드들을 footerEl에 추가
      while (tempDiv.firstChild) {
        footerEl.appendChild(tempDiv.firstChild);
      }

      // this-year 클래스를 가진 요소 가져오기
      const thisYear = document.querySelector('.this-year');

      // this-year 요소에 현재 연도로 설정
      if (thisYear) {
        // console.log('thisYear:', thisYear);
        thisYear.textContent = new Date().getFullYear();
      }
    });
  }
});
