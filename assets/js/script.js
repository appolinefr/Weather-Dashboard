//variables for forminput and button
var searchFormInput = document.getElementById("citySearchForm");
var searchBtn = document.getElementById("searchBtn");
var forecastContainer = document.getElementById("forecast");
var weatherIcon = document.querySelector(".icon");
var weatherContainer = document.getElementById("containerMain");
var cityName = document.querySelector(".city");
var searchHistoryList = document.getElementById("cityHistory");
var date = moment().format("DD/MM/YYYY");

//I need an empty array that will hold each city from search and save it in local storage
var citiesHistory = [];

// the init function will retrieve cities from local storage
function init() {
  var savedCity = localStorage.getItem("citiesHistory");
  if (savedCity) {
    //if not undefined
    citiesHistory = JSON.parse(savedCity); //input the rendering of history here
  } else {
    localStorage.setItem("citiesHistory", JSON.stringify(citiesHistory));
  }
  renderCities();
}
//event listener handling the search button click
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var city = searchFormInput.value.trim();

  if (city) {
    cityName.textContent = city + " " + date;
    getWeather(city);
    citiesHistory.push(city);
    localStorage.setItem("citiesHistory", JSON.stringify(citiesHistory)); //convert to a string and sent to local storage

    searchFormInput.value = "";
  } else {
    alert("Please enter a city");
  }
});
// function that will get the coordinates of a city and then from those coordinates get the wether
function getWeather(city) {
  var apiKey = "9915cf3d854b5f563abb5811b69f8cd9";
  var coordQueryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
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

// function to display current weather
function displayWeather(data) {
  console.log(data);
  weatherContainer.setAttribute("class", "border");

  //displaying icon element
  var icon = document.createElement("img");
  icon.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" +
      data.current.weather[0].icon +
      "@2x.png"
  );

  weatherIcon.appendChild(icon);

  //displaying temp element
  var temperature = document.querySelector(".temp");
  temperature.textContent =
    "Temperature: " + Math.round(data.current.temp) + "°C";

  //displaying humidity element
  var humidity = document.querySelector(".humidity");
  humidity.textContent = "Humidity: " + Math.round(data.current.humidity) + "%";

  // displaying wind element
  var wind = document.querySelector(".wind");
  wind.textContent = "Wind: " + Math.round(data.current.wind_speed) + "KM/H";

  // displaying uvindex element
  var uvIndex = document.querySelector(".uvIndex");
  var currentUv = Math.round(data.current.uvi);
  uvIndex.textContent = "UV Index: " + currentUv;

  if (currentUv <= 3) {
    //if uv index is low (1-2)
    uvIndex.setAttribute("class", "d-inline bg-success text-white");
  } else if (uvIndex > 3 && uvIndex < 6) {
    //if uv index is moderate (3-5)
    currentUv.setAttribute("class", "d-inline bg-warning text-white");
  } //if uv index is high (6+)
  else {
    uvIndex.setAttribute("class", "d-inline bg-danger text-white");
  }

  //dynamically creating elements for each forecast day and appending them to foreacst container
  for (let i = 1; i < 6; i++) {
    let forecastColumn = document.createElement("div");
    forecastColumn.setAttribute("class", "col");
    forecastContainer.appendChild(forecastColumn);

    let dateEl = document.createElement("p");
    dateEl.textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString();
    dateEl.setAttribute("class", "text-center");
    forecastColumn.appendChild(dateEl);

    let forecastIcon = document.createElement("img");
    forecastIcon.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        "@2x.png"
    );

    forecastIcon.setAttribute("alt", data.daily[i].weather[0].description);
    forecastColumn.appendChild(forecastIcon);

    let humidityEl = document.createElement("p");
    humidityEl.textContent = Math.round(data.daily[i].humidity) + " % humidity";
    humidityEl.setAttribute("class", "text-center");
    forecastColumn.appendChild(humidityEl);

    let windEl = document.createElement("p");
    windEl.textContent =
      "Wind: " + Math.round(data.daily[i].wind_speed) + " km/h";
    windEl.setAttribute("class", "text-center");
    forecastColumn.appendChild(windEl);

    let tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + Math.round(data.daily[i].temp.day) + " °C";
    tempEl.setAttribute("class", "text-center");
    forecastColumn.appendChild(tempEl);
  }
}

// function to render search cities in buttons
function renderCities() {
  // Render a new button for each city
  for (var i = 0; i < citiesHistory.length; i++) {
    var historyBtn = document.createElement("button");
    historyBtn.textContent = citiesHistory[i];
    historyBtn.setAttribute(
      "class",
      "btn btn-secondary d-inline text-capitalize m-1 bg-info text-white"
    );
    //event listener for historyBtn to retrieve the weather for each city searched
    historyBtn.addEventListener("click", function () {
      getWeather(historyBtn.textContent);
      cityName.textContent = historyBtn.innerHTML + " " + date;
    });
    searchHistoryList.appendChild(historyBtn);
  }
}
init();
