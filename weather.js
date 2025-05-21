const temperature = document.querySelector('.temperature');
const userInput = document.querySelector('#loact');
const wind = document.querySelector('.sun');
const loactBtn = document.querySelector('#btn');

const apiKey = `YrW4QHsg4Wg77RIaC6EQZflpSqYurcpN`;
// const apiKey = 'vSjon1sAZhGJlPxjpbqFQK24RSGWsMYe';
let locat = "";


loactBtn.addEventListener('click', function(e){
  e.preventDefault()
  locat = userInput.value;
  console.log(locat);

  if (locat) {
    data(); 
    userInput.value = '';
  } else {
    alert("Please enter a location.");
  }
});

async function data() { 
  // const url = `https://raw.githubusercontent.com/Baljeetsaini22/api/refs/heads/main/profile.json`;
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${locat}&apikey=${apiKey}`;
  
  const data = await fetch(url);
  const dataFetch = await data.json(); 
  
  temperature.innerHTML = '';
  wind.innerHTML = '';

  const locationTo = document.querySelector('.location_of');
  locationTo.innerHTML = dataFetch?.location?.name

 
  const degre = document.createElement('h3');
  const sunRise = document.createElement('p')
  temperature.appendChild(degre);
  temperature.appendChild(sunRise)
  const temp = dataFetch.timelines.daily[0];
  degre.innerHTML = `Temperature = ${temp.values.temperatureAvg}`;
  sunRise.innerHTML = `Sunrise = ${temp.values.sunriseTime}`;
  

  const speed = document.createElement('h4');
  const sunSet = document.createElement('p')
  wind.appendChild(speed)
  wind.appendChild(sunSet)
  const winSpd = dataFetch.timelines.daily[0];
  speed.innerHTML = `Wind Speed = ${winSpd.values.windSpeedAvg}`;   
  sunSet.innerHTML = `Sunset = ${winSpd.values.sunsetTime}`;   
}
