// const API_KEY = '724c4f436f6777613735434441514d'
// //let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/culturalEventInfo/1/5/`);
// let cultureList = [];
// let totalResults = 0;
// let page = 1;
// const pageSize = 10;
// const groupSize = 5;

//받은 json파일 사용
// const getDataApi = async() => {
//     const data = await fetch('culture.json')
//     const data1 = await data.json()
//     console.log("data",data)

// }
// getDataApi()

// const getDataApi = async() => {
//     const data = await fetch('GOODS.CSV')
//     const data1 = await data.CSV()
//     console.log("data",data)

// }
// getDataApi()



// const getDataCulture = async () => {
//   //try - catch 에러 핸들링.
//   try {
//       url.searchParams.set("page",page); // url에 &page=${page} 삽입
//       url.searchParams.set("pageSize",pageSize);
      
//       const response = await fetch(url);
//       const data = await response.json();
//     console.log("data",data);
//     if (response.status === 200) {
//       if (data.articles.length === 0) {
//         throw new Error("No matches for your search");
//       } 
//       cultureList = data.articles; //방금 검색해서 가져온 뉴스 담기
//       totalResults = data.totalResults //data에 총 뉴스 개수 담기
//       render(); //담긴 뉴스 보여주기!
//       //paginationRender(); //페이지네이션 보여주기
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (error) {
//     errorRender(error.message);
//   }
// };

// const getLatesNews = async () => {
// //let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/culturalEventInfo/1/5/`);

//   getNews();
// };

const API_KEY = '724c4f436f6777613735434441514d'
let cultureList = []

const getLatestCulture = async () =>{
    const url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/10/축제-문화/예술`)
    const response = await fetch(url)
    const data = await response.json()
    cultureList = data.culturalEventInfo
    render
    console.log("data",cultureList)

}

const render = () =>{
    const cultureHTML = cultureList.row.map((news)=>
    `<div class ="row news">
          <div class="card mb-3 col-lg-4">
            <img src=${news.MAIN_IMG} class="card-img-top c-img-size" alt="...">
            <div class="card-body">
              <h5 class="card-title">${news.TITLE}</h5>
              <p class="card-text">${news.USE_TRGT}</p>
              <p class="card-text"><small class="text-body-secondary">${news.DATE}</small></p>
            </div>
          </div>
        </div>`
        );
   
    document.getElementById("culture-board").innerHTML = cultureHTML
}



getLatestCulture()

// 데이터 culturalEventInfo 필드에 있음
// KEY	String(필수)	인증키	OpenAPI 에서 발급된 인증키
// TYPE	String(필수)	요청파일타입	xml : xml, xml파일 : xmlf, 엑셀파일 : xls, json파일 : json
// SERVICE	String(필수)	서비스명	culturalEventInfo
// START_INDEX	INTEGER(필수)	요청시작위치	정수 입력 (페이징 시작번호 입니다 : 데이터 행 시작번호)
// END_INDEX	INTEGER(필수)	요청종료위치	정수 입력 (페이징 끝번호 입니다 : 데이터 행 끝번호)
// CODENAME	STRING(선택)	분류
//CODENAME에는 문화교양/강좌,전시/미술,뮤지컬/오페라,기타,연극,무용,영화,
//국악,콘서트,축제-문화/예술,축제-전통/역사,축제-시민화합,클래식,축제-기타,축제-자연/경관,독주/독창회로 총16개	
// TITLE	STRING(선택)	공연/행사명	
// DATE	STRING(선택)	날짜/시간	YYYY-MM-D
//OpenAPI의 파라미터는 빠짐 없이 순서대로 입력해야 합니다.
//CODENAME을 사용하지 않고 TITLE만 사용하시려면 CODENAME에 공백(space)를 넣으시면 됩니다.
//예) http://openapi.seoul.go.kr:8088/sample/xml/culturalEventInfo/1/5/ /카즈미


//실내 = 문화교양/강좌,전시/미술,뮤지컬/오페라,기타,연극,무용,영화,국악,콘서트,클래식,독주/독창회
//실외 = 축제-문화/예술,축제-전통/역사,축제-시민화합,축제-기타,축제-자연/경관