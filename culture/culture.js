const API_KEY = '724c4f436f6777613735434441514d'
let cultureList = []

//받은 json파일 사용
// const getDataApi = async() => {
//     const data = await fetch('culture.json')
//     const data1 = await data.json()
//     console.log("data",data)

// }
// getDataApi()

const getLatestCulture = async () =>{
    const url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/20`)
    const response = await fetch(url)
    const data = await response.json()
    cultureList = data.culturalEventInfo.row
    
    console.log("data",cultureList)
render();
};

const render = () =>{
    let cultureHTML = cultureList.map((item) => 
        `<div class ="row">
            <div class="card col-lg-4 col-sm-12" style="width: 18rem;">
                <img src="${item.MAIN_IMG}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.TITLE}</h5>
                    <p class="card-text">${item.USE_TRGT}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>`
        ).join("");
        
    document.getElementById("culture-board").innerHTML = cultureHTML;
};



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