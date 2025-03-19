import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "0cf7889ff494aaa5a23d6d547c40caef";

  const fetchWeatherData = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Weather App
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City Name
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Searching..." : "Get Weather"}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-4 text-red-500 bg-white p-3 rounded-lg shadow-md animate-fade-in">
          {error}
        </div>
      )}

      {weatherData && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all hover:scale-105 animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Weather in {weatherData.name}
          </h2>
          <div className="flex flex-col items-center space-y-4">
            {/* Weather Icon */}
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="w-24 h-24 animate-bounce"
            />
            {/* Weather Description */}
            <p className="text-xl text-gray-700 capitalize">
              {weatherData.weather[0].description}
            </p>
            {/* Temperature */}
            <p className="text-4xl font-bold text-gray-800">
              {weatherData.main.temp}°C
            </p>
            {/* Additional Weather Data */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Feels Like</p>
                <p className="text-lg font-semibold text-gray-800">
                  {weatherData.main.feels_like}°C
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-lg font-semibold text-gray-800">
                  {weatherData.main.humidity}%
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-lg font-semibold text-gray-800">
                  {weatherData.wind.speed} m/s
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600">Pressure</p>
                <p className="text-lg font-semibold text-gray-800">
                  {weatherData.main.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
