const apiKey = '4ddfaa3138bdeaa414259753468c11c1';
const city = '';

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return response.json(); 
      })
      .then(data => {
        const tempInCelsius = data.main.temp - 273.15;
        document.getElementById('temperature').textContent = tempInCelsius.toFixed(2);
        
        // 아이콘 정보를 가져와서 이미지 URL을 구성
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        
        // 이미지 태그의 src 속성을 업데이트
        document.getElementById('weather-icon').src = iconUrl;
      })
      .catch(error => {
        console.error('요청 중 문제가 발생했습니다:', error);
        document.getElementById('temperature').textContent = 'Error';
      });
}

// 셀렉트 메뉴 값 변경 시 날씨 정보 업데이트
document.getElementById('city-select').addEventListener('change', function() {
    // '지역 선택' 옵션이 선택된 경우가 아니라면 날씨 정보를 표시
    if (this.value !== '지역 선택') {
        document.getElementById('weather').style.display = 'block'; // 또는 'flex', 상황에 맞게
        fetchWeather(this.value);
    } else {
        // '지역 선택'이 다시 선택된 경우 날씨 영역을 숨김
        document.getElementById('weather').style.display = 'none';
    }
});
