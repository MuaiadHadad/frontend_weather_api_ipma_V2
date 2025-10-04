import React from 'react';
import { DashboardData } from '../types';

interface DashboardCardProps {
  dashboard: DashboardData;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ dashboard }) => {
  const getStatusIcon = (status: string) => {
    if (status.includes('🟢') || status.includes('✅')) return '🟢';
    if (status.includes('🔴') || status.includes('❌')) return '🔴';
    if (status.includes('🟡') || status.includes('⚠️')) return '🟡';
    return '📊';
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-header">
        <h2>📊 Dashboard IPMA</h2>
        <div className="api-status-badge">
          <span className="status-icon">{getStatusIcon(dashboard.api_status)}</span>
          <span>{dashboard.api_status}</span>
          <small>v{dashboard.version}</small>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Resumo de Dados */}
        <div className="dashboard-section">
          <h3>📈 Resumo de Dados</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{dashboard.data_summary.districts_available}</span>
              <span className="stat-label">Distritos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{dashboard.data_summary.active_warnings}</span>
              <span className="stat-label">Avisos Ativos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{dashboard.data_summary.recent_seismic_events}</span>
              <span className="stat-label">Eventos Sísmicos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{dashboard.data_summary.weather_stations}</span>
              <span className="stat-label">Estações</span>
            </div>
          </div>
        </div>

        {/* Status dos Serviços */}
        <div className="dashboard-section">
          <h3>🔧 Status dos Serviços</h3>
          <div className="services-list">
            {Object.entries(dashboard.service_status).map(([service, status]) => (
              <div key={service} className="service-item">
                <span className="service-icon">{getStatusIcon(status)}</span>
                <span className="service-name">{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                <span className="service-status">{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cobertura Geográfica */}
        <div className="dashboard-section">
          <h3>🌍 Cobertura Geográfica</h3>
          <div className="coverage-list">
            <div className="coverage-item">
              <span>🇵🇹 Portugal Continental</span>
              <span className="coverage-status">{dashboard.coverage.portugal_mainland}</span>
            </div>
            <div className="coverage-item">
              <span>🏝️ Açores</span>
              <span className="coverage-status">{dashboard.coverage.azores}</span>
            </div>
            <div className="coverage-item">
              <span>🏝️ Madeira</span>
              <span className="coverage-status">{dashboard.coverage.madeira}</span>
            </div>
            <div className="coverage-item">
              <span>🌊 Áreas Marítimas</span>
              <span className="coverage-status">{dashboard.coverage.marine_areas}</span>
            </div>
          </div>
        </div>

        {/* Atualização de Dados */}
        <div className="dashboard-section">
          <h3>🔄 Frequência de Atualização</h3>
          <div className="freshness-list">
            {Object.entries(dashboard.data_freshness).map(([dataType, frequency]) => (
              <div key={dataType} className="freshness-item">
                <span className="data-type">{dataType.charAt(0).toUpperCase() + dataType.slice(1)}</span>
                <span className="frequency">{frequency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <p>📅 Última atualização: {dashboard.last_update}</p>
        <p>🌐 Dados fornecidos pelo IPMA em tempo real</p>
      </div>
    </div>
  );
};

export default DashboardCard;
