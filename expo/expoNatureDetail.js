const API_KEY = '754d49465661626f3934786a576643';
let natureList = [];

//페이지네이션 - 임의적으로 정할 수 있는 데이터
// let totalResult = 0;
// let page = 1;
// const pageSize = 10;
// const groupSize = 8;

let currentPage = 1;
let totalCount = 0;
// const pageCount = 10;
// const limit = 8;



// let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/stadiumScheduleInfo/1/5/`);
// console.log("url : ", url.searchParams);


const getNatureDetail = async() => {
    

    const response = await fetch("expoJson/seoulPark.json");
    console.log("response : ", response);
    const natureData = await response.json();

    if(response.status === 200) {
        // if(natureData.)
        console.log("natureData : ", natureData);
        natureList = natureData.DATA;
        // totalResult = natureList.length;
        totalCount = natureList.length;
    }

    ntDetailRender();
    paginationRender();
}

const ntDetailRender = () => {
    const natureDtlHTML = natureList.map(natureItem => `<a href= "${natureItem.template_url}" class="item">
    <img src="${natureItem.p_img}" class="card-img-top" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtl9ESKRo5HZYiroYXDvviVXOJoemv-q-brJeHTXsf_ed3lIejzMxBmRibg&s'; this.style='border:1px solid gray'">
    <div class="card-body">
    <h5 class="card-title info-title-font">${natureItem.p_park}</h5>
    <p class="card-text">${natureItem.p_list_content == null || natureItem.p_list_content == "" ? "내용없음" : natureItem.p_list_content.length > 50 ? natureItem.p_list_content.substring(0, 50) + "..." : natureItem.p_list_content}</p>
    </div>
    </a>`).join('');

    document.getElementById("expo-nature-card").innerHTML = natureDtlHTML;
}

/*
const paginationRender = () => {
    //totalResult: 전체
    //totalPages: 전체개수
    //page - 페이지정보
    //pageSize - 페이지사이즈
    //groupSize - 페이지네이션 몇개 필요한지

    // //pageGroup - 페이지그룹 몇번쨰에 속해있는지
    // const pageGroup = Math.ceil(page/groupSize);
    // //lastPage
    // const lastPage = pageGroup * groupSize;
    // //firstPage
    // const firstPage = lastPage - (groupSize - 1);

    ///////////////////////////////////////////////////////  페이지네이션 test

    //currentPage : 현재페이지
    // totalCount : 총 데이터 개수
    // pageCount : 화면에 나타날 페이지 개수
    // limit : 한 페이지당 나타낼 데이터 개수

    console.log("totalCount : ", totalCount);
    console.log("limit : ", limit);
    let totalPage = Math.ceil(totalCount / limit);
    console.log("totalPage : ", totalPage);
    
    let pageGroup = Math.ceil(currentPage / pageCount);
    console.log("pageGroup : ", pageGroup);


    let lastNumber = pageGroup * pageCount
    if(lastNumber > totalPage) {
        lastNumber = totalPage;
    }
    console.log("lastNumber : ", lastNumber);
    
    let firstNumber = lastNumber - (pageCount - 1)
    console.log("firstNumber : ", firstNumber);

    const nex = lastNumber - 1;
    const prev = firstNumber - 1;
    ///////////////////////////////////////////////////////


    let paginationHTML = ``;

    // for(let i = firstPage; i < lastPage; i++) {
    for(let i = firstNumber; i < lastNumber; i++) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;

    // <nav aria-label="Page navigation example">
    //     <ul class="pagination">
    //         <li class="page-item">
    //         <a class="page-link" href="#" aria-label="Previous">
    //             <span aria-hidden="true">&laquo;</span>
    //         </a>
    //         </li>
    //         <li class="page-item"><a class="page-link" href="#">1</a></li>
    //         <li class="page-item"><a class="page-link" href="#">2</a></li>
    //         <li class="page-item"><a class="page-link" href="#">3</a></li>
    //         <li class="page-item">
    //         <a class="page-link" href="#" aria-label="Next">
    //             <span aria-hidden="true">&raquo;</span>
    //         </a>
    //         </li>
    //     </ul>
    // </nav>
};

const moveToPage = (pageNum) => {
    console.log("moeveptpto", pageNum);
    currentPage = pageNum; //페이지값 유동적으로 바뀜
    // page = pageNum; //페이지값 유동적으로 바뀜
    getNatureDetail();
}
*/

//https://velog.io/@jhsung23/VanillaJS-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
const COUNT_PER_PAGE = 8;

const getTotalPageCount = () => {
    return Math.ceil(totalCount / COUNT_PER_PAGE);
}

const numberButtonWrapper = document.querySelector(".pagination");

const setPageButtons = () => {
    numberButtonWrapper.innerHTML = '';

    for(let i = 1; i <= getTotalPageCount(); i++) {
        numberButtonWrapper.innerHTML += `<li class="page-item" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
}

const setPageIf = (pageNumber) => {


    for (let i = COUNT_PER_PAGE * (pageNumber - 1) + 1; i <= COUNT_PER_PAGE * (pageNumber - 1) + 8 && i <= totalCount; i++) {

    }
}

getNatureDetail();
