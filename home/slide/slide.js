document.addEventListener("DOMContentLoaded", function () {
  // Swiper
  new Swiper('.mySwiper', {
    slidesPerView: 1,
    loop: true,
		loopedSlides: 1,
    effect: "fade",
    autoplay: {
      delay: 2000 // 시간 설정
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });
});

// 현재 파일
const getCardMvp = () => {
  let mvpJson = [{
          "title": "덕산 스플라스 리솜 스파",
          "link": "https://www.resom.co.kr/spa/theme/spa.asp?ver=1",
          "img": "https://www.resom.co.kr/spa/images/img/RomanticSpa_new_new.jpg"
      },
      {
          "title": "곤지암 리조트 스키장",
          "link": "https://www.konjiamresort.co.kr/ski/useInfo.dev",
          "img": "https://www.konjiamresort.co.kr/common/images/gallery/pic-ski-05.jpg"
      },
      {
          "title": "알프스 얼음분수축제",
          "link": "http://www.alpsvill.com/71",
          "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJjADvEFjB-OteKtaxzRF7SWwBEPBLtTGfw&usqp=CAU"
      },
      {
          "title": "함백산 눈꽃 등산",
          "link": "https://map.naver.com/p/entry/place/11491571?lng=128.91764490000187&lat=37.16117649999902&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "img": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151205_152%2Fok3kch_14492848119839jqC2_JPEG%2F%25B2%25D9%25B9%25CC%25B1%25E2_1DSC00223.JPG&type=sc960_832"
      }
  ];

  const mvpData = mvpJson;
  const mvpList = mvpData;

  const contentsArea = document.querySelector('#contents-area');
  contentsArea.innerHTML = mvpRender(mvpList); // mvpRender 함수 호출 및 결과를 contentsArea에 할당
}

getCardMvp();

// getCulture 함수
const getCulture = async () => {
  const response = await fetch(url);
  const cultureData = await response.json();

  if (response.status === 200) {
      cultureList = cultureData.culturalEventInfo.row.slice(0, 4); // 처음 4개의 아이템만 선택
      totalResults = cultureData.culturalEventInfo.list_total_count;
  }
  render(); // render 함수 호출
  paginationRender();
}

// render 함수
const render = () => {
  let cultureHTML = cultureList.map((item) =>
      `<div class="col col-xxl-3">
          <div class="card" style="width: 18rem;">
              <img src="${item.MAIN_IMG}" class="card-img-top img-fluid" alt="...">
              <div class="card-body">
                  <h3 class="card-title">[${item.CODENAME}] ${item.TITLE}</h3>
                  <p class="card-text">
                      장소 : ${item.PLACE}
                      날짜/시간 : ${item.DATE}
                      이용대상 : ${item.USE_TRGT}
                  </p>
                  <a href="${item.ORG_LINK}" class="card-link" target="_blank">홈페이지 바로가기</a>
              </div>
          </div>
      </div>`
  ).join("");

  document.getElementById("culture-board").innerHTML = cultureHTML;
};