// OpenWeather One Call: https://openweathermap.org/api/one-call-api

var userForm = document.querySelector("#city-form");
var userInput = document.querySelector("#city-name");
var searchBtn = document.querySelector("#search-btn");
var listCities = document.querySelector("#city-list");
var currentWeather = document.querySelector("#city-weather");
var futureForecast = document.querySelector("#five-day");

// functions

// handles user submission
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
    fetch(weatherApi)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data[0].lat;
                var lon = data[0].lon;
            })
        }
    })
};

// renders weather
var displayWeather = function(icon, city, temp, wind, humid, uvi) {
    currentWeather.innerHTML = "";
    searchCity = document.getElementById(city);
    if (!searchCity) {
        saveCity(city);
    }

};

// do in one function??? will come back to this
// renders 5-day forecast
// var displayFuture = function() {

// };

// saves city input to localstorage
var saveCity = function (city) {
    var cityArray = JSON.parse(window.localStorage.getItem("cityArray")) || [];
    var cityName = city;
    if (!cityArray === cityName){
        cityArray.push(cityName);
    }
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
};

// loads cities from localStorage
var loadCities = function() {
    listCities.innerHTML = "";
    var savedCities = JSON.parse(localStorage.getItem("cityArray")) || [];
    for (var i = 0; i < searchedCities.length; i++) {
        fetchWeather(searchedCities[i])
    };
};

loadCities();

// click event
$("body").on("click", ".search-btn", function() {
    fetchWeather();
});



