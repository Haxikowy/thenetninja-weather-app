const key = "GnZKLE2NlPN1qHw1Io5b3poxBaXAvqCm";


// function to get information about city(cityKey) from API
const getCity = async city => {

  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}


//function to get current conditions in city we are searching for
const getWeather = async cityKey => {

  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${cityKey}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}