let natureList = [];

//페이지네이션 - 임의적으로 정할 수 있는 데이터
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 4;


const getNatureDetail = async() => {
    const response = await fetch("expoJson/seoulPark.json");
    console.log("response : ", response);
    const natureData = await response.json();

    if(response.status === 200) {
        // if(natureData.)
        console.log("natureData : ", natureData);
        natureList = natureData.DATA;
        totalResult = natureList.length;
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


const paginationRender = () => {
    //totalResult: 전체
    //totalPages: 전체개수
    //page - 페이지정보
    //pageSize - 페이지사이즈
    //groupSize - 페이지네이션 몇개 필요한지

    //pageGroup - 페이지그룹 몇번쨰에 속해있는지
    const pageGroup = Math.ceil(page/groupSize);
    //lastPage
    const lastPage = pageGroup * groupSize;
    //firstPage
    const firstPage = lastPage - (groupSize - 1);

    let paginationHTML = ``;

    for(let i = firstPage; i < lastPage; i++) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
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
}

getNatureDetail();
