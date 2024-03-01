let calendarEl = document.getElementById('calendar');
let calendar;

document.addEventListener('DOMContentLoaded', function () {
  // full-calendar 생성하기
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,

    dateClick: function (info) {
      console.log('clicked' + info.dateStr);
      // 클릭 이벤트
      addEvetnToCalendar({start : info.dateStr});
    },
    // 이벤트 
    events: []
  });
  // 캘린더 랜더링
  calendar.render();
});

function addEvetnToCalendar(event) {
  calendar.addEvent(event);
}