const API_KEY = '754d49465661626f3934786a576643'; //ponstman(API 호출하는 도구)에서 갖고옴

let url = "";
let cardInfoList = [];  //자연
let sportList = [];  //스포츠
let response = '';  //json파일 가져오기

//mvp
const getCardMvp = () => {
    let mvpJson = [
        {
        "title" : "덕산 스플라스 리솜 스파",
        "link" : "https://www.resom.co.kr/spa/theme/spa.asp?ver=1",
        "img" : "https://www.resom.co.kr/spa/images/img/RomanticSpa_new_new.jpg"
        },
        {
            "title" : "곤지암 리조트 스키장",
            "link" : "https://www.konjiamresort.co.kr/ski/useInfo.dev",
            "img" : "https://www.konjiamresort.co.kr/common/images/gallery/pic-ski-05.jpg"
        },
        {
            "title" : "알프스 얼음분수축제",
            "link" : "http://www.alpsvill.com/71",
            "img" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJjADvEFjB-OteKtaxzRF7SWwBEPBLtTGfw&usqp=CAU"
        },
        {
            "title" : "함백산 눈꽃 등산",
            "link" : "https://map.naver.com/p/entry/place/11491571?lng=128.91764490000187&lat=37.16117649999902&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
            "img" : "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151205_152%2Fok3kch_14492848119839jqC2_JPEG%2F%25B2%25D9%25B9%25CC%25B1%25E2_1DSC00223.JPG&type=sc960_832"
        }
    ];

    const mvpData = mvpJson;
    mvpList = mvpData;

    mvpRender();
}

const mvpRender = () => {
    const mvpHTML = mvpList.map(mvp => `<a class="card mvpCard" style="width: 18rem;" href="${mvp.link}">
    <div class="mvp-motion">
    <img src="${mvp.img}" class="card-img mvpCard-img" alt="..."></div>
    <div class="card-body">
      <h5 class="card-title mvpCard-title">${mvp.title}</h5>
    </div>
  </a>`
    ).join("");

    document.getElementById("expo-mvp-card").innerHTML = mvpHTML; //1. 반복해서 나오는 구문을 감싸고 있는 main-board를 갖고온다.
}

/* 자연 */
const getNCardNature =  async() => {
    url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchParkInfoService/5/9/`)
    const response = await fetch(url);
    const natureData = await response.json();

    if(response.status === 200) {
        cardInfoList = natureData.SearchParkInfoService.row;
    }

    cardNatureRender();
}

function cardNatureRender() {
    let resultHTML = [];

    //처음엔 4개 정보만 보여줌 (전체보기를 클릭하면 전체개수)
    for(let i = 0; i < 4; i ++) {
        let cardInfoArr = cardInfoList[i];
        resultHTML += `<a href= "${cardInfoArr.TEMPLATE_URL}" class="card" style="width: 18rem;">
            <img src="${cardInfoArr.P_IMG}" class="card-img-top" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtl9ESKRo5HZYiroYXDvviVXOJoemv-q-brJeHTXsf_ed3lIejzMxBmRibg&s'; this.style='border:1px solid gray'">
            <div class="card-body">
            <h5 class="card-title info-title-font">${cardInfoArr.P_PARK}</h5>
            <p class="card-text">${cardInfoArr.P_LIST_CONTENT == null || cardInfoArr.P_LIST_CONTENT == "" ? "내용없음" : cardInfoArr.P_LIST_CONTENT.length > 50 ? cardInfoArr.P_LIST_CONTENT.substring(0, 50) + "..." : cardInfoArr.P_LIST_CONTENT}</p>
            </div>
        </a>`
    }

    document.getElementById("expo-nature-card").innerHTML = resultHTML;
}

/* 엔터테인먼트 */
const getNCardEntertain =  async() => {
    response = await fetch('expoJson/seoulPark.json');
    const infoData = await response.json();

    cardInfoList = infoData.DATA;

    cardEntertainRender();
}

function cardEntertainRender() {
    let resultHTML = [];

    //처음엔 4개 정보만 보여줌 (전체보기를 클릭하면 전체개수)
    for(let i = 0; i < 4; i ++) {
        let cardInfoArr = cardInfoList[i];
            resultHTML += `<a href= "${cardInfoArr.template_url}" class="card" style="width: 18rem;">
            <img src="${cardInfoArr.p_img}" class="card-img-top" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtl9ESKRo5HZYiroYXDvviVXOJoemv-q-brJeHTXsf_ed3lIejzMxBmRibg&s'; this.style='border:1px solid gray'">
            <div class="card-body">
            <h5 class="card-title info-title-font">${cardInfoArr.p_park}</h5>
            <p class="card-text">${cardInfoArr.p_list_content == null || cardInfoArr.p_list_content == "" ? "내용없음" : cardInfoArr.p_list_content.length > 50 ? cardInfoArr.p_list_content.substring(0, 50) + "..." : cardInfoArr.p_list_content}</p>
            </div>
            </a>`
    }

    document.getElementById("expo-entertain-card").innerHTML = resultHTML;
}

/* 스포츠 */
const getCardSport =  async() => {
    url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/stadiumScheduleInfo/1/4/`)
    const response = await fetch(url);
    const sportData = await response.json();

    if(response.status === 200) {
        sportList = sportData.stadiumScheduleInfo.row;
    }

    cardSportRender();
}

function cardSportRender() {
    let resultHTML = [];

    //처음엔 4개 정보만 보여줌 (전체보기를 클릭하면 전체개수)
    for(let i = 0; i < 4; i ++) {
        let sportListArr = sportList[i];
            resultHTML += `<a href= "${sportListArr.LINK_URL}" class="card" style="width: 18rem;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgA5cs1bbY9KKoITVjUce7umqQPlknhkDdAkhwGZhXkQ&s" class="card-img-top" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtl9ESKRo5HZYiroYXDvviVXOJoemv-q-brJeHTXsf_ed3lIejzMxBmRibg&s'; this.style='border:1px solid gray'">
            <div class="card-body">
            <h5 class="card-title info-title-font">${sportListArr.TITLE}</h5>
            <p class="card-text">${sportListArr.CODE_TITLE_A}_${sportListArr.CODE_TITLE_B}</p>
            </div>
            </a>`
    }

    document.getElementById("expo-sport-card").innerHTML = resultHTML;
}

getCardMvp();
getNCardNature();
getNCardEntertain();
getCardSport()





