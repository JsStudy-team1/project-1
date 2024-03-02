let calendarEl = document.getElementById('calendar');
let calendar;

document.addEventListener('DOMContentLoaded', function () {
  // full-calendar 생성하기
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    views:{
      dayGridMonth: { // name of view
        titleFormat: { month: 'short'}
      }
    },
    selectable: true,

    dateClick: function (info) {
      console.log('clicked' + info.dateStr);
      setCurrentDate(info.dateStr);
    },
    // 이벤트 
    events: []
  });
  // 캘린더 랜더링
  calendar.render();
});

function addEvetnToCalendar(event) {
  calendar.addEvent(event);
  // todolist.js의 현재 클릭된 날짜의 date값 셋팅
  loadCurrentTodo();
}