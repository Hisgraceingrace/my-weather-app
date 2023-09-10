let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${date} ${month} ${year} ${hour}:${minute}`;

function showTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed}m/s`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}
function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#cityName");
  let city = document.querySelector("#city");
  city.innerHTML = `${inputCity.value}`;
  clickCity(inputCity.value);
}
let cityName = document.querySelector("#inputCity");
cityName.addEventListener("submit", search);

function clickCity(city) {
  let apiKey = "9222158ab9a790ba555fbedbd0e24b46";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let citySearch = document.querySelector("#search");
citySearch.addEventListener("submit", clickCity);

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9222158ab9a790ba555fbedbd0e24b46";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let currentPosition = document.querySelector("#location");
currentPosition.addEventListener("click", getCurrentLocation);
