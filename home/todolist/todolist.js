// input 엔터 시 콜백함수가 불리게끔 해야 함
const todoForm = document.getElementById('to_do_form');
const todoInput = document.getElementById('to_do_input');
const todoList_ul = document.getElementById('to_do_list');
const curDate = document.getElementById('cur_date');

todoForm.addEventListener('submit', handleToDoSubmit);

let dbLists = [];
let currentDate;
const DBLIST_KEY = 'DBLISTS'

function toDoList(date) {
  this.date = date;
  this.todos = [];
}

function handleToDoSubmit(param) {
  console.log('handleToDoSubmit is called');
  param.preventDefault();
  const curTodo = todoInput.value;
  console.log(curTodo);

  // input 초기화
  todoInput.value = '';

  const to_do_cur_li = document.createElement('li');
  const to_do_cur_span = document.createElement('span');

  to_do_cur_span.innerText = curTodo;
  to_do_cur_li.appendChild(to_do_cur_span);
  todoList_ul.appendChild(to_do_cur_li);
  saveDBListInLocalStorage();

  addNewTodo(currentDate, curTodo);
};

function setCurrentDate(date) {
  curDate.textContent = date + ' 할 일';
  date = currentDate;
};

function addNewTodo(date, newTodo) {
  console.log('addNewTodo');
  curTodoList = new toDoList(date);
  curTodoList.todos.push(newTodo);

  dbLists.push(curTodoList);
};

function saveDBListInLocalStorage() {
  console.log('saveDBListInLocalStorage');
  localStorage.setItem(DBLIST_KEY, dbLists);
};