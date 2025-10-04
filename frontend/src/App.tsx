import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import DashboardCard from './components/DashboardCard';
import WeatherWarningsCard from './components/WeatherWarningsCard';
import SeismicDataCard from './components/SeismicDataCard';
import MarineEnvironmentalCard from './components/MarineEnvironmentalCard';
import StationsDataCard from './components/StationsDataCard';
import AgriculturalDataCard from './components/AgriculturalDataCard';
import { weatherService } from './services/weatherService';
import {
  DailyForecast, Location, DashboardData, WeatherWarning, SeismicData,
  FireRisk, UVIndex, SeaState, WeatherStation, StationObservation,
  AgriculturalData, WaterQuality, DataCategory
} from './types';
import './App.css';

const App: React.FC = () => {
  // Estados originais (previsões meteorológicas)
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [forecast, setForecast] = useState<DailyForecast | null>(null);

  // Estados expandidos para novos recursos
  const [activeCategory, setActiveCategory] = useState<DataCategory>('dashboard');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [weatherWarnings, setWeatherWarnings] = useState<WeatherWarning[]>([]);
  const [seismicData, setSeismicData] = useState<SeismicData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('continente');
  const [fireRisks, setFireRisks] = useState<FireRisk[]>([]);
  const [uvIndices, setUVIndices] = useState<UVIndex[]>([]);
  const [seaStates, setSeaStates] = useState<SeaState[]>([]);
  const [stations, setStations] = useState<WeatherStation[]>([]);
  const [observations, setObservations] = useState<StationObservation[]>([]);
  const [agriculturalData, setAgriculturalData] = useState<AgriculturalData[]>([]);
  const [waterQuality, setWaterQuality] = useState<WaterQuality[]>([]);
  const [selectedAgriculturalType, setSelectedAgriculturalType] = useState<string>('precipitation');

  // Estados de controle
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<string>('');

  // Carregar dados iniciais
  useEffect(() => {
    loadInitialData();
  }, []);

  // Carregar dados baseados na categoria ativa
  useEffect(() => {
    loadCategoryData();
  }, [activeCategory, selectedRegion, selectedAgriculturalType]);

  // Carregar localidades quando distrito for selecionado
  useEffect(() => {
    if (selectedDistrict && activeCategory === 'weather') {
      loadLocations(selectedDistrict);
    }
  }, [selectedDistrict]);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);

      // Carregar status da API
      const health = await weatherService.healthCheck();
      setApiStatus(health.status === 'healthy' ? '🟢 API Online' : '🔴 API Offline');

      // Carregar dashboard por padrão
      const dashboardResponse = await weatherService.getDashboard();
      if (dashboardResponse.success && dashboardResponse.dashboard) {
        setDashboard(dashboardResponse.dashboard);
      }

      // Carregar distritos para previsões
      const districtsResponse = await weatherService.getDistricts();
      if (districtsResponse.success && districtsResponse.data) {
        setDistricts(districtsResponse.data.districts);
      }

    } catch (err) {
      setError('Erro ao carregar dados iniciais');
      setApiStatus('🔴 API Offline');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategoryData = async () => {
    try {
      setIsLoading(true);
      setError('');

      switch (activeCategory) {
        case 'dashboard':
          const dashboardResponse = await weatherService.getDashboard();
          if (dashboardResponse.success && dashboardResponse.dashboard) {
            setDashboard(dashboardResponse.dashboard);
          }
          break;

        case 'warnings':
          const warningsResponse = await weatherService.getWeatherWarnings();
          if (warningsResponse.success && warningsResponse.data) {
            setWeatherWarnings(warningsResponse.data);
          }
          break;

        case 'seismic':
          const seismicResponse = await weatherService.getSeismicData(selectedRegion);
          if (seismicResponse.success && seismicResponse.data) {
            setSeismicData(seismicResponse.data);
          }
          break;

        case 'marine':
          // Carregar dados marítimos e ambientais
          const [fireResponse, uvResponse, seaResponse] = await Promise.all([
            weatherService.getFireRisk(),
            weatherService.getUVIndex(),
            weatherService.getSeaState()
          ]);

          if (fireResponse.success && fireResponse.data) {
            setFireRisks(fireResponse.data);
          }
          if (uvResponse.success && uvResponse.data) {
            setUVIndices(uvResponse.data);
          }
          if (seaResponse.success && seaResponse.data) {
            setSeaStates(seaResponse.data);
          }
          break;

        case 'stations':
          const [stationsResponse, observationsResponse] = await Promise.all([
            weatherService.getWeatherStations(),
            weatherService.getLatestObservations()
          ]);

          if (stationsResponse.success && stationsResponse.data) {
            setStations(stationsResponse.data);
          }
          if (observationsResponse.success && observationsResponse.data) {
            setObservations(observationsResponse.data);
          }
          break;

        case 'agriculture':
          // Carregar dados agrícolas baseado no tipo selecionado
          let agriculturalResponse;
          switch (selectedAgriculturalType) {
            case 'evapotranspiration':
              agriculturalResponse = await weatherService.getEvapotranspiration();
              break;
            case 'precipitation':
              agriculturalResponse = await weatherService.getPrecipitationData();
              break;
            case 'temperature_min':
              agriculturalResponse = await weatherService.getMinTemperature();
              break;
            case 'temperature_max':
              agriculturalResponse = await weatherService.getMaxTemperature();
              break;
            case 'pdsi':
              agriculturalResponse = await weatherService.getPDSIIndex();
              break;
            default:
              agriculturalResponse = await weatherService.getPrecipitationData();
          }

          if (agriculturalResponse.success && agriculturalResponse.data) {
            setAgriculturalData(agriculturalResponse.data);
          }

          // Carregar qualidade da água
          const waterResponse = await weatherService.getWaterQuality();
          if (waterResponse.success && waterResponse.data) {
            setWaterQuality(waterResponse.data);
          }
          break;
      }

    } catch (err) {
      setError(`Erro ao carregar dados de ${activeCategory}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLocations = async (district: string) => {
    try {
      setIsLoading(true);
      const response = await weatherService.getLocationsByDistrict(district);
      if (response.success && response.data) {
        setLocations(response.data);
        setSelectedLocation('');
        setForecast(null);
      }
    } catch (err) {
      setError('Erro ao carregar localidades');
    } finally {
      setIsLoading(false);
    }
  };

  const getForecast = async () => {
    if (!selectedDistrict || !selectedLocation) {
      setError('Por favor selecione distrito e localidade');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      let response;
      if (selectedDate) {
        response = await weatherService.getForecastByDate(selectedDistrict, selectedLocation, selectedDate);
      } else {
        response = await weatherService.getCurrentForecast(selectedDistrict, selectedLocation);
      }

      if (response.success && response.data) {
        setForecast(response.data);
      } else {
        setError(response.message || 'Erro ao obter previsão');
      }
    } catch (err) {
      setError(`Erro ao conectar com a API: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);
    return maxDate.toISOString().split('T')[0];
  };

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'dashboard':
        return dashboard ? <DashboardCard dashboard={dashboard} /> : null;

      case 'weather':
        return (
          <div className="weather-section">
            <div className="controls">
              <div className="form-group">
                <label htmlFor="district">Distrito:</label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Selecione um distrito</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district.charAt(0).toUpperCase() + district.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Localidade:</label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  disabled={isLoading || !selectedDistrict}
                >
                  <option value="">Selecione uma localidade</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.name.toLowerCase()}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Data (opcional):</label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getCurrentDate()}
                  max={getMaxDate()}
                />
              </div>

              <button
                onClick={getForecast}
                disabled={isLoading || !selectedDistrict || !selectedLocation}
                className="get-forecast-btn"
              >
                {isLoading ? 'Carregando...' : 'Obter Previsão'}
              </button>
            </div>

            {forecast && <WeatherCard forecast={forecast} />}
          </div>
        );

      case 'warnings':
        return <WeatherWarningsCard warnings={weatherWarnings} />;

      case 'seismic':
        return (
          <div className="seismic-section">
            <div className="region-selector">
              <label htmlFor="region">Região:</label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                disabled={isLoading}
              >
                <option value="continente">Continente</option>
                <option value="acores">Açores</option>
                <option value="madeira">Madeira</option>
              </select>
            </div>
            <SeismicDataCard seismicEvents={seismicData} region={selectedRegion} />
          </div>
        );

      case 'marine':
        return (
          <MarineEnvironmentalCard
            fireRisks={fireRisks}
            uvIndices={uvIndices}
            seaStates={seaStates}
          />
        );

      case 'stations':
        return <StationsDataCard stations={stations} observations={observations} />;

      case 'agriculture':
        return (
          <div className="agriculture-section">
            <div className="agriculture-selector">
              <label htmlFor="agri-type">Tipo de Dados:</label>
              <select
                id="agri-type"
                value={selectedAgriculturalType}
                onChange={(e) => setSelectedAgriculturalType(e.target.value)}
                disabled={isLoading}
              >
                <option value="precipitation">Precipitação</option>
                <option value="evapotranspiration">Evapotranspiração</option>
                <option value="temperature_min">Temperatura Mínima</option>
                <option value="temperature_max">Temperatura Máxima</option>
                <option value="pdsi">Índice de Seca (PDSI)</option>
              </select>
            </div>
            <AgriculturalDataCard
              agriculturalData={agriculturalData}
              waterQuality={waterQuality}
              dataType={selectedAgriculturalType}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather API IPMA - Versão Completa</h1>
        <p>Plataforma completa de dados meteorológicos e ambientais de Portugal</p>
        <div className="api-status">{apiStatus}</div>
      </header>

      <nav className="app-nav">
        <div className="nav-categories">
          <button
            className={`nav-btn ${activeCategory === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveCategory('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-btn ${activeCategory === 'weather' ? 'active' : ''}`}
            onClick={() => setActiveCategory('weather')}
          >
            🌤️ Previsões
          </button>
          <button
            className={`nav-btn ${activeCategory === 'warnings' ? 'active' : ''}`}
            onClick={() => setActiveCategory('warnings')}
          >
            ⚠️ Avisos
          </button>
          <button
            className={`nav-btn ${activeCategory === 'seismic' ? 'active' : ''}`}
            onClick={() => setActiveCategory('seismic')}
          >
            🏠 Sísmica
          </button>
          <button
            className={`nav-btn ${activeCategory === 'marine' ? 'active' : ''}`}
            onClick={() => setActiveCategory('marine')}
          >
            🌊 Marítimo
          </button>
          <button
            className={`nav-btn ${activeCategory === 'stations' ? 'active' : ''}`}
            onClick={() => setActiveCategory('stations')}
          >
            🏭 Estações
          </button>
          <button
            className={`nav-btn ${activeCategory === 'agriculture' ? 'active' : ''}`}
            onClick={() => setActiveCategory('agriculture')}
          >
            🌾 Agricultura
          </button>
        </div>
      </nav>

      <main className="app-main">
        {error && (
          <div className="error-message">
            ❌ {error}
            <details style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              <summary style={{ cursor: 'pointer' }}>Detalhes técnicos</summary>
              <div style={{ marginTop: '0.5rem', textAlign: 'left', background: 'rgba(0,0,0,0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                <p>Categoria ativa: {activeCategory}</p>
                <p>Distrito: {selectedDistrict || 'não selecionado'}</p>
                <p>Localidade: {selectedLocation || 'não selecionado'}</p>
                <p>Data: {selectedDate || 'atual'}</p>
                <p>Região sísmica: {selectedRegion}</p>
                <p>Tipo agrícola: {selectedAgriculturalType}</p>
              </div>
            </details>
          </div>
        )}

        {isLoading && (
          <div className="loading-message">
            <div className="loading-spinner">🔄</div>
            <p>Carregando dados do IPMA...</p>
          </div>
        )}

        <div className="content-area">
          {renderCategoryContent()}
        </div>
      </main>

      <footer className="app-footer">
        <p>Dados meteorológicos e ambientais fornecidos pelo IPMA (Instituto Português do Mar e da Atmosfera)</p>
        <p>Desenvolvido com ❤️ usando React + TypeScript + FastAPI - Versão 2.0 Completa</p>
        <div className="footer-stats">
          <span>📊 25+ Endpoints</span>
          <span>🌍 100% Cobertura IPMA</span>
          <span>⚡ Cache Inteligente</span>
          <span>🚀 Tempo Real</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
