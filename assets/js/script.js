//variables for forminput and button
var searchFormInput = document.getElementById("citySearchForm");
var searchBtn = document.getElementById("searchBtn");
var forecastContainer = document.getElementById("forecast");

//function facilitating the event listener on the search button
var searchSubmitHandler = function (event) {
  event.preventDefault();

  // need to add cappitalisation of first letter
  var city = searchFormInput.value.trim();
  var date = moment().format("DD/ MM/YYYY");
  if (city) {
    var cityName = document.querySelector(".city");
    cityName.textContent = city + " " + date;
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
          });
        } else {
          return;
        }
      });
    });
}

// function to display current weather
var displayWeather = function (data) {
  console.log(data);
  var temperature = document.querySelector(".temp");
  temperature.textContent =
    "Temperature: " + Math.round(data.current.temp) + "°";

  // creating elements for humidity
  var humidity = document.querySelector(".humidity");
  humidity.textContent = "Humidity: " + Math.round(data.current.humidity) + "%";

  // creating elements for wind
  var wind = document.querySelector(".wind");
  wind.textContent = "Wind: " + Math.round(data.current.wind_speed) + "KM/H";

  // creating elements for uvIndex
  var uvIndex = document.querySelector(".uv");
  uvIndex.textContent = "UV Index: " + Math.round(data.current.uvi);

  if (uvIndex < 3) {
    //if uv index is low (1-2)
    uvIndex.setAttribute("class", "bgColor: bg-success", "color: text-light ");
  } else if (uvIndex > 2 && uvIndex < 6) {
    //if uv index is mocerate (3-5)
    uvIndex.setAttribute("class", "bgColor: bg-warning", "color: text-dark ");
  } //if uv index is high (6+)
  else {
    uvIndex.setAttribute("class", "bgColor: bg-danger", "color: text-light ");
  }

  for (let i = 0; i < 6; i++) {
    let forecastColumn = document.createElement("div");
    forecastColumn.setAttribute("class", "col");
    forecastContainer.appendChild(forecastColumn);

    let dateEl = document.createElement("p");
    dateEl.textContent = data.daily[i].dt;
    forecastColumn.appendChild(dateEl);
    let iconEl = document.createElement("p");
    iconEl.textContent = data.daily[i].weather[0].icon;
    forecastColumn.appendChild(iconEl);
    let humidityEl = document.createElement("p");
    humidityEl.textContent = data.daily[i].humidity;
    forecastColumn.appendChild(humidityEl);
    let windEl = document.createElement("p");
    windEl.textContent = data.daily[i].wind_speed;
    forecastColumn.appendChild(windEl);
    let tempEl = document.createElement("p");
    tempEl.textContent = data.daily[i].temp.day;
    forecastColumn.appendChild(tempEl);
  }
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
//
// };

//     const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);

//I need to save the get weather function to local storage

//I need a function to dynamically display results on page

//I need an empty array that will hold each city from search and save it in local storage

//I need to dynamically create buttons for each city that was searched
