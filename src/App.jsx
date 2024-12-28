import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '8ac5c4d57ba6a4b3dfcf622700447b1e';

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name.');
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError('');
        setBackground(data.weather[0].main);  
      } else {
        setError(data.message || 'City not found.');
        setWeatherData(null);
        setBackground('default');  
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      setWeatherData(null);
      setBackground('default');
    }
  };

  const setBackground = (weather) => {
    let imageUrl = '';

    switch (weather) {
      case 'Clear':
        imageUrl = "url('https://source.unsplash.com/random/1600x900/?clear-sky')";
        break;
      case 'Rain':
        imageUrl = "url('https://source.unsplash.com/random/1600x900/?rain')";
        break;
      case 'Snow':
        imageUrl = "url('https://source.unsplash.com/random/1600x900/?snow')";
        break;
      default:
        imageUrl = "url('https://source.unsplash.com/random/1600x900/?sky')";
    }

    document.body.style.backgroundImage = imageUrl;
    document.body.style.height = "100vh";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
