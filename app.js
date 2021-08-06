"use strict";
const searchbox = document.querySelector("#location");


const api = {
  key: "b01ece554f985ab461aca3193f97c3da",
  base: "https://api.openweathermap.org/data/2.5/"
};


searchbox.addEventListener("keydown", setQuery);

function setQuery(evt){
  if (evt.keyCode === 13){
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query){
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
    return weather.json();
  }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".degree");
  temp.innerHTML = `${Math.trunc(weather.main.temp)}<span><sup>◦</sup>c</span>`;

  let weather_el = document.querySelector(".weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".sub-degree");
  hilow.innerText = `${Math.trunc(weather.main.temp_min)}◦c / ${Math.trunc(weather.main.temp_max)}◦c`
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}