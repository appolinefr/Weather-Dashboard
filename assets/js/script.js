let date = moment().format("dddd, do MMMM");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
let searchHistoryList = document.getElementById("cityHistory");
let citiesHistory = [];

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(data) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  for (let i = 1; i < 7; i++) {
    let forecast = data.daily;
    forecastHTML =
      forecastHTML +
      `  
                <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    forecast[i].dt
                  )}</div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecast[i].weather[0].icon
                    }@2x.png"
                    alt=""
                    width=""
                  />
                  <div class="weather-forecast-temperature">
                    <span class="temparature-max"> ${Math.round(
                      forecast[i].temp.max
                    )}°</span
                    ><span class="temperature-min"> ${Math.round(
                      forecast[i].temp.min
                    )}°</span>
                  </div>
                </div>`;
  }

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(data) {
  let temperature = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  let uvIndex = document.querySelector("#uvIndex");
  let currentUv = Math.round(data.current.uvi);

  temperature.innerHTML = Math.round(data.current.temp);
  description.innerHTML = data.current.weather[0].description;
  humidity.innerHTML = Math.round(data.current.humidity);
  wind.innerHTML = Math.round(data.current.wind_speed);
  dateElement.innerHTML = date;
  celsiusTemperature = Math.round(data.current.temp);
  uvIndex.textContent = currentUv;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", data.current.weather[0].description);

  if (currentUv <= 3) {
    //if uv index is low (1-2)
    uvIndex.setAttribute("class", " bg-success text-light ");
  } else if (currentUv > 3 && currentUv < 6) {
    //if uv index is moderate (3-5)
    uvIndex.setAttribute("class", "bg-warning text-light ");
  } //if uv index is high (6+)
  else {
    uvIndex.setAttribute("class", "bg-danger text-white");
  }
  displayForecast(data);
}

function search(city) {
  var apiKey = "9915cf3d854b5f563abb5811b69f8cd9";
  var coordQueryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(coordQueryURL)
    .then(function (response) {
      if (response.ok) {
      }
      return response.json();
    })
    .then(function (data) {
      var queryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        data[0].lat +
        "&lon=" +
        data[0].lon +
        "&units=metric" +
        "&daily&appid=" +
        apiKey;

      //fetching city with the coordinates from previous call
      fetch(queryURL).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayWeather(data);
          });
        } else {
          return;
        }
      });
    });
}

function renderCities() {
  // Render a new link for each city
  for (var i = 0; i < citiesHistory.length; i++) {
    let historyLink = document.createElement("a");
    historyLink.textContent = citiesHistory[i];
    //event listener for historyLink to retrieve the weather for each city searched
    historyLink.addEventListener("click", function () {
      displayWeather(historyLink.textContent);
    });
    searchHistoryList.appendChild(historyLink);
  }
}

function formSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = cityInputElement.value;
  search(cityInputElement.value);
  citiesHistory.push(cityInputElement.value);
  localStorage.setItem("citiesHistory", JSON.stringify(citiesHistory));
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

form.addEventListener("submit", formSubmit, renderCities);

fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Melbourne");
