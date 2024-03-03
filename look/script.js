const apiKeyWeather = '4ddfaa3138bdeaa414259753468c11c1';
const city = '';

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`;

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

            const weatherConditions = data.weather;
            const isRaining = weatherConditions.some(condition => condition.main === 'Rain' || condition.id >= 500 && condition.id <= 531);
            
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            document.getElementById('weather-icon').src = iconUrl;
            let items;
            let recomendItems = [];
            switch (true) {
                case (tempInCelsius <= 0):
                    items = 'longPadding.png'; // 매우 추운 날씨
                    recomendItems = ['longbeanie.png', 'boots.png', 'gloves.png'];
                    break;
                case (tempInCelsius > 0 && tempInCelsius <= 5):
                    items = 'hoodJacket.png'; // 추운 날씨
                    recomendItems = ['longbeanie.png', 'longPadding.png', 'gloves.png'];
                    break;
                case (tempInCelsius > 5 && tempInCelsius <= 10):
                    items = 'jacket.png'; // 쌀쌀한 날씨
                    recomendItems = ['hoodie.png', 'longknit.png', 'longbeanie.png'];
                    break;
                case (tempInCelsius > 10 && tempInCelsius <= 15):
                    items = 'coat.png'; // 일교차 심한 날씨
                    recomendItems = ['jacket.png', 'muslin.png', 'hoodie.png'];
                    break;
                case (tempInCelsius > 15 && tempInCelsius <= 20):
                    items = 'longknit.png'; // 따뜻한 날씨
                    recomendItems = ['hoodie.png', 'longShirt.png', 'skirt.png'];
                    break;
                case (tempInCelsius > 20 && tempInCelsius <= 25):
                    items = 'halfShirt.png'; // 따뜻한 날씨
                    recomendItems = ['halfSetupNormal.png', 'mansHalfSetup.png', 'halfblouse.png'];
                    break;
                case (tempInCelsius > 25 && tempInCelsius <= 30):
                    items = 'halfblouse.png'; // 약간 더운 날씨
                    recomendItems = ['halfShirt.png', 'halfPants.png', 'skirt.png'];
                break;
                case (tempInCelsius > 30 && tempInCelsius <= 33):
                    items = 'halfShirtMan.png'; // 더운 날씨
                    recomendItems = ['tnak-top.png', 'bra.png', 'undershirt.png'];
                break;
                case (tempInCelsius > 30):
                    items = 'glasses.png'; // 개더운 날씨
                    recomendItems = ['bikini.png', 'undershirt.png', 'halfPants.png'];
                    break;
                default:
                    items = 'hoodie.png'; // 기본 이미지
            }
            const rainingElement = document.getElementById('raining');
            if (isRaining) {
                rainingElement.innerHTML = '<i class="fa-solid fa-face-sad-tear"></i> 비가 오고 있습니다! 우산을 챙기세요.';
            } else {
                rainingElement.innerHTML = '<i class="fa-solid fa-dog"></i> 댕댕이 산책 가능';
            }
                    
            const messageElement = document.getElementById("weather-message");

            if (tempInCelsius < 0) {
              messageElement.textContent = "한파주의보. 외출을 삼가하세요.";
              messageElement.classList.add("cold-message");
              messageElement.classList.remove("hot-message");
            } else if (tempInCelsius > 25) {
              messageElement.textContent = "폭염주의보. 외출을 삼가하세요.";
              messageElement.classList.add("hot-message");
              messageElement.classList.remove("cold-message");
            } else {
              messageElement.textContent = "";
              messageElement.classList.remove("cold-message", "hot-message");
            }
            
            const imageUrl = `./images/${items}`;
            document.getElementById('condition-icon').src = imageUrl;

            const recomendList = document.getElementById('recomend-list');
            recomendList.innerHTML = '';

            recomendItems.forEach(item => {
                const img = document.createElement('img');
                img.src = `./images/${item}`;
                img.alt = 'Recomend item';
                recomendList.appendChild(img); 
            });
        })
        .catch(error => {
            console.error('요청 중 문제가 발생했습니다:', error);
            document.getElementById('temperature').textContent = 'Error';
        });
}

    //옷 추천하기 버튼 누르면 보여주자
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelector(".recomend-btn").addEventListener("click", function() {
            var clothesContainer = document.querySelector(".container.clothes");

            if (clothesContainer.style.display === "none" || clothesContainer.style.display === "") {
                clothesContainer.style.display = "block"; 
            } else {
                clothesContainer.style.display = "none";
            }
        });

        //지역선택 전엔 하위 container 모두 숨김
    document.getElementById('city-select').addEventListener('change', function() {
        if (this.value !== '지역 선택') {
            document.getElementById('weather').style.display = 'block';
            document.getElementById("clothes").style.display = 'none';
            fetchWeather(this.value);
        } else {
            document.getElementById('weather').style.display = 'none';
            document.querySelector(".container.clothes").style.display = 'none';
        }
    });
});


