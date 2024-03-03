const API_KEY = '724c4f436f6777613735434441514d'
let cultureList = []
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getCultureByCategory(event)))
let totalResults = 0
let page = 1
const pageSize =8
const groupSize=5

    let firstNum = 2*(4*(page-1)) +1;
    let lastNum = page * 8;
    let category = "";
    
    let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20/${category}`)
    
    
    const getCulture = async() => {
        //100개의 데이터만 가져오기
        // firstNum = 2*(4*(page-1)) +1;
        // lastNum = page * 8;
        
    
        //url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${firstNum}/${lastNum}/${category}`)
        const response = await fetch(url);
        const cultureData = await response.json();
    
        if(response.status === 200) {
            cultureList = cultureData.culturalEventInfo.row;
            totalResults = cultureData.culturalEventInfo.list_total_count;
        }
        render();
        paginationRender();
        
    }

    
// const getCulture = async() => {
//     //100개의 데이터만 가져오기
//     firstNum = 2*(4*(page-1)) +1;
//     lastNum = page * 8;

//     url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${firstNum}/${lastNum}/`)
//     const response = await fetch(url);
//     const cultureData = await response.json();

//     if(response.status === 200) {
//         cultureList = cultureData.culturalEventInfo.row;
//         totalResults = cultureData.culturalEventInfo.list_total_count;
//     }
//     render();
//     paginationRender();
    
// }

// const getLatestCulture = async () =>{
//     url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20`)
//     getCulture();
// };

// const getCultureByCategory =async (event) => {
//     const category = event.target.textContent
//     url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20/${category}`)
//     console.log("category??",category)
//     getCulture();
// }

const getCultureByCategory = async (event) => {
    // firstNum = 2*(4*(page-1)) +1;
    // lastNum = page * 8;
    category = event.target.textContent;
    url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${firstNum}/${lastNum}/${category}`);
    console.log("카테고리",category)
    console.log("menu",menus)
    getCulture();
};

// const getCultureByKeyword = async () => {
//     const keyword = document.getElementById("search-input").value
//     url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20/${keyword}/${keyword}`)
//     getCulture();
// }

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
                        <a href="${item.ORG_LINK}" class="card-link" target="_blank">홈페이지 바로가기</a>
                    </div>
                </div>
            </div>`
        ).join("");
        
    document.getElementById("culture-board").innerHTML = cultureHTML;
};

const paginationRender = () => {
    //totalResults
    //page
    //pageSize
    //groupSize
    
    //totalPages
    const totalPages = Math.ceil(totalResults / pageSize);

    //pageGroup
    const pageGroup = Math.ceil(page/groupSize);    //1160 나누기 8 => 몇개의 그룹이 나오는지
    //lastPage
    let lastPage = pageGroup * groupSize;
    if(lastPage > totalPages) {
        lastPage = totalPages
    }

    //firstPage
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    console.log("firstPage : ", firstPage);
    console.log("lastPage : ", lastPage);

    let paginationHTML = ``;

    if(firstPage > 10) {
        paginationHTML += `<li class="page-item" onclick ="moveToPage(1)">
        <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&lt;&lt;</span>
        </a>
        </li>`;
        paginationHTML += `<li class="page-item" onclick ="moveToPage(${page-1})">
        <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&lt;</span>
        </a>
        </li>`;
    }
    
    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? "active" : ""}"><a class="page-link" id='page-${i}' onclick="moveToPage(${i})">${i}</a></li>`
    }
    
    if(lastPage < totalPages) {
        paginationHTML += `<li class="page-item" onclick ="moveToPage(${page+1})">
        <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&gt;</span>
        </a>
        </li>`;
        paginationHTML += `<li class="page-item" onclick ="moveToPage(${totalPages})">
        <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&gt;&gt;</span>
        </a>
        </li>`;
    }
console.log("클릭한페이지정보",page)
    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getCulture();
}

getCulture()

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

// const getCulture = async () => {
//     // url.searchParams.set("INDEX",page)  
//     // url.searchParams.set("pageSize",pageSize)
    
//     const response = await fetch(url)
//     const data = await response.json()
//     cultureList = data.culturalEventInfo.row
//     totalResults = data.culturalEventInfo.list_total_count
//     render()
//     paginationRender()
// }

// const paginationRender = ()=>{
//     //totalResults
//     //page
//     //pageSize
//     //groupSize
//     //totalPages   총 페이지 수(14pages) = (총결과값(ex.134)/한페이지에 보여줄 컨텐츠 수(10개))
//     const totalPages = Math.ceil(totalResults / pageSize);
  
//     //pageGroup    현재 페이지 그룹(3개)  = (현재 페이지 (ex.12)/페이지 몇개 단위로 보여줄거니(5개))
//     const pageGroup = Math.ceil(page/groupSize);
  
//     //lastPage     마지막 페이지(15pages) = (현재 페이지 그룹(3개) * 페이지 몇개 단위로 보여줄거니(5개))
//     let lastPage = pageGroup * groupSize;
  
//     //총 페이지 수가(14pages) 마지막 페이지(15pages)보다 작다면 lastpage(14) <= (14)totalpage
//     if(lastPage > totalPages){
//       lastPage = totalPages;
//     }
    
//     //firstPage //0보다 작으면 1로. 아니면 계산값 그대로
//     let firstPage = lastPage - (groupSize-1) <=0? 1 : lastPage - (groupSize-1); 
//     //let firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4; // 첫그룹이 5이하이면
    
    
//     let paginationHTML = ''
  
//     if(firstPage > 10){ 
//       paginationHTML += `<li class="page-item" onclick ="moveToPage(1)"><a class="page-link" href='#js-bottom'>&lt;&lt;</a></li>
//                       <li class="page-item" onclick ="moveToPage(${page-1})"><a class="page-link" href='#js-bottom'><</a></li>`
//     }
    
//     for (let i = firstPage; i <=lastPage; i++){
//       paginationHTML+=`<li class="page-item ${i===page?'active':''}"  onclick="moveToPage(${i})"><a class="page-link" href='#js-bottom'>${i}</a></li>`
//     } //1부터 마지막페이지 까지 반복. 선택된 페이지를 paginationHTML에 입력
//     //${i===page?'active':''} 현재 페이지네이션에 엑티브 클래스 주기 / 클래스 "" 안에 입력해야함!
  
//     if(lastPage < totalPages){
//       paginationHTML += `<li class="page-item" onclick ="moveToPage(${page+1})"><a class="page-link" href='#js-bottom'>&gt;</a></li>
//                         <li class="page-item" onclick ="moveToPage(${totalPages})"><a class="page-link" href='#js-bottom'>&gt;&gt;</a></li>`
//     }
//     document.querySelector(".pagination").innerHTML=paginationHTML
//   };

// const moveToPage = (pageNum) =>{
//     page = pageNum
//     getCulture()
// }