import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import "./weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY =process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setError("");
    } catch (err) {
      setError("City not found!");
      setWeather(null);
    }
  };

  return (
    <Container fluid className="weather-wrapper">
      <Card className="weather-card mx-auto">

        {/* Search */}
        <Form className="search-box" onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button
              variant="light"
              className="search-btn"
              onClick={getWeather}
            >
              🔍
            </Button>
          </InputGroup>
        </Form>

        {/* Error */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Weather Data */}
        {weather && (
          <>
            <div className="weather-icon">
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
            </div>

            <div className="text-center">
              <h1 className="temp">
                {Math.round(weather.main.temp)}
                <span className="degree">°C</span>
              </h1>
              <p className="city">{weather.name}</p>
            </div>

            <div className="weather-info">
              <div>
                <p className="info-value">{weather.main.humidity}%</p>
                <p className="info-label">Humidity</p>
              </div>

              <div>
                <p className="info-value">
                  {weather.wind.speed} km/h
                </p>
                <p className="info-label">Wind Speed</p>
              </div>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Weather;
