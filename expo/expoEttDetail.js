const API_KEY = '754d49465661626f3934786a576643';

let entertainList = [];
let totalResult = 0;
let page = 1;
const pageSize = 8;
const groupSize = 10;


const getEttDetail = async() => {
    let firstNum = 2*(4*(page-1)) +1;
    let lastNum = page * 8;

    let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/LOCALDATA_030709/${firstNum}/${lastNum}/`)
    const response = await fetch(url);
    const entertainData = await response.json();

    if(response.status === 200) {
        totalResult = entertainData.LOCALDATA_030709.list_total_count;
        entertainList = entertainData.LOCALDATA_030709.row;
    }
    ettDetailRender();
    paginationRender();
}

function ettDetailRender () {
    let entertainDtlHTML = ``;
    let imgSrc = "";
    for(let i = 0; i < entertainList.length; i ++ ) {
        let ettArr = entertainList[i];
        let str = ettArr.BPLCNM;
        
        
        if(str.includes("파크") || str.includes("랜드")) {
            console.log("숫자 : " + i);
            imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDuDdAa_010Jhw539NAwQgZg7a_4ChB04vaw&usqp=CAU";
        } else if(str.includes("레포츠")) {
            imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVA-Svp3A367OVhJw0fAG4NnqWq1pLwRwaQ&usqp=CAU";
        } else {
            imgSrc = "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2MXU2NDJjV9S3nvBasMR17eBrjhIpi4iTUw&usqp=CAU";
        }

        entertainDtlHTML += `<div class="card item" style="width: 18rem;">
        <img src="${imgSrc}"}" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title info-title-font">${ettArr.BPLCNM}</h5>
        <p class="card-text">영업상태: ${ettArr.DTLSTATENM}</p>
        <p class="card-text">주소: [${ettArr.RDNPOSTNO == null || ettArr.RDNPOSTNO == "" ? "업데이트 예정" : ettArr.RDNPOSTNO}] 
        ${ettArr.RDNWHLADDR == null || ettArr.RDNWHLADDR == "" ? "" : ettArr.RDNWHLADDR.length > 30 ? ettArr.RDNWHLADDR.substring(0, 30) + "..." : entertainList.RDNWHLADDR}</p>
        </div>
        </div>`;
    }

    document.getElementById("expo-ett-card").innerHTML = entertainDtlHTML;
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
    getEttDetail();
}

getEttDetail();