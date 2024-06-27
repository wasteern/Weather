async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'f23833450520400ba24165246241306'; 
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=no&alerts=no`;
    
    var container = document.querySelector('.container');
    container.classList.add('fixed');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `<h2>${data.location.name}, ${data.location.country}, ${data.current.temp_c}°C</h2>`;

            data.forecast.forecastday.forEach(day => {
                const date = new Date(day.date).toLocaleDateString('uk-UA', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                });

                weatherDiv.innerHTML += `
                    <div class="weather-day">
                        <h3>${date}</h3>
                        <p><img src="http:${day.day.condition.icon}" alt="weather icon"></p>
                        <p>Температура: ${day.day.avgtemp_c}°C</p>
                        <p>Макс: ${day.day.maxtemp_c}°C</p>
                        <p>Мін: ${day.day.mintemp_c}°C</p>
                        <p>Погода: ${day.day.condition.text}</p>
                        <p>Вологість: ${day.day.avghumidity}%</p>
                        <p>Швидкість вітру: ${day.day.maxwind_kph} км/год</p>
                    </div>
                `;
            });

            const currentTemp = data.current.temp_c;
            updateBackground(currentTemp);
        } else {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('weather').innerHTML = `<p>${data.error.message}</p>`;
        }
    };

    xhr.onerror = function() {
        document.getElementById('weather').innerHTML = `<p>Помилка отримання даних.</p>`;
    };

    xhr.send();
}


function updateBackground(temp) {
    const body = document.body;
    if (temp > 25) {
        body.style.background = "linear-gradient(to top, #FF8008, #FFC837)";
    } else if (temp < 15) {
        body.style.background = "linear-gradient(to top, #2C3E50, #4CA1AF)";
    } else {
        body.style.background = "linear-gradient(to top, #2980b9, #6dd5fa)";
    }
}
