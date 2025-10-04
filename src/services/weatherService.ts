import axios from 'axios';
import {
  ForecastResponse, LocationsResponse, DistrictsResponse,
  WeatherWarningsResponse, SeismicResponse, SeaStateResponse,
  FireRiskResponse, UVIndexResponse, StationsResponse,
  ObservationsResponse, AgriculturalResponse, WaterQualityResponse,
  DashboardResponse, ServiceHealth
} from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const weatherService = {
  // ==================== PREVISÕES METEOROLÓGICAS (ORIGINAL) ====================

  async getDistricts(): Promise<DistrictsResponse> {
    const response = await api.get('/forecast/');
    return response.data;
  },

  async getLocationsByDistrict(district: string): Promise<LocationsResponse> {
    const response = await api.get(`/forecast/${district}`);
    return response.data;
  },

  async getCurrentForecast(district: string, location: string): Promise<ForecastResponse> {
    const response = await api.get(`/forecast/${district}/${location}`);
    return response.data;
  },

  async getForecastByDate(district: string, location: string, date: string): Promise<ForecastResponse> {
    const response = await api.get(`/forecast/${district}/${location}/?day=${date}`);
    return response.data;
  },

  // ==================== NOVOS RECURSOS EXPANDIDOS ====================

  // AVISOS METEOROLÓGICOS
  async getWeatherWarnings(): Promise<WeatherWarningsResponse> {
    const response = await api.get('/warnings/');
    return response.data;
  },

  async getWarningsByLevel(level: string): Promise<WeatherWarningsResponse> {
    const response = await api.get(`/warnings/by-level/${level}`);
    return response.data;
  },

  // DADOS SÍSMICOS
  async getSeismicData(region: string = 'continente'): Promise<SeismicResponse> {
    const response = await api.get(`/seismic/?region=${region}`);
    return response.data;
  },

  async getSeismicByMagnitude(minMagnitude: number, region: string = 'continente'): Promise<SeismicResponse> {
    const response = await api.get(`/seismic/magnitude/${minMagnitude}?region=${region}`);
    return response.data;
  },

  // DADOS MARÍTIMOS E AMBIENTAIS
  async getSeaState(): Promise<SeaStateResponse> {
    const response = await api.get('/marine/sea-state');
    return response.data;
  },

  async getFireRisk(): Promise<FireRiskResponse> {
    const response = await api.get('/marine/fire-risk');
    return response.data;
  },

  async getFireRiskByLevel(minLevel: number): Promise<FireRiskResponse> {
    const response = await api.get(`/marine/fire-risk/level/${minLevel}`);
    return response.data;
  },

  async getUVIndex(): Promise<UVIndexResponse> {
    const response = await api.get('/marine/uv-index');
    return response.data;
  },

  async getUVByLevel(level: string): Promise<UVIndexResponse> {
    const response = await api.get(`/marine/uv-index/level/${level}`);
    return response.data;
  },

  // ESTAÇÕES METEOROLÓGICAS
  async getWeatherStations(): Promise<StationsResponse> {
    const response = await api.get('/stations/');
    return response.data;
  },

  async getStationObservations(stationId?: string): Promise<ObservationsResponse> {
    const url = stationId ? `/stations/observations?station_id=${stationId}` : '/stations/observations';
    const response = await api.get(url);
    return response.data;
  },

  async getLatestObservations(): Promise<ObservationsResponse> {
    const response = await api.get('/stations/observations/latest');
    return response.data;
  },

  // DADOS AGRÍCOLAS
  async getEvapotranspiration(municipality?: string): Promise<AgriculturalResponse> {
    const url = municipality ? `/agriculture/evapotranspiration?municipality=${municipality}` : '/agriculture/evapotranspiration';
    const response = await api.get(url);
    return response.data;
  },

  async getPrecipitationData(municipality?: string): Promise<AgriculturalResponse> {
    const url = municipality ? `/agriculture/precipitation?municipality=${municipality}` : '/agriculture/precipitation';
    const response = await api.get(url);
    return response.data;
  },

  async getMinTemperature(municipality?: string): Promise<AgriculturalResponse> {
    const url = municipality ? `/agriculture/temperature-min?municipality=${municipality}` : '/agriculture/temperature-min';
    const response = await api.get(url);
    return response.data;
  },

  async getMaxTemperature(municipality?: string): Promise<AgriculturalResponse> {
    const url = municipality ? `/agriculture/temperature-max?municipality=${municipality}` : '/agriculture/temperature-max';
    const response = await api.get(url);
    return response.data;
  },

  async getPDSIIndex(municipality?: string): Promise<AgriculturalResponse> {
    const url = municipality ? `/agriculture/pdsi?municipality=${municipality}` : '/agriculture/pdsi';
    const response = await api.get(url);
    return response.data;
  },

  async getWaterQuality(): Promise<WaterQualityResponse> {
    const response = await api.get('/agriculture/water-quality');
    return response.data;
  },

  async getWaterQualityByStatus(status: string): Promise<WaterQualityResponse> {
    const response = await api.get(`/agriculture/water-quality/status/${status}`);
    return response.data;
  },

  // SISTEMA E DASHBOARD
  async getDashboard(): Promise<DashboardResponse> {
    const response = await api.get('/dashboard');
    return response.data;
  },

  async healthCheck(): Promise<ServiceHealth> {
    const response = await api.get('/health');
    return response.data as ServiceHealth;
  },

  async getApiInfo(): Promise<any> {
    const response = await api.get('/');
    return response.data;
  }
};
