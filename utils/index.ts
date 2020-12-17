import { WeatherStatus } from '../types';

export function mapApiResponse(response: any): WeatherStatus {
  return {
    id: response.id,
    icon: response.weather[0].icon,
    place: response.name,
    description: response.weather[0].description,
    temp: response.main.temp,
    timestamp: new Date().toISOString(),
  };
}

export function lessThan(timestamp: string, min: number = 5): boolean {
  return (Date.now() - new Date(timestamp).getTime()) <= min * 60000;
}
