const searchForm = document.querySelector('.weather-form');
const dayTime = document.querySelector('.forecast-daytime');
const weatherIcon = document.querySelector('.forecast-icon');
const weatherInfo = document.querySelector('.forecast-info');
const weatherCard = document.querySelector('.forecast');

const updateUI = data => {

  const {
    cityDets,
    weather
  } = data;

  // update daytime
  let isDayTime = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  dayTime.style.backgroundImage = `url(${isDayTime})`;

  //update weather icon
  const weatherIMG = `img/icons/${weather.WeatherIcon}.svg`;
  weatherIcon.style.backgroundImage = `url(${weatherIMG})`;

  //update details
  weatherInfo.innerHTML = `<p class="forecast-info_city">${cityDets.EnglishName}</p>
  <p class="forecast-info_cond">${weather.WeatherText}</p>
  <p class="forecast-info_temp">${weather.Temperature.Metric.Value}&deg;C</p>`

  //make it visible
  if (weatherCard.classList.contains('d-none')) {
    weatherCard.classList.remove('d-none');
  }
}

const updateCity = async city => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather
  };
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = searchForm.search.value.trim();

  // set local storage item
  localStorage.setItem('city', city);

  searchForm.reset();

  //update ui

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
};