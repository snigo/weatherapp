export interface WeatherStatus {
  icon: string;
  locality: string;
  description: string;
  temp: number;
  timestamp: string;
}

export function mapApiResponse(response: any): WeatherStatus {
  return {
    icon: response.weather[0].icon,
    locality: response.name,
    description: response.weather[0].description,
    temp: response.main.temp,
    timestamp: new Date().toUTCString(),
  };
}
