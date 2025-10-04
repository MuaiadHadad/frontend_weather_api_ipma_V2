// Tipos para a API do IPMA
export interface WeatherCondition {
  id: number;
  description: string;
}

export interface HourlyForecast {
  hour: string;
  temperature: number;
  weather_condition: WeatherCondition;
  precipitation_probability?: number;
  wind_speed?: number;
  wind_direction?: string;
}

export interface DailyForecast {
  date: string;
  location: string;
  district: string;
  hourly_forecasts: HourlyForecast[];
  min_temperature?: number;
  max_temperature?: number;
}

export interface Location {
  id: number;
  name: string;
  district: string;
}

// NOVOS TIPOS PARA RECURSOS EXPANDIDOS

export interface WeatherWarning {
  id: string;
  area: string;
  warning_type: string;
  level: string;
  start_time: string;
  end_time: string;
  description: string;
  phenomenon: string;
}

export interface SeismicData {
  id: string;
  magnitude: number;
  depth: number;
  location: string;
  time: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  intensity?: string;
}

export interface SeaState {
  date: string;
  location: string;
  wave_height?: number;
  wave_period?: number;
  wave_direction?: string;
  sea_temperature?: number;
  coastal_conditions?: string;
}

export interface FireRisk {
  date: string;
  location: string;
  risk_level: number;
  risk_description: string;
  temperature?: number;
  humidity?: number;
  wind_speed?: number;
}

export interface UVIndex {
  date: string;
  location: string;
  uv_index: number;
  uv_level: string;
  protection_time?: number;
}

export interface WeatherStation {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  altitude?: number;
}

export interface StationObservation {
  station_id: string;
  station_name: string;
  timestamp: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  wind_speed?: number;
  wind_direction?: string;
  precipitation?: number;
  visibility?: number;
}

export interface AgriculturalData {
  date: string;
  municipality: string;
  evapotranspiration?: number;
  precipitation?: number;
  min_temperature?: number;
  max_temperature?: number;
  pdsi_index?: number;
}

export interface WaterQuality {
  zone_id: string;
  zone_name: string;
  status: string;
  restriction_type?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  last_update: string;
}

export interface DashboardData {
  api_status: string;
  version: string;
  last_update: string;
  data_summary: {
    districts_available: number;
    active_warnings: number;
    recent_seismic_events: number;
    weather_stations: number;
  };
  service_status: {
    meteorology: string;
    warnings: string;
    seismic: string;
    marine: string;
    stations: string;
    agriculture: string;
  };
  coverage: {
    portugal_mainland: string;
    azores: string;
    madeira: string;
    marine_areas: string;
  };
  data_freshness: {
    forecasts: string;
    warnings: string;
    seismic: string;
    observations: string;
    agriculture: string;
  };
}

// RESPOSTAS DA API EXPANDIDAS

export interface ForecastResponse {
  success: boolean;
  data?: DailyForecast;
  message?: string;
}

export interface LocationsResponse {
  success: boolean;
  data?: Location[];
  message?: string;
}

export interface DistrictsResponse {
  success: boolean;
  data?: {
    districts: string[];
    total: number;
  };
  message?: string;
}

export interface WeatherWarningsResponse {
  success: boolean;
  data?: WeatherWarning[];
  message?: string;
}

export interface SeismicResponse {
  success: boolean;
  data?: SeismicData[];
  message?: string;
}

export interface SeaStateResponse {
  success: boolean;
  data?: SeaState[];
  message?: string;
}

export interface FireRiskResponse {
  success: boolean;
  data?: FireRisk[];
  message?: string;
}

export interface UVIndexResponse {
  success: boolean;
  data?: UVIndex[];
  message?: string;
}

export interface StationsResponse {
  success: boolean;
  data?: WeatherStation[];
  message?: string;
}

export interface ObservationsResponse {
  success: boolean;
  data?: StationObservation[];
  message?: string;
}

export interface AgriculturalResponse {
  success: boolean;
  data?: AgriculturalData[];
  message?: string;
}

export interface WaterQualityResponse {
  success: boolean;
  data?: WaterQuality[];
  message?: string;
}

export interface DashboardResponse {
  success: boolean;
  dashboard?: DashboardData;
  message?: string;
  quick_links?: {
    documentation: string;
    all_endpoints: string;
    health_check: string;
  };
}

// Tipos auxiliares para o frontend
export type DataCategory = 'weather' | 'warnings' | 'seismic' | 'marine' | 'stations' | 'agriculture' | 'dashboard';

export interface ServiceHealth {
  status: string;
  message: string;
  version: string;
  services?: {
    ipma_connection: string;
    total_endpoints: string;
    cache_status: string;
  };
  timestamp?: string;
}
