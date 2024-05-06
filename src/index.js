function updateWeatherInfo(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#emoji");
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji" />`;

  console.log(response.data);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  temperatureElement.innerHTML = Math.round(temp);

  getForecastData(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `$0{minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2cb2816d3aft58ff4684d3f6f5ob5068";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function doSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-value");

  searchCity(searchInput.value);
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecastData(city) {
  let apiKey = "2cb2816d3aft58ff4684d3f6f5ob5068";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(generateForecast);
}

function generateForecast(response) {
  console.log(response.data);
  let days = response.data.daily;
  let forecastHtml = "";

  days.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast">
  <div class="forecast-date">${formatDay(day.time)}</div>
  <div >
  <img src="${day.condition.icon_url}" class="forecast-icon"/>
  </div>
  <div class="forecast-temperature">
  <div class="temperature-max">${Math.round(day.temperature.maximum)}°</div>
  <div class="temperature-min">${Math.round(day.temperature.minimum)}°</div>
  </div>
  </div>
  `;
    }
  });
  let forecast = document.querySelector("#forecast-container");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form-input");
searchFormElement.addEventListener("submit", doSearch);

searchCity("Paris");

generateForecast();
