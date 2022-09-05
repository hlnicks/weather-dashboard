// icons: https://openweathermap.org/weather-conditions#How-to-get-icon-URL
var userForm = document.querySelector("#city-form");
var userInput = document.querySelector("#city-name");
var searchBtn = document.querySelector("#search-btn");
var listCities = document.querySelector("#city-list");
var currentWeather = document.querySelector("#city-weather");
// var futureForecast = document.querySelector("#five-day");

// handles user input
var formHandler = function (event) {
    event.preventDefault();
    var cityName = userInput.value.trim();
    if (cityName) {
        fetchCity(cityName);
        userInput.value = "";
    }
};
userForm.addEventListener("submit", formHandler);

// gets latitude/longitude from city name
var fetchCity = function (city) {
    var weatherApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=eb850d2c4486fceb7521b3ec8f51fc59"
    fetch(weatherApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                fetchWeather(lat, lon, city);
            });
        }
    })
};

// uses latitude/longitude to get data from city
var fetchWeather = function (lat, lon, city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=eb850d2c4486fceb7521b3ec8f51fc59";
    fetch(weatherApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var icon = data.current.weather.icon;
                var temp = data.current.temp;
                var windSpeed = data.current.wind_speed;
                var humidity = data.current.humidity;
                var uvi = data.current.uvi;
                displayWeather(city, icon, temp, windSpeed, humidity, uvi);
            });
        }
    })
};

// renders weather
// do i need to save icons??? will need to look into
var displayWeather = function (city, icon, temp, windSpeed, humidity, uvi) {
    currentWeather.innerHTML = "";
    searchedCity = document.getElementById(city);
    if (!searchedCity){
        createCity = document.createElement("button");
        createCity.setAttribute("class", "load-city list-group-item");
        createCity.setAttribute("id", city);
        createCity.textContent = city;
        listCities.appendChild(createCity);
        saveCity(city);
    };

    // creates card to hold city/weather info
    var createCard = document.createElement("div");
    createCard.setAttribute("class", "card col-12");
    currentWeather.append(createCard);

    // populates city name
    cityName = document.createElement("h2");
    cityName.innerHTML = city;
    createCard.append(cityName);
    var weatherData = document.createElement("p");
    createCard.appendChild(weatherData);
};

// renders 5-day forecast
// var displayFuture = function() {};
// do in one function??? will come back to this


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
var loadCities = function() {
    listCities.innerHTML = "";
    var savedCities = JSON.parse(localStorage.getItem("cityArray")) || [];
    for (var i = 0; i < savedCities.length; i++) {
        fetchCity(savedCities[i])
    };
};
loadCities();

// click event
$("body").on("click", ".load-city", function() {
    var btnTxt = $(this).text();
    fetchCity(btnTxt);
});