var searchFormInput = document.getElementById("citySearchForm");

var searchSubmitHandler = function (event) {
  event.preventDefault();

  var city = searchFormInput.value.trim();

  if (city) {
    getCoordinates(city);
  } else {
    alert("Please enter a city");
  }
};

//I need a function that will get the coordinates of a city
function getWeather() {
  // var city = searchFormInput.value.trim();
  var city = "Paris";
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
        "&daily&appid=" +
        apiKey;

      fetch(queryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          weather = data.timezone;
          console.log(weather);
        });
    });
}

getWeather();

// var getWeather = function () {
//   var apiKey = "9915cf3d854b5f563abb5811b69f8cd9";
//   var queryURL =
//     "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//     latitude +
//     "&lon=" +
//     longitude +
//     "&daily&appid=" +
//     apiKey;

//   fetch(queryURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       weather = data.current.weather.description;
//       console.log(weather);
//     });
// };

//I need to save the get weather function to local storage

//I need a function to dynamically display results on page
