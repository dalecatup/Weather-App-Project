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
  let currentDate = date.getDate();

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

function updateDateTime() {
  let now = new Date();
  let formattedDate = formatDate(now);

  let dateTimeElement = document.querySelector(".current-date-time");
  dateTimeElement.textContent = formattedDate;
}
updateDateTime();

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  let numberElement = document.querySelector(".current-temp-number");
  numberElement.innerHTML = `${temperature}`;

  let cityName = document.querySelector(".current-city");
  cityName.innerHTML = city;
}

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
