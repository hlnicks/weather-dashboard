var userForm = document.querySelector("#city-form");
var userInput = document.querySelector("#city-name");
var searchBtn = document.querySelector("#search-btn");
var listCities = document.querySelector("#city-list");
var currentWeather = document.querySelector("#city-weather");
var m = moment().format('L');

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
var fetchWeather = function(lat, lon, city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=eb850d2c4486fceb7521b3ec8f51fc59";
    fetch(weatherApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var icon = data.current.weather.icon;
                var temp = data.current.temp;
                var windSpeed = data.current.wind_speed;
                var humidity = data.current.humidity;
                var uvi = data.current.uvi;
                var fiveDayForecast = data.daily;
                displayWeather(city, icon, temp, windSpeed, humidity, uvi, fiveDayForecast);
            });
        }
    })
};
// ^ could not get my API key to connect..
// ^ attempted several times and generated new keys, but nothing happened
// ^ ended up having to refer to a peer's code and using their key

// renders weather
var displayWeather = function (city, icon, temp, windSpeed, humidity, uvi, fiveDayForecast) {
    currentWeather.innerHTML = "";
    searchedCity = document.getElementById(city);
    if (!searchedCity){
        createCity = document.createElement("submit");
        createCity.setAttribute("id", city);
        createCity.setAttribute("class", "load-city list-group-item");
        createCity.textContent = city;
        listCities.append(createCity);
        saveCity(city);
    };

    // creates card to hold city/weather day
    var createCard = document.createElement("div");
    createCard.setAttribute("class", "card");
    currentWeather.append(createCard);

    // renders city name
    cityName = document.createElement("h2");
    cityName.innerHTML = city;
    createCard.append(cityName);

    // renders current date
    date = document.createElement("h5");
    date.innerHTML = (m);
    createCard.append(date);

    // renders weather icons
    // icons: https://openweathermap.org/weather-conditions#How-to-get-icon-URL
    // do i need to save icons??? will need to look into

    weatherDiv = document.createElement("div");
    createCard.append(weatherDiv);

    // vv  will need to convert.. will come back to this
    var dataArray = ["Temperature: " + temp + "°f", "Wind Speed: " + windSpeed + "mph", "Humidity: " + humidity + "%", "UV Index: " + uvi];
    for (var i =0; i < dataArray.length; i++) {
        weatherData = document.createElement("p");
        weatherData.innerHTML = dataArray[i];
        weatherDiv.append(weatherData);
    }
    // to do: figure out how to change colors based on UV index


    // renders five day forecast
    fiveDay = document.createElement("h2");
    fiveDay.innerHTML = "5-Day Forecast";
    currentWeather.append(fiveDay);

    for (var i = 1; i < fiveDayForecast.length - 2; i++){

        // creates div to hold 5 day forecast data
        fiveDayDiv = document.createElement("div");
        fiveDayDiv = document.createElement("class", "card");
        currentWeather.append(fiveDayDiv);
    }
};

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