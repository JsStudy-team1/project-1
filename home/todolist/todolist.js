// input 엔터 시 콜백함수가 불리게끔 해야 함
const todoForm = document.getElementById('to_do_form'); // 할일 폼
const todoInput = document.getElementById('to_do_input'); // 할일 입력 필드
const todoList_ul = document.getElementById('to_do_list'); // 할일 리스트
const curDate = document.getElementById('cur_date'); // 현재 일자 표시

todoForm.addEventListener('submit', handleToDoSubmit); // 폼 제출 시 이벤트 핸들러 등록

let dbLists = []; // 로컬 스토리지에 저장할 할일 리스트 배열
let curTodoList;
let currentDate; // 현재 일자
const DBLIST_KEY = 'DBLISTS'; // 로컬 스토리지 키

// 할일 리스트를 저장하는 객체 생성자 함수
function ToDoList(date) {
  this.date = date;
  this.todos = [];
}

function clearTodoItems() {
  console.log('clearTodoItems');
  // 자식이 있을 경우 삭제, 자식이 없을 경우 탈출
  while (todoList_ul.firstChild) {
    todoList_ul.removeChild(todoList_ul.firstChild);
  }
}

// 할일 화면 구현 함수
function displayTodoItem(item) {
  // 할일 리스트에 새로운 항목 추가
  const to_do_cur_li = document.createElement('li');
  const to_do_cur_span = document.createElement('span');

  to_do_cur_span.innerText = item;
  to_do_cur_li.appendChild(to_do_cur_span);
  todoList_ul.appendChild(to_do_cur_li);

  // 동작확인
  console.log('displayTodoItem')
}

// 할일 폼 제출 이벤트 핸들러 함수
function handleToDoSubmit(param) {
  console.log('handleToDoSubmit is called');
  param.preventDefault(); // 기본 제출 동작 방지
  const curTodo = todoInput.value; // 입력된 할일 가져오기
  console.log(curTodo);

  // 입력 필드 초기화
  todoInput.value = '';
  displayTodoItem(curTodo);

  saveDBListInLocalStorage(); // 로컬 스토리지에 할일 리스트 저장

  addNewTodo(currentDate, curTodo); // 현재 일자의 할일 리스트에 새로운 할일 추가
};

// 일자 클릭 시 해당 일 표시하는 함수
function setCurrentDate(date) {
  // formattedToday 정상 구현여부 확인
  console.log('setCurrentDate' + date);
  curDate.textContent = date + ' 할 일';
  currentDate = date; // 현재 일자 업데이트
};

// 일자 클릭 시 해당 일의 할일 리스트에 새로운 할일 추가
function addNewTodo(date, newTodo) {
  console.log('addNewTodo');

  // dbLists에서 해당 일자의 toDoList를 찾음
  curTodoList = dbLists.find(list => list.date === date);

  // 해당 일자의 toDoList가 없으면 새로 생성하여 dbLists에 추가
  if (!curTodoList) {
    curTodoList = new ToDoList(date);
    dbLists.push(curTodoList);
  }
  curTodoList.todos.push(newTodo);
  // 객체로 만들어진 todoList가 생성이 되어 push
}

// 할일 리스트를 로컬 스토리지에 저장
function saveDBListInLocalStorage() {
  console.log('saveDBListInLocalStorage');
  localStorage.setItem(DBLIST_KEY, JSON.stringify(dbLists));
};

function loadCurrentTodo() {
  // 현재 클릭된 날짜의 date값 셋팅
  // 해당 부분은 calendar.js에서 셋팅함

  // localstorage에서 dbList에 다시 로드
  // dbList에서 현재 클릭된 날짜의 ToDoList 가져옴
  // 가져온 toDoList를 display

  // 기존 화면에 구현된 item 초기화
  clearTodoItems();

  // dbLists 가져와서 초기화
  // 키값으로 사용한 DBLIST_KEY를 반환 받아야 함
  const savedDBLists = localStorage.getItem(DBLIST_KEY);

  // 만약 로컬 스토리지에 DBLIST_KEY에 해당하는 값이 있다면
  if (savedDBLists !== null) {
    // JSON 형식의 문자열로 저장된 dbLists 값을 파싱하여 할일 리스트 배열로 변환
    dbLists = JSON.parse(savedDBLists);
  }

  console.log(dbLists);

  // dbList 화면 출력하기
  if (!dbLists) {
    return
    // 비어있을 경우 리턴!
  }

  dbLists.forEach(dolist => {
    // dolist의 date 값이 currentDate라면, 
    if (dolist.date === currentDate) {
      // dolist의 todos의 어레이를 for루프를 돌려서 모든 item들을 화면에 구현(displayTodoItem)
      dolist.todos.forEach(displayTodoItem);
    }
  });



  // 작동 확인 
  console.log('loadCurrentTodo');
}

// 일자를 선택하기 전이라면, date값이 없음 
// 현재 오늘 날짜를 curDate에 업데이트 될 수 있도록 초기화 함수 설정
function loadTodoInnit() {
  // 현재 날짜를 얻기 위해 Date 객체를 생성
  let today = new Date();
  // ISO 형식으로 변환한 날짜를 문자열로 가져옴
  let isoFormattedToday = today.toISOString();
  // ISO 문자열을 'T'를 기준으로 나누어 배열로 만든 후, 첫 번째 요소(index 0)를 선택
  // 이 부분은 날짜와 시간을 구분하기 위한 ISO 형식의 표준이기 때문에 'T'로 나누어서 날짜 부분만 선택
  let formattedToday = isoFormattedToday.split('T')[0];
  console.log('loadTodoInnit');

  // formattedToday 확인
  console.log(formattedToday);
  setCurrentDate(formattedToday);

  loadCurrentTodo();
  // if문 없이 바로 반환 받을 경우 >> 여기서 문제
  // DBLISTS 어플리케이션을 삭제했을 때 null값으로 반환 됨
  // dbLists = []; 어레이 형태로 초기화를 해주는 것이 사라지고 null이 반환되어버림
  // 나중에 addNewTodo를 했을 때 dbLists에 push한 어레이 함수가 작동이 안됨
  // 이 상황이 발생되지 않도록 if문으로 savedDBLists !== null >> null이 아닐 경우 그 때 dbLists 값을 저장할 수 있도록 작성
}

// 초기화 함수 설정
loadTodoInnit();