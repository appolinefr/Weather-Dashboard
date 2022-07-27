//variables for forminput and button
var searchFormInput = document.getElementById("citySearchForm");
var searchBtn = document.getElementById("searchBtn");
var forecastContainer = document.getElementById("forecast");
var weatherIcon = document.querySelector(".icon");
var weatherContainer = document.getElementById("containerMain");
var cityName = document.querySelector(".city");
var searchHistory = document.getElementById("cityList");

//I need an empty array that will hold each city from search and save it in local storage
var cityHistory = [];

//document.ready function to get local storage and clear search input?This question already has answers here:

document.addEventListener("DOMContentLoaded", () => {
  getSavedCity();
});
//function facilitating the event listener on the search button
var searchSubmitHandler = function (event) {
  event.preventDefault();

  var city = searchFormInput.value.trim();
  var date = moment().format("DD/MM/YYYY");
  if (city) {
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
  uvIndex.textContent = "UV Index: " + Math.round(data.current.uvi);

  if (uvIndex <= 3) {
    //if uv index is low (1-2)
    uvIndex.setAttribute("class", "bgColor: bg-success", "color: text-light ");
  } else if (uvIndex > 3 && uvIndex < 6) {
    //if uv index is moderate (3-5)
    uvIndex.setAttribute("class", "bgColor: bg-warning", "color: text-dark ");
  } //if uv index is high (6+)
  else {
    uvIndex.setAttribute("class", "color: text-light ");
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

searchBtn.addEventListener("click", searchSubmitHandler, saveCity); // on click I need the search to push to savedcity, save it to storage and display it in a button

//I need to save the get weather function to local storage
function saveCity(data) {
  var city = data.city.name; //get the city came

  cityHistory.push(city);
  localStorage.setItem("cityHistory", JSON.stringify(cityHistory)); //convert to a string and sent to local storage
}


//load locations from local storage to the savedCity array
function getSavedCity() {
  var savedCity = localStorage.getItem("cityHistory");
  if (savedCity) {
    //if not undefined
    cityHistory = JSON.parse(savedCity); //input the rendering of history here
  } else {
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory)); 
  }
}
