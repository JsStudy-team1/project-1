const API_KEY = '754d49465661626f3934786a576643';
let natureList = [];

let totalResult = 0;
let page = 1;
const pageSize = 8;
const groupSize = 10;


const getNatureDetail = async() => {
    let firstNum = 2*(4*(page-1)) +1;
    let lastNum = page * 8;

    let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchParkInfoService/${firstNum}/${lastNum}/`)
    const response = await fetch(url);
    const natureData = await response.json();

    if(response.status === 200) {
        natureList = natureData.SearchParkInfoService.row;
        totalResult = natureData.SearchParkInfoService.list_total_count;
    }

    ntDetailRender();
    paginationRender();
}

const ntDetailRender = () => {
    const natureDtlHTML = natureList.map(natureItem => `<a href= "${natureItem.TEMPLATE_URL}" class="item">
    <img src="${natureItem.P_IMG}" class="card-img-top" onerror="this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtl9ESKRo5HZYiroYXDvviVXOJoemv-q-brJeHTXsf_ed3lIejzMxBmRibg&s'; this.style='border:1px solid gray'">
    <div class="card-body">
    <h5 class="card-title info-title-font">${natureItem.P_PARK}</h5>
    <p class="card-text">${natureItem.P_LIST_CONTENT == null || natureItem.P_LIST_CONTENT == "" ? "내용없음" : natureItem.P_LIST_CONTENT.length > 50 ? natureItem.P_LIST_CONTENT.substring(0, 50) + "..." : natureItem.P_LIST_CONTENT}</p>
    </div>
    </a>`).join('');

    document.getElementById("expo-nature-card").innerHTML = natureDtlHTML;
}

const paginationRender = () => {
    //totalResult
    //page
    //pageSize
    //groupSize
    
    //totalPages
    const totalPages = Math.ceil(totalResult / pageSize);

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
    getNatureDetail();
}

getNatureDetail();