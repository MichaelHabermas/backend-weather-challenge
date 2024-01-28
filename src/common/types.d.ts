export interface WeatherForecastResponse {
  periods: Array<WeatherPeriod>
}

export interface WeatherPeriod {
  name: string
  temperature: string
  windSpeed: string
  windDirection: string
}

export interface GeoCoordinates {
  latitude: string
  longitude: string
}
