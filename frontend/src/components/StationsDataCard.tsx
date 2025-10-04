import React from 'react';
import { WeatherStation, StationObservation } from '../types';

interface StationsDataCardProps {
  stations?: WeatherStation[];
  observations?: StationObservation[];
}

const StationsDataCard: React.FC<StationsDataCardProps> = ({ stations, observations }) => {
  const formatDateTime = (dateTime: string) => {
    try {
      return new Date(dateTime).toLocaleString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateTime;
    }
  };

  const getWindDirection = (direction?: string) => {
    if (!direction) return '';
    const dirs: { [key: string]: string } = {
      'N': '⬆️', 'NE': '↗️', 'E': '➡️', 'SE': '↘️',
      'S': '⬇️', 'SW': '↙️', 'W': '⬅️', 'NW': '↖️'
    };
    return dirs[direction.toUpperCase()] || direction;
  };

  const getTemperatureColor = (temp?: number) => {
    if (!temp) return '#6c757d';
    if (temp >= 35) return '#dc3545'; // Muito quente
    if (temp >= 25) return '#fd7e14'; // Quente
    if (temp >= 15) return '#ffc107'; // Ameno
    if (temp >= 5) return '#28a745';  // Fresco
    return '#007bff'; // Frio
  };

  return (
    <div className="stations-card">
      <div className="stations-header">
        <h3>🏭 Estações Meteorológicas</h3>
        <div className="stations-stats">
          {stations && <span className="stations-count">{stations.length} estações</span>}
          {observations && <span className="observations-count">{observations.length} observações</span>}
        </div>
      </div>

      {/* Observações Meteorológicas */}
      {observations && observations.length > 0 && (
        <div className="stations-section">
          <h4>📡 Observações Recentes</h4>
          <div className="observations-grid">
            {observations.slice(0, 8).map((obs, index) => (
              <div key={index} className="observation-item">
                <div className="observation-header">
                  <span className="station-name">{obs.station_name}</span>
                  <span className="observation-time">{formatDateTime(obs.timestamp)}</span>
                </div>

                <div className="observation-data">
                  {obs.temperature && (
                    <div className="data-item">
                      <span
                        className="data-icon temperature"
                        style={{ color: getTemperatureColor(obs.temperature) }}
                      >
                        🌡️
                      </span>
                      <span className="data-value">{obs.temperature.toFixed(1)}°C</span>
                    </div>
                  )}

                  {obs.humidity && (
                    <div className="data-item">
                      <span className="data-icon">💧</span>
                      <span className="data-value">{obs.humidity.toFixed(0)}%</span>
                    </div>
                  )}

                  {obs.pressure && (
                    <div className="data-item">
                      <span className="data-icon">📊</span>
                      <span className="data-value">{obs.pressure.toFixed(1)} hPa</span>
                    </div>
                  )}

                  {obs.wind_speed && (
                    <div className="data-item">
                      <span className="data-icon">🌬️</span>
                      <span className="data-value">
                        {obs.wind_speed.toFixed(1)} km/h
                        {obs.wind_direction && (
                          <span className="wind-direction">
                            {getWindDirection(obs.wind_direction)}
                          </span>
                        )}
                      </span>
                    </div>
                  )}

                  {obs.precipitation && obs.precipitation > 0 && (
                    <div className="data-item">
                      <span className="data-icon">🌧️</span>
                      <span className="data-value">{obs.precipitation.toFixed(1)} mm</span>
                    </div>
                  )}

                  {obs.visibility && (
                    <div className="data-item">
                      <span className="data-icon">👁️</span>
                      <span className="data-value">{obs.visibility.toFixed(1)} km</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Estações */}
      {stations && stations.length > 0 && (
        <div className="stations-section">
          <h4>📍 Localização das Estações</h4>
          <div className="stations-list">
            {stations.slice(0, 12).map((station, index) => (
              <div key={index} className="station-item">
                <div className="station-info">
                  <span className="station-name">{station.name}</span>
                  <span className="station-id">ID: {station.id}</span>
                </div>

                <div className="station-location">
                  <span className="coordinates">
                    📍 {station.coordinates.latitude.toFixed(2)}°N, {Math.abs(station.coordinates.longitude).toFixed(2)}°W
                  </span>
                  {station.altitude && (
                    <span className="altitude">⛰️ {station.altitude}m</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {stations.length > 12 && (
            <div className="stations-footer">
              <p>Mostrando 12 de {stations.length} estações disponíveis</p>
            </div>
          )}
        </div>
      )}

      {(!stations || stations.length === 0) && (!observations || observations.length === 0) && (
        <div className="no-stations-data">
          <div className="no-data-icon">📡</div>
          <p>Dados de estações meteorológicas indisponíveis</p>
          <small>Tente novamente mais tarde</small>
        </div>
      )}
    </div>
  );
};

export default StationsDataCard;
