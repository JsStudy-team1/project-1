const API_KEY = '724c4f436f6777613735434441514d'
let cultureList = []
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getCultureByCategory(event)))
let totalResults = 0
let page = 1
const pageSize =10
const groupSize=5
let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20`)


const getCulture = async () => {
    url.searchParams.set("INDEX",page)  
    url.searchParams.set("pageSize",pageSize)
    
    const response = await fetch(url)
    const data = await response.json()
    cultureList = data.culturalEventInfo.row
    totalResults = data.culturalEventInfo.list_total_count
    render()

    pagiNationRender()
}


const getLatestCulture = async () =>{
    url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20`)
    const response = await fetch(url)
    const data = await response.json()
    cultureList = data.culturalEventInfo.row
    totalResults = data.culturalEventInfo.list_total_count
    console.log("데이터",data)
    console.log("total",totalResults)
    render()
};

const getCultureByCategory =async (event) => {
    const category = event.target.textContent
    url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20/${category}`)
    const response = await fetch(url)
    const data = await response.json()
    cultureList = data.culturalEventInfo.row
    totalResults = data.culturalEventInfo.list_total_count
    console.log("카테고리total",totalResults)
    render()
}

const getCultureByKeyword = async () => {
    const keyword = document.getElementById("search-input").value
    url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20/${keyword}/${keyword}`)
    const response = await fetch(url)
    const data = await response.json()
    cultureList = data.culturalEventInfo.row
    totalResults = data.culturalEventInfo.list_total_count
    console.log("키워드total",totalResults)
    render()
}

const render = () =>{
    let cultureHTML = cultureList.map((item) => 
        `<div class = "col col-xxl-3">
                <div class="card" style="width: 18rem;">
                    <img src="${item.MAIN_IMG}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h3 class="card-title">[${item.CODENAME}] ${item.TITLE}</h3>
                        <p class="card-text">
장소 : ${item.PLACE}
날짜/시간 : ${item.DATE}
이용대상 : ${item.USE_TRGT}</p>
                        <a href="${item.ORG_LINK}" class="card-link">홈페이지 바로가기</a>
                    </div>
                </div>
            </div>`
        ).join("");
        
    document.getElementById("culture-board").innerHTML = cultureHTML;
};

const paginationRender = ()=>{
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page/groupSize);
    let lastPage = pageGroup * groupSize;
        if(lastPage > totalPages){
            lastPage = totalPages;
        }
    let firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4; // 첫그룹이 5이하이면
    let paginationHTML = ''
  
    if(firstPage >=6){ 
      paginationHTML += `<li class="page-item" onclick ="moveToPage(1)"><a class="page-link" href='#js-bottom'>&lt;&lt;</a></li>
                      <li class="page-item" onclick ="moveToPage(${page-1})"><a class="page-link" href='#js-bottom'><</a></li>`
    }
    
    for (let i = firstPage; i <=lastPage; i++){
      paginationHTML+=`<li class="page-item ${i===page?'active':''}"  onclick="moveToPage(${i})"><a class="page-link" href='#js-bottom'>${i}</a></li>`
    } 

    if(lastPage < totalPages){
      paginationHTML += `<li class="page-item" onclick ="moveToPage(${page+1})"><a class="page-link" href='#js-bottom'>&gt;</a></li>
                        <li class="page-item" onclick ="moveToPage(${totalPages})"><a class="page-link" href='#js-bottom'>&gt;&gt;</a></li>`
    }
    document.querySelector(".pagination").innerHTML=paginationHTML
  };
  
/*
const pagiNationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page/groupSize);
    const lastPage = pageGroup * groupSize
    const firstPage = lastPage - (groupSize -1)
    let paginationHTML=``

    for(let i = firstPage; i<=lastPage; i++){
    paginationHTML += `<li class="page-item" onclick = "moveToPage(${i})">< class="page-link">${i}</li>`
    }
    document.querySelector(".pagination").innerHTML=paginationHTML

}

const moveToPage = (pageNum) =>{
    page = pageNum
    getCulture()
}
*/

getLatestCulture()

// 데이터 culturalEventInfo 필드에 있음
// KEY	String(필수)	인증키	OpenAPI 에서 발급된 인증키
// TYPE	String(필수)	요청파일타입	xml : xml, xml파일 : xmlf, 엑셀파일 : xls, json파일 : json
// SERVICE	String(필수)	서비스명	culturalEventInfo
// START_INDEX	INTEGER(필수)	요청시작위치	정수 입력 (페이징 시작번호 입니다 : 데이터 행 시작번호)
// END_INDEX	INTEGER(필수)	요청종료위치	정수 입력 (페이징 끝번호 입니다 : 데이터 행 끝번호)
// CODENAME	STRING(선택)	분류
//CODENAME에는 교육/체험,전시/미술,뮤지컬/오페라,기타,연극,무용,영화,
//국악,콘서트,축제-문화/예술,축제-전통/역사,축제-시민화합,클래식,축제-기타,축제-자연/경관,독주/독창회로 총16개	
// TITLE	STRING(선택)	공연/행사명	
// DATE	STRING(선택)	날짜/시간	YYYY-MM-D
//OpenAPI의 파라미터는 빠짐 없이 순서대로 입력해야 합니다.
//CODENAME을 사용하지 않고 TITLE만 사용하시려면 CODENAME에 공백(space)를 넣으시면 됩니다.
//예) http://openapi.seoul.go.kr:8088/sample/xml/culturalEventInfo/1/5/ /카즈미


//실내 = 교육/체험,전시/미술,뮤지컬/오페라,기타,연극,무용,영화,국악,콘서트,클래식,독주/독창회

//실외 = 축제-문화/예술,축제-전통/역사,축제-시민화합,축제-기타,축제-자연/경관

//받은 json파일 사용
// const getDataApi = async() => {
//     const data = await fetch('culture.json')
//     const data1 = await data.json()
//     console.log("data",data)
// }
// getDataApi()