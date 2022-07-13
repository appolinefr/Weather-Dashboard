//variables for forminput and button
var searchFormInput = document.getElementById("citySearchForm");
var searchBtn = document.getElementById("searchBtn");
var mainWeather = document.getElementById("mainWeather");
var forecastContainer = document.getElementById("forecast");
var forecastColumn = document.getElementById("forecastColumn");

//function facilitating the event listener on the search button
var searchSubmitHandler = function (event) {
  event.preventDefault();

  // need to add cappitalisation of first letter
  var city = searchFormInput.value.trim();
  var date = moment().format("DD/ MM/YYYY");
  if (city) {
    var cityName = document.createElement("h2");
    cityName.textContent = city + " " + date;
    mainWeather.appendChild(cityName);

    getWeather(city);

    searchFormInput.value = "";
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
            displayForecast(data);
          });
        } else {
          return;
        }
      });
    });
}

// function to display current weather
var displayWeather = function (data) {
  //element for icon not working for now
  // icon = document.createElement("h3");
  // var currentIcon = data.current.weather[0].icon;
  // icon.textContent = currentIcon;
  // mainWeather.appendChild(icon);

  // creating ul to hold list elements
  var weatherList = document.createElement("ul");
  mainWeather.appendChild(weatherList);
  console.log(data);
  // creating elements for temperature
  var temperature = document.createElement("li");
  currentTemperature = Math.round(data.current.temp);
  temperature.textContent = "Temperature: " + currentTemperature + "°";
  weatherList.appendChild(temperature);

  // creating elements for humidity
  var humidity = document.createElement("li");
  currentHumidity = Math.round(data.current.humidity);
  humidity.textContent = "Humidity: " + currentHumidity + "%";
  weatherList.appendChild(humidity);

  // creating elements for wind
  var wind = document.createElement("li");
  currentWind = Math.round(data.current.wind_speed);
  wind.textContent = "Wind: " + currentWind + "KM/H";
  weatherList.appendChild(wind);

  // creating elements for uvIndex
  var uvIndex = document.createElement("li");
  currentuvIndex = Math.round(data.current.uvi);
  uvIndex.textContent = "UV Index: " + currentuvIndex;
  weatherList.appendChild(uvIndex);

  // Need to add function for uv index color change
};

// var displayForecast = function (data) {
//I need to create a block that will hold info to display for each day and then do a loop to repeat for each of 5 day forecast

//   for (let i = 0; i < 6; i++) {
//     const forecastEls = document.querySelectorAll(".forecastColumn");
//     for (i = 0; i < forecastEls.length; i++) {
//       const forecastWeatherEl = document.createElement("img");
//       forecastWeatherEl.setAttribute(
//         "src",
//         "https://openweathermap.org/img/wn/" +
//           data.list[i].weather[0].icon +
//           "@2x.png"
//       );
//       forecastWeatherEl.setAttribute(
//         "alt",
//         data.list[i].weather[0].description
//       );
//       forecastEls[i].append(forecastWeatherEl);
//       const forecastTempEl = document.createElement("p");
//       forecastTempEl.innerHTML =
//         "Temp: " + k2f(data.list[forecastIndex].main.temp);
//       forecastEls[i].append(forecastTempEl);
//       const forecastHumidityEl = document.createElement("p");
//       forecastHumidityEl.innerHTML =
//         "Humidity: " + data.list[forecastIndex].main.humidity + "%";
//       forecastEls[i].append(forecastHumidityEl);
//     }
//   }
// };

searchBtn.addEventListener("click", searchSubmitHandler);
//     let date = data.daily[i].dt;
//     let icon = data.daily[i].weather[0].icon;
//     let humidity = data.daily[i].humidity;
//     let wind = data.daily[i].wind_speed;
//     let temperature = data.daily[i].temp.day;
//   }

//   let dateEl = document.createElement("p");
//   dateEl.textContent = date[i];
//   forecastUl.appendChild(dateEl);
//   let iconEl = document.createElement("p");
//   iconEl.textContent = icon[i];
//   forecastUl.appendChild(iconEl);
//   let humidityEl = document.createElement("p");
//   humidityEl.textContent = humidity[i];
//   forecastUl.appendChild(humidityEl);
//   let windEl = document.createElement("p");
//   windEl.textContent = wind[i];
//   forecastUl.appendChild(windEl);
//   let tempEl = document.createElement("p");
//   tempEl.textContent = temperature[i];
//   forecastUl.appendChild(tempEl);
// };

//     const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);

//I need to save the get weather function to local storage

//I need a function to dynamically display results on page

//I need an empty array that will hold each city from search and save it in local storage

//I need to dynamically create buttons for each city that was searched
