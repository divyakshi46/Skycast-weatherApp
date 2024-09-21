import React, { useState, useEffect } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";


const API_KEY = "e7ce67cd7ef71c5d51657af1fe1f2044";

function App() {
  const [weatherCondition, setWeatherCondition] = useState("");
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [location, setLocation] = useState({ lat: "", lon: "" }); 
 
  const updateBackground = (condition) => {
    switch (condition) {
      case "Clear":
        setBackgroundStyle({
          backgroundImage: "url('/images/clearsky.jpg')",
        });
        break;
      case "Clouds":
        setBackgroundStyle({
          backgroundImage: "url('/images/cloudy.jpg')",
        });
        break;
      case "Rain":
        setBackgroundStyle({
          backgroundImage: "url('/images/rainy.jpg')",
        });
        break;
      case "Snow":
        setBackgroundStyle({
          backgroundImage: "url('/images/snowy.jpg')",
        });
        break;
      default:
        setBackgroundStyle({
          backgroundImage: "url('/images/background1.jpg')",
        });
        break;
    }
  };

  // Fetching weather data based on latitude and longitude
  const fetchWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const condition = data.weather[0].main; // Get the main weather condition like "Clear", "Clouds"
      setWeatherCondition(condition);
      updateBackground(condition); // Update background based on the fetched condition
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Get the current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchWeather(latitude, longitude); // Fetch weather for current location
      });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="container" style={backgroundStyle}>
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <a href="https://openweathermap.org/api">Weather data provided by OpenWeatherMap</a>{" "}
        | Developed by{" "}
        <a target="_blank" href="www.linkedin.com/in/divyakshisharma">
          Divyakshi Sharma
        </a>{" "}
        | Contact us at{" "}
        <a target="_blank" href="mailto:divyakshisharma.ds@gmail.com">
          divyakshisharma.ds@gmail.com
        </a>
      </div>
    </React.Fragment>
  );
}

export default App;
