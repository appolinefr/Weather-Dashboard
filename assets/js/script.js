//variables for forminput and button
var searchFormInput = document.getElementById("citySearchForm");
var searchBtn = document.getElementById("searchBtn");
var mainWeather = document.getElementById("mainWeather");
var forecast = document.getElementById("forecast");

//function facilitating the event listener on the search button
var searchSubmitHandler = function (event) {
  event.preventDefault();

  // need to add cappitalisation of first letter
  var city = searchFormInput.value.trim();

  if (city) {
    var cityName = document.createElement("h2");
    cityName.textContent = city;
    mainWeather.appendChild(cityName);
    getWeather(city);
  } else {
    alert("Please enter a city");
  }
};

//I need a function that will get the coordinates of a city and then from those coordinates get the wether
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

      fetch(queryURL).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayWeather(data);
            // displayForecast(data);
          });
        } else {
          return;
        }
      });
    });
}

// function to display current weather
var displayWeather = function (data) {
  // creating ul to hold list elements
  var weatherList = document.createElement("ul");
  mainWeather.appendChild(weatherList);

  // creating elements for each item
  var temperature = document.createElement("li");
  currentTemperature = Math.round(data.current.temp);
  temperature.textContent = "Temperature: " + currentTemperature + "°";
  weatherList.appendChild(temperature);
  console.log(temperature);

  // creating elements for each item
  var humidity = document.createElement("li");
  currentHumidity = Math.round(data.current.humidity);
  humidity.textContent = "Humidity: " + currentHumidity + "%";
  weatherList.appendChild(humidity);
  console.log(humidity);

  // creating elements for each item
  var wind = document.createElement("li");
  currentWind = Math.round(data.current.wind_speed);
  wind.textContent = "Wind: " + currentWind + "KM/H";
  weatherList.appendChild(wind);
  console.log(wind);

  // creating elements for each item
  var uvIndex = document.createElement("li");
  currentuvIndex = Math.round(data.current.uvi);
  uvIndex.textContent = "UV Index: " + currentuvIndex;
  weatherList.appendChild(uvIndex);
  console.log(uvIndex);
};

searchBtn.addEventListener("click", searchSubmitHandler);

//I need to save the get weather function to local storage

//I need a function to dynamically display results on page
