import React from 'react';
import { AgriculturalData, WaterQuality } from '../types';

interface AgriculturalDataCardProps {
  agriculturalData?: AgriculturalData[];
  waterQuality?: WaterQuality[];
  dataType?: string;
}

const AgriculturalDataCard: React.FC<AgriculturalDataCardProps> = ({
  agriculturalData,
  waterQuality,
  dataType
}) => {
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

  const getDataTypeIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'evapotranspiration': return '💨';
      case 'precipitation': return '🌧️';
      case 'temperature_min': return '🌡️❄️';
      case 'temperature_max': return '🌡️🔥';
      case 'pdsi': return '🏜️';
      default: return '🌾';
    }
  };

  const getDataTypeTitle = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'evapotranspiration': return 'Evapotranspiração';
      case 'precipitation': return 'Precipitação';
      case 'temperature_min': return 'Temperatura Mínima';
      case 'temperature_max': return 'Temperatura Máxima';
      case 'pdsi': return 'Índice de Seca (PDSI)';
      default: return 'Dados Agrícolas';
    }
  };

  const getDataValue = (data: AgriculturalData, type?: string) => {
    switch (type?.toLowerCase()) {
      case 'evapotranspiration':
        return data.evapotranspiration ? `${data.evapotranspiration.toFixed(2)} mm` : 'N/A';
      case 'precipitation':
        return data.precipitation ? `${data.precipitation.toFixed(1)} mm` : 'N/A';
      case 'temperature_min':
        return data.min_temperature ? `${data.min_temperature.toFixed(1)}°C` : 'N/A';
      case 'temperature_max':
        return data.max_temperature ? `${data.max_temperature.toFixed(1)}°C` : 'N/A';
      case 'pdsi':
        return data.pdsi_index ? data.pdsi_index.toFixed(2) : 'N/A';
      default:
        return 'N/A';
    }
  };

  const getPDSIDescription = (pdsi?: number) => {
    if (!pdsi) return '';
    if (pdsi >= 3) return 'Muito Húmido';
    if (pdsi >= 1) return 'Húmido';
    if (pdsi >= -1) return 'Normal';
    if (pdsi >= -3) return 'Seco';
    return 'Muito Seco';
  };

  const getPDSIColor = (pdsi?: number) => {
    if (!pdsi) return '#6c757d';
    if (pdsi >= 3) return '#007bff'; // Azul - Muito húmido
    if (pdsi >= 1) return '#28a745'; // Verde - Húmido
    if (pdsi >= -1) return '#ffc107'; // Amarelo - Normal
    if (pdsi >= -3) return '#fd7e14'; // Laranja - Seco
    return '#dc3545'; // Vermelho - Muito seco
  };

  const getWaterStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aberta': return '#28a745';
      case 'fechada': return '#dc3545';
      case 'condicional': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getWaterStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aberta': return '✅';
      case 'fechada': return '❌';
      case 'condicional': return '⚠️';
      default: return '❓';
    }
  };

  return (
    <div className="agricultural-card">
      <div className="agricultural-header">
        <h3>🌾 Dados Agrícolas e Ambientais</h3>
      </div>

      {/* Dados Agrícolas */}
      {agriculturalData && agriculturalData.length > 0 && (
        <div className="agricultural-section">
          <h4>
            {getDataTypeIcon(dataType)} {getDataTypeTitle(dataType)}
          </h4>

          <div className="agricultural-grid">
            {agriculturalData.slice(0, 12).map((data, index) => (
              <div key={index} className="agricultural-item">
                <div className="agri-header">
                  <span className="municipality">📍 {data.municipality}</span>
                  <span className="agri-date">{formatDate(data.date)}</span>
                </div>

                <div className="agri-value">
                  <span className="value-number">
                    {getDataValue(data, dataType)}
                  </span>

                  {dataType === 'pdsi' && data.pdsi_index && (
                    <span
                      className="pdsi-description"
                      style={{ color: getPDSIColor(data.pdsi_index) }}
                    >
                      {getPDSIDescription(data.pdsi_index)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {agriculturalData.length > 12 && (
            <div className="agricultural-footer">
              <p>Mostrando 12 de {agriculturalData.length} registos disponíveis</p>
            </div>
          )}
        </div>
      )}

      {/* Qualidade da Água */}
      {waterQuality && waterQuality.length > 0 && (
        <div className="agricultural-section">
          <h4>🦪 Qualidade da Água - Moluscos Bivalves</h4>

          <div className="water-quality-grid">
            {waterQuality.map((zone, index) => (
              <div key={index} className="water-quality-item">
                <div className="zone-header">
                  <span className="zone-name">{zone.zone_name}</span>
                  <span
                    className="zone-status"
                    style={{
                      backgroundColor: getWaterStatusColor(zone.status),
                      color: 'white'
                    }}
                  >
                    {getWaterStatusIcon(zone.status)} {zone.status}
                  </span>
                </div>

                <div className="zone-details">
                  <div className="zone-id">ID: {zone.zone_id}</div>

                  {zone.restriction_type && (
                    <div className="restriction-type">
                      Restrição: {zone.restriction_type}
                    </div>
                  )}

                  <div className="zone-coordinates">
                    📍 {zone.coordinates.latitude.toFixed(2)}°N, {Math.abs(zone.coordinates.longitude).toFixed(2)}°W
                  </div>

                  <div className="last-update">
                    Atualizado: {formatDate(zone.last_update)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="water-quality-legend">
            <div className="legend-item">
              <span style={{ color: '#28a745' }}>✅ Aberta</span> - Apanha permitida
            </div>
            <div className="legend-item">
              <span style={{ color: '#dc3545' }}>❌ Fechada</span> - Apanha proibida
            </div>
            <div className="legend-item">
              <span style={{ color: '#ffc107' }}>⚠️ Condicional</span> - Apanha condicionada
            </div>
          </div>
        </div>
      )}

      {(!agriculturalData || agriculturalData.length === 0) &&
       (!waterQuality || waterQuality.length === 0) && (
        <div className="no-agricultural-data">
          <div className="no-data-icon">🌾</div>
          <p>Dados agrícolas e ambientais indisponíveis</p>
          <small>Tente novamente mais tarde</small>
        </div>
      )}
    </div>
  );
};

export default AgriculturalDataCard;
