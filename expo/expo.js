const API_KEY = "3BaZ4ya%2BqsxtJ6O7fh7b1YostTqfNGJLe1dcR5%2BoAPsRGUWb%2BvcdDsbzIhbkv%2BM8uM6GgRd%2F%2BI5%2F%2FG6Svwiw0g%3D%3D"; //ponstman(API 호출하는 도구)에서 갖고옴

// let url = new URL(`https://jina-news-times.netlify.app/top-headlines?country=kr`);
let cardSlideList = [];  //카드슬라이드
let cardInfoList = [];  //카드슬라이드
let response = '';  //json파일 가져오기

//mvp
const getCardMvp = () => {
    let mvpJson = [
        {
        "title" : "롯데월드 어드벤처",
        "link" : "https://adventure.lotteworld.com/kor/main/index.do",
        "img" : "https://dimg.donga.com/wps/SPORTS/IMAGE/2023/10/29/121917476.2.jpg"
        },
        {
            "title" : "곤지암 리조트 스키장",
            "link" : "https://www.konjiamresort.co.kr/ski/useInfo.dev",
            "img" : "https://www.konjiamresort.co.kr/common/images/gallery/pic-ski-05.jpg"
        },
        {
            "title" : "곤지암 리조트 스키장",
            "link" : "https://www.konjiamresort.co.kr/ski/useInfo.dev",
            "img" : "https://www.konjiamresort.co.kr/common/images/gallery/pic-ski-05.jpg"
        },
        {
            "title" : "곤지암 리조트 스키장",
            "link" : "https://www.konjiamresort.co.kr/ski/useInfo.dev",
            "img" : "https://www.konjiamresort.co.kr/common/images/gallery/pic-ski-05.jpg"
        }
    ];

    const mvpData = mvpJson;
    console.log("mvpData: ", mvpData);
    mvpList = mvpData;

    mvpRender();
}

const mvpRender = () => {
    const mvpHTML = mvpList.map(mvp => `<a class="card" style="width: 18rem; href="${mvp.link}">
    <img src="${mvp.img}" class="card-img" alt="...">
    <div class="card-body">
      <h5 class="card-title">${mvp.title}</h5>
    </div>
  </a>`
    ).join("");

    document.getElementById("expo-mvp-card").innerHTML = mvpHTML; //1. 반복해서 나오는 구문을 감싸고 있는 main-board를 갖고온다.
}


//카드  가져오기
const getCardSlide = async() => {
    // const url = new URL(`https://cors-anywhere.herokuapp.com/http://api.kcisa.kr/openapi/API_SPO_044/request?serviceKey=af24eb50-9a70-457a-ac54-b62fd4dd80cf`);
    // const url = new URL(`http://api.kcisa.kr/openapi/service/rest/meta/NTKperf?serviceKey=9de649eb-24c1-4105-ba1d-144972511891`);

    // response = await fetch(url);

    // const data = await response.json();

    response = await fetch('expoJson/test.json');
    const response1 = await fetch('expoJson/future.json');
    const data = await response.json();
    const data1 = await response1.json();

    cardSlideList = data.DATA;

    // if(response.status === 200) {
    //     if(data.length === 0) {
    //         throw new Error("No result for this search");
    //     }
    //     cardSlideList = data.DATA;
    //     // totalResults = data;
    //     render();
    //     // paginationRender();
    // } else {
    //     throw new Error(data.message);
    // }
    slideRender();
}


function slideRender() {
    let resultHTML = [];
    console.log("cardSlideList : ", cardSlideList);

    //처음엔 4개 정보만 보여줌 (전체보기를 클릭하면 전체개수)
    for(let i = 0; i < 4; i ++) {
        let cardSlideArr = cardSlideList[i];
            resultHTML += `<div class="card">
            <img src="${cardSlideArr.main_img}" class="card-img" alt="...">
            <div class="card-body">
              <h5 class="card-title">${cardSlideArr.title}</h5>
              <p class="card-text">${cardSlideArr.use_fee}</p>
              <a href="${cardSlideArr.org_link}" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>`
    }

    document.getElementById("behave-weather-card").innerHTML = resultHTML;
}

/* 자연 */
const getNCardNature =  async() => {
    response = await fetch('expoJson/seoulPark.json');
    const infoData = await response.json();
    console.log("data : ", infoData.DATA);

    cardInfoList = infoData.DATA;
    console.log("list : ", cardInfoList[0]);

    cardNatureRender();
}

function cardNatureRender() {
    let resultHTML = [];
    console.log("cardInfoList : ", cardInfoList);

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

    document.getElementById("expo-nature-card").innerHTML = resultHTML;
}

/* 엔터테인먼트 */
const getNCardEntertain =  async() => {
    response = await fetch('expoJson/seoulPark.json');
    console.log("response : ", response);
    const infoData = await response.json();
    console.log("data : ", infoData.DATA);

    cardInfoList = infoData.DATA;
    console.log("list : ", cardInfoList[0]);

    cardEntertainRender();
}

function cardEntertainRender() {
    let resultHTML = [];
    console.log("cardInfoList : ", cardInfoList);

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

// getCardSlide();
getCardMvp();
getNCardNature();
getNCardEntertain();





