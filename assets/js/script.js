// OpenWeather One Call: https://openweathermap.org/api/one-call-api
// My key: bdc6688919e0cedd96fb90fbd910317a

var userForm = document.querySelector("#city-form");
var userInput = document.querySelector("#city-name");
var searchBtn = document.querySelector("#search-btn");
var listCities = document.querySelector("#city-list");
var currentWeather = document.querySelector("#city-weather");
var futureForecast = document.querySelector("#five-day");

// functions needed:

// submithandler
// fetches data from api
// renders weather
// renders 5-day forecast
// saves city input to localstorage
// click event
