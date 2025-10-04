import React from 'react';
import { FireRisk, UVIndex, SeaState } from '../types';

interface MarineEnvironmentalCardProps {
  fireRisks?: FireRisk[];
  uvIndices?: UVIndex[];
  seaStates?: SeaState[];
}

const MarineEnvironmentalCard: React.FC<MarineEnvironmentalCardProps> = ({
  fireRisks,
  uvIndices,
  seaStates
}) => {
  const getFireRiskColor = (level: number) => {
    switch (level) {
      case 1: return '#28a745'; // Verde - Baixo
      case 2: return '#ffc107'; // Amarelo - Moderado
      case 3: return '#fd7e14'; // Laranja - Elevado
      case 4: return '#dc3545'; // Vermelho - Muito Elevado
      case 5: return '#721c24'; // Vermelho escuro - Máximo
      default: return '#6c757d';
    }
  };

  const getUVColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'baixo': return '#28a745';
      case 'moderado': return '#ffc107';
      case 'alto': return '#fd7e14';
      case 'muito alto': return '#dc3545';
      case 'extremo': return '#721c24';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="marine-environmental-card">
      <div className="marine-header">
        <h3>🌊 Dados Marítimos e Ambientais</h3>
      </div>

      <div className="marine-sections">
        {/* Risco de Incêndio */}
        {fireRisks && fireRisks.length > 0 && (
          <div className="marine-section">
            <h4>🔥 Risco de Incêndio</h4>
            <div className="fire-risk-grid">
              {fireRisks.slice(0, 6).map((risk, index) => (
                <div key={index} className="fire-risk-item">
                  <div className="risk-header">
                    <span className="location">📍 {risk.location}</span>
                    <span
                      className="risk-level"
                      style={{ backgroundColor: getFireRiskColor(risk.risk_level) }}
                    >
                      Nível {risk.risk_level}
                    </span>
                  </div>
                  <div className="risk-description">{risk.risk_description}</div>
                  <div className="risk-details">
                    {risk.temperature && (
                      <span className="detail-item">🌡️ {risk.temperature.toFixed(1)}°C</span>
                    )}
                    {risk.humidity && (
                      <span className="detail-item">💧 {risk.humidity.toFixed(0)}%</span>
                    )}
                    {risk.wind_speed && (
                      <span className="detail-item">🌬️ {risk.wind_speed.toFixed(1)} km/h</span>
                    )}
                  </div>
                  <div className="risk-date">📅 {formatDate(risk.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Índice UV */}
        {uvIndices && uvIndices.length > 0 && (
          <div className="marine-section">
            <h4>☀️ Índice Ultravioleta</h4>
            <div className="uv-grid">
              {uvIndices.slice(0, 6).map((uv, index) => (
                <div key={index} className="uv-item">
                  <div className="uv-header">
                    <span className="location">📍 {uv.location}</span>
                    <span
                      className="uv-index"
                      style={{ backgroundColor: getUVColor(uv.uv_level) }}
                    >
                      UV {uv.uv_index}
                    </span>
                  </div>
                  <div
                    className="uv-level"
                    style={{ color: getUVColor(uv.uv_level) }}
                  >
                    {uv.uv_level}
                  </div>
                  {uv.protection_time && (
                    <div className="protection-time">
                      ⏱️ Proteção: {uv.protection_time} min
                    </div>
                  )}
                  <div className="uv-date">📅 {formatDate(uv.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado do Mar */}
        {seaStates && seaStates.length > 0 && (
          <div className="marine-section">
            <h4>🌊 Estado do Mar</h4>
            <div className="sea-state-grid">
              {seaStates.slice(0, 4).map((sea, index) => (
                <div key={index} className="sea-state-item">
                  <div className="sea-header">
                    <span className="location">📍 {sea.location}</span>
                    <span className="sea-date">📅 {formatDate(sea.date)}</span>
                  </div>

                  <div className="sea-details">
                    {sea.wave_height && (
                      <div className="sea-detail">
                        <span className="detail-icon">🌊</span>
                        <span className="detail-label">Altura das ondas:</span>
                        <span className="detail-value">{sea.wave_height.toFixed(1)}m</span>
                      </div>
                    )}

                    {sea.wave_period && (
                      <div className="sea-detail">
                        <span className="detail-icon">⏱️</span>
                        <span className="detail-label">Período:</span>
                        <span className="detail-value">{sea.wave_period.toFixed(1)}s</span>
                      </div>
                    )}

                    {sea.wave_direction && (
                      <div className="sea-detail">
                        <span className="detail-icon">🧭</span>
                        <span className="detail-label">Direção:</span>
                        <span className="detail-value">{sea.wave_direction}</span>
                      </div>
                    )}

                    {sea.sea_temperature && (
                      <div className="sea-detail">
                        <span className="detail-icon">🌡️</span>
                        <span className="detail-label">Temperatura:</span>
                        <span className="detail-value">{sea.sea_temperature.toFixed(1)}°C</span>
                      </div>
                    )}
                  </div>

                  {sea.coastal_conditions && (
                    <div className="coastal-conditions">
                      <span className="conditions-label">Condições costeiras:</span>
                      <span className="conditions-value">{sea.coastal_conditions}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {(!fireRisks || fireRisks.length === 0) &&
       (!uvIndices || uvIndices.length === 0) &&
       (!seaStates || seaStates.length === 0) && (
        <div className="no-marine-data">
          <div className="no-data-icon">📊</div>
          <p>Dados marítimos e ambientais indisponíveis</p>
          <small>Tente novamente mais tarde</small>
        </div>
      )}
    </div>
  );
};

export default MarineEnvironmentalCard;
