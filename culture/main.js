// const API_KEY = '724c4f436f6777613735434441514d'
// //let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/culturalEventInfo/1/5/`);
// let cultureList = [];
// let totalResults = 0;
// let page = 1;
// const pageSize = 10;
// const groupSize = 5;

//받은 json파일 사용
// const getDataApi = async() => {
//     const data = await fetch('culture.json')
//     const data1 = await data.json()
//     console.log("data",data)

// }
// getDataApi()

const getDataApi = async() => {
    const data = await fetch('GOODS.CSV')
    const data1 = await data.CSV()
    console.log("data",data)

}
getDataApi()



// const getDataCulture = async () => {
//   //try - catch 에러 핸들링.
//   try {
//       url.searchParams.set("page",page); // url에 &page=${page} 삽입
//       url.searchParams.set("pageSize",pageSize);
      
//       const response = await fetch(url);
//       const data = await response.json();
//     console.log("data",data);
//     if (response.status === 200) {
//       if (data.articles.length === 0) {
//         throw new Error("No matches for your search");
//       } 
//       cultureList = data.articles; //방금 검색해서 가져온 뉴스 담기
//       totalResults = data.totalResults //data에 총 뉴스 개수 담기
//       render(); //담긴 뉴스 보여주기!
//       //paginationRender(); //페이지네이션 보여주기
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (error) {
//     errorRender(error.message);
//   }
// };

// const getLatesNews = async () => {
// //let url = new URL(`http://openapi.seoul.go.kr:8088/${API_KEY}/xml/culturalEventInfo/1/5/`);

//   getNews();
// };