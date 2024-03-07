// Context --> Context5
function changeContext() {
  var todayTab = document.getElementById('Today-tab');
  var fiveDayTab = document.getElementById('5day-tab');
  var weatherContainer = document.getElementById('weather-container');

  if (weatherContainer && todayTab && fiveDayTab) {
    weatherContainer.id = 'weather-container-5day';

    var newWeatherContainer = document.getElementById('weather-container-5day');
    newWeatherContainer.innerHTML = weatherContainer.innerHTML;

    todayTab.classList.remove('active');
    fiveDayTab.classList.add('active');
  }
}

// Context5 --> Context
function changeContext5() {
  var todayTab = document.getElementById('Today-tab');
  var fiveDayTab = document.getElementById('5day-tab');
  var weatherContainer = document.getElementById('weather-container-5day');

  if (weatherContainer && todayTab && fiveDayTab) {
    weatherContainer.id = 'weather-container';

    var newWeatherContainer = document.getElementById('weather-container');

    newWeatherContainer.innerHTML = weatherContainer.innerHTML;

    todayTab.classList.add('active');
    fiveDayTab.classList.remove('active');
  }
}

function getWeather() {
  const city = document.getElementById('search-input').value;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=228263214e6158ada1d0e5f0afa9ec98`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      console.log(data);
      document.querySelector('.degree').innerHTML = Math.round(data.list[0].main.temp - 273) + '&deg;' + 'C';
      document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0]['icon']}@2x.png">`;
      document.querySelector('.description').textContent = data.list[0].weather[0]['description'];
      document.querySelector('.date-weather').textContent = new Date(data.list[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
      document.querySelector('.senrise').textContent = 'Sinrise: ' + new Date(data.city.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      document.querySelector('.sunset').textContent = 'Sunset: ' + new Date(data.city.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      document.querySelector('.gray-text-littl').innerHTML = 'RealFeel ' + Math.round(data.list[0].main.temp_max - 273) + '&deg;' + 'C';
      document.querySelector('.duration').textContent = 'Duration: ' + Math.round((data.city.sunset - data.city.sunrise) / 3600) + ' hr';

      const now = new Date();
      for (let i = 0; i < 6; i++) {
        const hour = now.getHours() + i;

        let closestDataIndex = 0;
        let closestTimeDiff = Infinity;

        for (let j = 0; j < data.list.length; j++) {
          const dataTime = new Date(data.list[j].dt * 1000); 
          const timeDiff = Math.abs(dataTime.getHours() - hour); 

          if (timeDiff < closestTimeDiff) {
            closestDataIndex = j;
            closestTimeDiff = timeDiff;
          }
        }

        const hourlyData = data.list[closestDataIndex];

        document.getElementById(`hourly-weather-${i + 1}`).querySelector(`.today-li-${i + 1}`).textContent =
          new Date(hourlyData.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        document.getElementById(`hourly-weather-${i + 1}`).querySelector(`.icon-li-${i + 1}`).innerHTML =
          `<img src="https://openweathermap.org/img/wn/${hourlyData.weather[0]['icon']}@2x.png">`;
        document.getElementById(`hourly-weather-${i + 1}`).querySelector(`.forecast-li-${i + 1}`).textContent =
          hourlyData.weather[0]['description'];
        document.getElementById(`hourly-weather-${i + 1}`).querySelector(`.temp-li-${i + 1}`).innerHTML =
          Math.round(hourlyData.main.temp - 273) + '&deg;' + 'C';
        document.getElementById(`hourly-weather-${i + 1}`).querySelector(`.realFeel-li-${i + 1}`).innerHTML =
          Math.round(hourlyData.main.temp_max - 273) + '&deg;' + 'C';
        document.getElementById(`hourly-weather-${i + 1}`).querySelector(`.wind-li-${i + 1}`).textContent =
          hourlyData.wind.speed;
      }

      // 5day
      for (let i = 0; i < 5; i++) {
        const dayData = data.list[i * 8];

        document.getElementById(`Day-${i + 1}`).querySelector(`.date-weather-${i + 1}`).textContent = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
        document.getElementById(`Day-${i + 1}`).querySelector(`.icon-weather-${i + 1}`).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0]['icon']}.png">`;
        document.getElementById(`Day-${i + 1}`).querySelector(`.temp-weather-${i + 1}`).innerHTML = Math.round(dayData.main.temp - 273) + '&deg;' + 'C';
        document.getElementById(`Day-${i + 1}`).querySelector(`.forecast-weather-${i + 1}`).innerHTML = dayData.weather[0]['description'];
      }

    })
}

const iconSize = 50;

// Other city
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Hamburg&appid=228263214e6158ada1d0e5f0afa9ec98`)
  .then(function (resp) { return resp.json() })
  .then(function (data) {
    const city = data.name;
    const icon = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" style="width: ${iconSize}px; height: ${iconSize}px;">`;
    const temp = Math.round(data.main.temp - 273) + '&deg;' + 'C';

    document.querySelector('.nearby-places-city-1').textContent = city;
    document.querySelector('.nearby-places-icon-1').innerHTML = icon;
    document.querySelector('.nearby-places-temp-1').innerHTML = temp;
  })
  
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=228263214e6158ada1d0e5f0afa9ec98`)
  .then(function (resp) { return resp.json() })
  .then(function (data) {
    const city = data.name;
    const icon = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" style="width: ${iconSize}px; height: ${iconSize}px;">`;
    const temp = Math.round(data.main.temp - 273) + '&deg;' + 'C';
    document.querySelector('.nearby-places-city-2').textContent = city;
    document.querySelector('.nearby-places-icon-2').innerHTML = icon;
    document.querySelector('.nearby-places-temp-2').innerHTML = temp;
  })

fetch(`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=228263214e6158ada1d0e5f0afa9ec98`)
  .then(function (resp) { return resp.json() })
  .then(function (data) {
    const city = data.name;
    const icon = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" style="width: ${iconSize}px; height: ${iconSize}px;">`;
    const temp = Math.round(data.main.temp - 273) + '&deg;' + 'C';
    document.querySelector('.nearby-places-city-3').textContent = city;
    document.querySelector('.nearby-places-icon-3').innerHTML = icon;
    document.querySelector('.nearby-places-temp-3').innerHTML = temp;
  })

fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=228263214e6158ada1d0e5f0afa9ec98`)
  .then(function (resp) { return resp.json() })
  .then(function (data) {
    const city = data.name;
    const icon = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" style="width: ${iconSize}px; height: ${iconSize}px;">`;
    const temp = Math.round(data.main.temp - 273) + '&deg;' + 'C';
    document.querySelector('.nearby-places-city-4').textContent = city;
    document.querySelector('.nearby-places-icon-4').innerHTML = icon;
    document.querySelector('.nearby-places-temp-4').innerHTML = temp;
  })
  