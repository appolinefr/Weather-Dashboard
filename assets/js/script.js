//I need the weather of the city I search to be dispayed in the main container.
function getWeatherApi() {
  var apiKey = "9915cf3d854b5f563abb5811b69f8cd9";
  var city;
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(queryURL).then(function (response) {
    return response.json();
  });
  then(function (data) {
    console.log(data);
  });
}
