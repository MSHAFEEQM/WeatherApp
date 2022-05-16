//select objects

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp-value p");
const descElement = document.querySelector(".temp-desc p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const weather={};

weather.temperature={
    unit : "Celcius",
    value:25
}

const KELVIN = 273;

const KEY = "498cf78a772e002065283cd735a80270";


if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(setPosition,showError);

}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser doesn't support geolocation<p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>${error.message}</p>`;
}

function getWeather(latitude,longitude){

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp-KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" />`
    tempElement.innerHTML = `${weather.temperature.value}<sup>o</sup> <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

