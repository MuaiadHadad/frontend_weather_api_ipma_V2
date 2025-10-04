import React from 'react';
import { SeismicData } from '../types';

interface SeismicDataCardProps {
  seismicEvents: SeismicData[];
  region: string;
}

const SeismicDataCard: React.FC<SeismicDataCardProps> = ({ seismicEvents, region }) => {
  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 5.0) return '#dc3545'; // Vermelho - Forte
    if (magnitude >= 4.0) return '#fd7e14'; // Laranja - Moderado
    if (magnitude >= 3.0) return '#ffc107'; // Amarelo - Ligeiro
    if (magnitude >= 2.0) return '#28a745'; // Verde - Muito ligeiro
    return '#6c757d'; // Cinza - Micro
  };

  const getMagnitudeDescription = (magnitude: number) => {
    if (magnitude >= 5.0) return 'Forte';
    if (magnitude >= 4.0) return 'Moderado';
    if (magnitude >= 3.0) return 'Ligeiro';
    if (magnitude >= 2.0) return 'Muito Ligeiro';
    return 'Micro';
  };

  const formatDateTime = (dateTime: string) => {
    try {
      return new Date(dateTime).toLocaleString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateTime;
    }
  };

  const getRegionFlag = (region: string) => {
    switch (region.toLowerCase()) {
      case 'continente': return '🇵🇹';
      case 'acores': return '🏝️';
      case 'madeira': return '🏝️';
      default: return '🌍';
    }
  };

  if (seismicEvents.length === 0) {
    return (
      <div className="seismic-card">
        <div className="seismic-header">
          <h3>🏠 Atividade Sísmica - {region.charAt(0).toUpperCase() + region.slice(1)}</h3>
          <span className="region-flag">{getRegionFlag(region)}</span>
        </div>
        <div className="no-seismic">
          <div className="no-seismic-icon">✅</div>
          <p>Nenhum evento sísmico significativo registado</p>
          <small>Últimos 30 dias na região {region}</small>
        </div>
      </div>
    );
  }

  // Ordenar por magnitude (maiores primeiro)
  const sortedEvents = [...seismicEvents].sort((a, b) => b.magnitude - a.magnitude);

  return (
    <div className="seismic-card">
      <div className="seismic-header">
        <h3>🏠 Atividade Sísmica - {region.charAt(0).toUpperCase() + region.slice(1)}</h3>
        <div className="seismic-stats">
          <span className="region-flag">{getRegionFlag(region)}</span>
          <span className="events-count">{seismicEvents.length} eventos</span>
        </div>
      </div>

      <div className="seismic-summary">
        <div className="summary-item">
          <span className="summary-label">Maior Magnitude:</span>
          <span
            className="summary-value magnitude"
            style={{ color: getMagnitudeColor(sortedEvents[0].magnitude) }}
          >
            {sortedEvents[0].magnitude.toFixed(1)}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Mais Recente:</span>
          <span className="summary-value">{formatDateTime(sortedEvents[0].time)}</span>
        </div>
      </div>

      <div className="seismic-list">
        {sortedEvents.slice(0, 10).map((event) => (
          <div key={event.id} className="seismic-item">
            <div className="seismic-main">
              <div className="magnitude-badge">
                <span
                  className="magnitude-value"
                  style={{ color: getMagnitudeColor(event.magnitude) }}
                >
                  {event.magnitude.toFixed(1)}
                </span>
                <span className="magnitude-label">
                  {getMagnitudeDescription(event.magnitude)}
                </span>
              </div>

              <div className="seismic-details">
                <div className="seismic-location">📍 {event.location}</div>
                <div className="seismic-time">🕐 {formatDateTime(event.time)}</div>
              </div>
            </div>

            <div className="seismic-technical">
              <div className="technical-item">
                <span className="tech-label">Profundidade:</span>
                <span className="tech-value">{event.depth.toFixed(1)} km</span>
              </div>
              <div className="technical-item">
                <span className="tech-label">Coordenadas:</span>
                <span className="tech-value">
                  {event.coordinates.latitude.toFixed(2)}°N, {Math.abs(event.coordinates.longitude).toFixed(2)}°W
                </span>
              </div>
              {event.intensity && (
                <div className="technical-item">
                  <span className="tech-label">Intensidade:</span>
                  <span className="tech-value">{event.intensity}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {seismicEvents.length > 10 && (
        <div className="seismic-footer">
          <p>Mostrando os 10 eventos mais significativos de {seismicEvents.length} registados</p>
        </div>
      )}
    </div>
  );
};

export default SeismicDataCard;
