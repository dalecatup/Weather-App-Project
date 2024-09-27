function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let descriptionSentence = response.data.condition.description;
  let humidityInfo = `${response.data.temperature.humidity}%`;
  let windSpeedInfo = `${response.data.wind.speed}km/h`;
  let timestamp = response.data.time;
  let icon = `<img src="${response.data.condition.icon_url}" class="current-temp-emoji" />`;

  updateDateTime(timestamp);

  let numberElement = document.querySelector(".current-temp-number");
  numberElement.innerHTML = `${temperature}`;

  let cityName = document.querySelector(".current-city");
  cityName.innerHTML = city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = descriptionSentence;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidityInfo;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = windSpeedInfo;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = icon;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${currentDay} ${hours}:${minutes}`;
}

function updateDateTime(timestamp) {
  let now = new Date(timestamp * 1000);
  let formattedDate = formatDate(now);

  let dateTimeElement = document.querySelector("#current-date-time");
  dateTimeElement.textContent = formattedDate;
}
//updateDateTime();

function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "2dtdb4c6b36b2bd5c58d04bf0o41ae00";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let cityForm = document.querySelector("#city-search-form");
cityForm.addEventListener("submit", updateCity);

function defaultCity() {
  let apiKey = "2dtdb4c6b36b2bd5c58d04bf0o41ae00";
  let city = "London";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

defaultCity();
