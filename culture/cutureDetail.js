const API_KEY = '724c4f436f6777613735434441514d';

let cultureList = [];
let totalResults = 0;
let page = 1;
const pageSize = 8;
const groupSize = 10;


const getCulture = async() => {
    //100개의 데이터만 가져오기
    let firstNum = 2*(4*(page-1)) +1;
    let lastNum = page * 8;

    url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${firstNum}/${lastNum}/`)
    const response = await fetch(url);
    const cultureData = await response.json();

    if(response.status === 200) {
        cultureList = cultureData.culturalEventInfo.row;
        totalResults = cultureData.culturalEventInfo.list_total_count;
    }
    render();
    paginationRender();
}

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

    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getCulture();
}

getCulture();


// const cultureDetailRender = () => {
//     const cultureDetailHTML = cultureList.map(cultureItem => `<a href= "${cultureItem.LINK_URL}" class="item">
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgA5cs1bbY9KKoITVjUce7umqQPlknhkDdAkhwGZhXkQ&s" class="card-img-top" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtl9ESKRo5HZYiroYXDvviVXOJoemv-q-brJeHTXsf_ed3lIejzMxBmRibg&s'; this.style='border:1px solid gray'">
//     <div class="card-body">
//     <h5 class="card-title info-title-font">${cultureItem.TITLE}</h5>
//     <p class="card-text">${cultureItem.CODE_TITLE_A}_${cultureItem.CODE_TITLE_B}</p>
//     </div>
//     </a>`
//     ).join('');

//     document.getElementById("expo-sport-card").innerHTML = cultureDetailHTML;
// }