// const url = `https://raw.githubusercontent.com/Baljeetsaini22/api/refs/heads/main/profile.json`;

const temperature = document.querySelector(".temperature");
const userInput = document.querySelector("#loact");
const wind = document.querySelector(".sun");
const loactBtn = document.querySelector("#btn");
const locationTo = document.querySelector(".location_of");

const apiKey = "YrW4QHsg4Wg77RIaC6EQZflpSqYurcpN";

loactBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const locat = userInput.value.trim();
  if (!locat) return alert("Please enter a location.");
  userInput.value = "";

  try {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${locat}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    temperature.innerHTML = "";
    wind.innerHTML = "";
    locationTo.textContent = data?.location?.name || "Location not found";

    const temp = data.timelines.daily[0];

    temperature.innerHTML = `
      <h3 class="text-lg font-bold">Temperature: ${
        temp.values.temperatureAvg
      }°C</h3>
      <p class="text-sm">Sunrise: ${new Date(
        temp.values.sunriseTime
      ).toLocaleTimeString()}</p>
    `;

    wind.innerHTML = `
      <h4 class="text-lg font-bold">Wind Speed: ${
        temp.values.windSpeedAvg
      } km/h</h4>
      <p class="text-sm">Sunset: ${new Date(
        temp.values.sunsetTime
      ).toLocaleTimeString()}</p>
    `;
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Unable to fetch weather data.");
  }
});
