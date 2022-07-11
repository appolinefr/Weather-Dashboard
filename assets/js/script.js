//I need the weather of the city I search to be dispayed in the main container.
var searchFormInput = document.getElementById("citySearchForm");
// var city = searchFormInput.value.trim();
var city = "London";

var searchSubmitHandler = function (event) {
  event.preventDefault();

  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city");
  }
};

//I need a function that will get the coordinates of a city
function getCoordinates(city) {
  var city = "London";
  var apiKey = "9915cf3d854b5f563abb5811b69f8cd9";
  var queryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
      }
      return response.json();
    })
    .then(function (data) {
      {
        console.log(data[0].lat);
        console.log(data[0].lon);
      }
    });
}
getCoordinates();

// function getWeather() {
//   var apiKey = "9915cf3d854b5f563abb5811b69f8cd9";
//   var queryURL =
//     "http://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&appid=" +
//     apiKey;

//   fetch(queryURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       for (var i = 0; i < data.length; i++) {
//         console.log(data[i].weather.main);
//       }
//     });
// }

//   fetch(queryURL).then(function (response) {
//     return response.json();
//   });
//   then(function (data) {
//     //I need a for each to create content that will hold the main ity info

//     mainCity.textContent = data.timezone;
//     temperature.textContent = data.current.temp;
//     wind.textContent = data.current.wind;
//   });
// }
