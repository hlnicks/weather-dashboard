// note
// icons: https://openweathermap.org/weather-conditions#How-to-get-icon-URL

var userForm = document.querySelector("#city-form");
var userInput = document.querySelector("#city-name");
var searchBtn = document.querySelector("#search-btn");
var listCities = document.querySelector("#city-list");
var currentWeather = document.querySelector("#city-weather");
var futureForecast = document.querySelector("#five-day");

// handles user input
var formHandler = function(event) {
    event.preventDefault();
    var cityName = userInput.value.trim();
    if (cityName) {
        fetchWeather(cityName);
        var city = cityName;
        userInput.value = "";
    }
};
userForm.addEventListener("submit", formHandler);

// fetches data from api
var fetchWeather = function(city) {
    var weatherApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=bdc6688919e0cedd96fb90fbd910317a"
    fetch(weatherApi).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                latLonCity(lat, lon, city);
            });
        }
    })
};

// uses latitude/longitude to get data from city
var latLonCity = function(lat, lon, city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=bdc6688919e0cedd96fb90fbd910317a"
    fetch(weatherApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var icon = data.current.weather.icon;
                var temp = data.current.temp;
                var windSpeed = data.current.wind_speed;
                var humidity = data.current.humidity;
                var uvi = data.current.uvi;
                displayWeather(icon, city, temp, windSpeed, humidity, uvi);
            });
        }
    })
};

// renders weather
var displayWeather = function(icon, city, temp, windSpeed, humidity, uvi) {
    currentWeather.innerHTML = "";
    searchCity = document.getElementById(city);
    if (!searchCity) {
        saveCity(city);
    };

    // generate cards(?) for information thats pulled from API

    // will need vars= for name of city, its current weather, icon that represents current weather, current temp, current wind speed, current humidity and current uvi
    // maybe 5 day forecast?

};

// do in one function??? will come back to this
// renders 5-day forecast
// var displayFuture = function() {

// };

// saves city input to localstorage
var saveCity = function (city) {
    var cityArray = JSON.parse(window.localStorage.getItem("cityArray")) || [];
    var cityName = city;
    if (!cityArray.includes(cityName)){
        cityArray.push(cityName);
    }
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
};

// loads cities from localStorage
// var loadCities = function() {
//     listCities.innerHTML = "";
//     var searchedCities = JSON.parse(localStorage.getItem("cityArray")) || [];
//     for (var i = 0; i < searchedCities.length; i++) {
//         fetchWeather(searchedCities[i])
//     };
// };

// loadCities();

// click event
$("body").on("click", ".search-btn", function() {
    fetchWeather();
});