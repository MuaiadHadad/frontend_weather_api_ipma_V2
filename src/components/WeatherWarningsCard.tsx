import React from 'react';
import { WeatherWarning } from '../types';

interface WeatherWarningsCardProps {
  warnings: WeatherWarning[];
}

const WeatherWarningsCard: React.FC<WeatherWarningsCardProps> = ({ warnings }) => {
  const getWarningLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'verde': return '#28a745';
      case 'amarelo': return '#ffc107';
      case 'laranja': return '#fd7e14';
      case 'vermelho': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getWarningIcon = (type: string) => {
    const typeStr = type.toLowerCase();
    if (typeStr.includes('vento')) return '🌬️';
    if (typeStr.includes('chuva') || typeStr.includes('precipitação')) return '🌧️';
    if (typeStr.includes('neve')) return '❄️';
    if (typeStr.includes('trovoada')) return '⛈️';
    if (typeStr.includes('temperatura')) return '🌡️';
    if (typeStr.includes('nevoeiro')) return '🌫️';
    if (typeStr.includes('agitação')) return '🌊';
    return '⚠️';
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

  if (warnings.length === 0) {
    return (
      <div className="warnings-card">
        <div className="warnings-header">
          <h3>⚠️ Avisos Meteorológicos</h3>
        </div>
        <div className="no-warnings">
          <div className="no-warnings-icon">✅</div>
          <p>Não existem avisos meteorológicos ativos</p>
          <small>Situação meteorológica normal em todo o território</small>
        </div>
      </div>
    );
  }

  return (
    <div className="warnings-card">
      <div className="warnings-header">
        <h3>⚠️ Avisos Meteorológicos</h3>
        <span className="warnings-count">{warnings.length} ativo{warnings.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="warnings-list">
        {warnings.map((warning) => (
          <div
            key={warning.id}
            className="warning-item"
            style={{ borderLeftColor: getWarningLevelColor(warning.level) }}
          >
            <div className="warning-main">
              <div className="warning-title">
                <span className="warning-icon">{getWarningIcon(warning.warning_type)}</span>
                <span className="warning-type">{warning.warning_type}</span>
                <span
                  className="warning-level"
                  style={{ backgroundColor: getWarningLevelColor(warning.level) }}
                >
                  {warning.level.toUpperCase()}
                </span>
              </div>
              <div className="warning-area">📍 {warning.area}</div>
            </div>

            <div className="warning-description">
              <p>{warning.description}</p>
            </div>

            <div className="warning-timeline">
              <div className="timeline-item">
                <span className="timeline-label">Início:</span>
                <span className="timeline-value">{formatDateTime(warning.start_time)}</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Fim:</span>
                <span className="timeline-value">{formatDateTime(warning.end_time)}</span>
              </div>
            </div>

            {warning.phenomenon && (
              <div className="warning-phenomenon">
                <span className="phenomenon-label">Fenómeno:</span>
                <span className="phenomenon-value">{warning.phenomenon}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWarningsCard;
