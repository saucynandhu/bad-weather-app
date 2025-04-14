document.addEventListener("DOMContentLoaded", () => {
 // const apiKey = "API KEY";
  const cityInput = document.getElementById("cityName");
  const tempElement = document.getElementById("temp");
  const cityElement = document.getElementById("city");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");
  const weatherIcon = document.querySelector(".weather-icon");
  const weirdOut = document.getElementById("weirdOut");

  var subNeg50 = [
    "So cold, even Elsa said 'Nah I'm good'",
    "Penguins are moving to the Sahara",
    "I think the sun is on vacation",
    "This is not a temperature it's a Dare.",
  ];
  var subNeg20 = [
    "Colder than your ex's heart",
    "Your tears will freeze before they fall.",
    "Freezer? What freezer?",
  ];
  var sub10 = [
    "Nose running like it's late for a meeting",
    "That brisk weather that ruins picnics",
    "The air has trust issues, it's not chill!",
  ];

  var sub20 = [
    "Mediocre weather for mediocre vibes.",
    "Jacket? Maybe. Existential dread? Definitely.",
    "“That awkward phase between hoodie and shorts.”",
  ];

  var sub30 = [
    "Suns out, serotonin kinda out.",
    "That weather where you start to romanticize life.",
    "Just warm enough to consider drinking water.",
  ];

  var sub40 = [
    "Like being hugged by an anxious oven.",
    "Why does the sun hate me personally?",
    "Brain is buffering... due to heat.",
  ];

  var sub50 = [
    "Surface of the sun called, said ‘slow down",
    "You’re not a pizza, stop baking yourself!",
    "The sun is auditioning for a role in your life.",
    "The sun is like that friend who never leaves.",
    "Your flip-flops are now lava proof",
    "Hotter than a group chat argument.",
  ];

  var plus50 = [
    "Spontaneous combustion: loading…",
    "You’re 1°C away from time travel.",
    "Hope you like grilled everything.",
    "Your sweat is sweating.",
  ];

  async function fetchWeather() {
    const city = cityInput.value;
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Extract relevant data
      var temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const weatherMain = data.weather[0].main;
      temperature = Math.round(temperature);

      // Convert data to weirdness

      if (temperature <= -50) {
        reqArr = subNeg50;
      } else if (temperature <= -20) {
        reqArr = subNeg20;
      } else if (temperature <= 10) {
        reqArr = sub10;
      } else if (temperature <= 20) {
        reqArr = sub20;
      } else if (temperature <= 30) {
        reqArr = sub30;
      } else if (temperature <= 40) {
        reqArr = sub40;
      } else if (temperature <= 50) {
        reqArr = sub50;
      } else {
        reqArr = plus50;
      }

      const weirdIndex = Math.floor(Math.random() * reqArr.length);
      weirdOut.innerText = reqArr[weirdIndex];

      // Update HTML content
      tempElement.innerText = `${temperature}°C`;
      cityElement.innerText = city;
      humidityElement.innerText = `${humidity}%`;
      windElement.innerText = `${windSpeed} km/h`;
      cityInput.value = ""; // Clear input field

      // Update weather icon
      updateWeatherIcon(weatherMain);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert(
        "Failed to fetch weather data. Please check the city name and try again."
      );
    }
  }

  function updateWeatherIcon(weatherMain) {
    const iconMap = {
      Clear: "weather-app-img/images/clear.png",
      Clouds: "weather-app-img/images/clouds.png",
      Rain: "weather-app-img/images/rain.jpg",
      Drizzle: "weather-app-img/images/drizzle.jpg",
      Snow: "weather-app-img/images/snow.png",
    };
    weatherIcon.src =
      iconMap[weatherMain] || "weather-app-img/images/default.png";
  }

  window.fetchWeather = fetchWeather;
});
