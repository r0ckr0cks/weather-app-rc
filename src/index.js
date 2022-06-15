let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
console.log(day);
let hour = [now.getHours()];
console.log(hour);
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = [now.getMinutes()];
console.log(minute);
if (minute < 10) {
  minute = `0${minute}`;
}

function cityDisplay(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityIs = document.querySelector("#cityName");
  if (cityInput.value) {
    cityIs.innerHTML = cityInput.value;
  } else {
    alert("Please enter a City 😉");
  }
  searchCity(cityInput.value);
}
let cityButton = document.querySelector("#search-form");
cityButton.addEventListener("submit", cityDisplay);

let timeDisplay = document.querySelector(".date");
console.log(timeDisplay, { timeStyle: "long" });
timeDisplay.innerHTML = `${day}, ${hour}:${minute}`;

function weatherDisplay(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let cityTemp = document.querySelector("#temp-display");
  let currentCityTemp = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${currentCityTemp}°`;
}

function searchCity(cityIs) {
  let apiKey = "0055be677334d96da6935e298ba23ddb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIs}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDisplay);
}

//Real Time temperature

function showCoordinates(response) {
  console.log(response);
  let latitude = Math.round(response.coords.latitude);
  console.log(latitude);
  let longitude = Math.round(response.coords.longitude);
  console.log(longitude);
  let apiKey = "0055be677334d96da6935e298ba23ddb";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(currentTemp);
}

let button = document.querySelector("button");
button.addEventListener("click", currentButton);

function currentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCoordinates);
}

function currentTemp(output) {
  let cityTemp = document.querySelector("#temp-display");
  let currentTemp = Math.round(output.data.main.temp);
  cityTemp.innerHTML = `${currentTemp}°`;
  document.querySelector("#cityName").innerHTML = output.data.name;
}
