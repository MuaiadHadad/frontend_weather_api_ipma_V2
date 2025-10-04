import React from 'react';
import { DailyForecast } from '../types';

interface WeatherCardProps {
  forecast: DailyForecast;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
  const formatTemperature = (temp: number | null | undefined) => {
    if (temp === null || temp === undefined) return 'N/A';
    return `${temp.toFixed(1)}°C`;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-PT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('limpo') || desc.includes('sol')) return '☀️';
    if (desc.includes('nublado') || desc.includes('nuvens')) return '☁️';
    if (desc.includes('chuva') || desc.includes('chuvoso')) return '🌧️';
    if (desc.includes('vento')) return '🌬️';
    if (desc.includes('neve')) return '❄️';
    if (desc.includes('trovoada')) return '⛈️';
    return '🌤️';
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{forecast.location}</h2>
        <p className="district">{forecast.district}</p>
        <p className="date">{formatDate(forecast.date)}</p>
      </div>

      {(forecast.min_temperature !== null && forecast.min_temperature !== undefined) &&
       (forecast.max_temperature !== null && forecast.max_temperature !== undefined) && (
        <div className="temperature-range">
          <div className="temp-item">
            <span className="temp-label">Mínima</span>
            <span className="min-temp">{formatTemperature(forecast.min_temperature)}</span>
          </div>
          <div className="temp-item">
            <span className="temp-label">Máxima</span>
            <span className="max-temp">{formatTemperature(forecast.max_temperature)}</span>
          </div>
        </div>
      )}

      <div className="hourly-forecasts">
        <h3 className="hourly-title">Previsão Horária</h3>
        {forecast.hourly_forecasts && forecast.hourly_forecasts.length > 0 ? (
          forecast.hourly_forecasts.map((hourly, index) => (
            <div key={index} className="hourly-item">
              <div className="hourly-main">
                <div className="time-temp">
                  <span className="time">{hourly.hour}</span>
                  <span className="temperature">{formatTemperature(hourly.temperature)}</span>
                </div>
                <div className="condition-info">
                  <span className="weather-icon">{getWeatherIcon(hourly.weather_condition.description)}</span>
                  <span className="condition">{hourly.weather_condition.description}</span>
                </div>
              </div>

              {(hourly.precipitation_probability || hourly.wind_speed) && (
                <div className="additional-info">
                  {hourly.precipitation_probability !== null && hourly.precipitation_probability !== undefined && (
                    <div className="info-item precipitation">
                      <span className="icon">💧</span>
                      <span>{hourly.precipitation_probability}%</span>
                    </div>
                  )}
                  {hourly.wind_speed !== null && hourly.wind_speed !== undefined && (
                    <div className="info-item wind">
                      <span className="icon">🌬️</span>
                      <span>
                        {hourly.wind_speed.toFixed(1)} km/h
                        {hourly.wind_direction && ` ${hourly.wind_direction}`}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>Dados horários não disponíveis</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
