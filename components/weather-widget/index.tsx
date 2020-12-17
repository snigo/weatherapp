import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGeolocation } from '../../hooks';
import { fetchWeather } from '../../store/actions';
import { WeatherStatus } from '../../types';
import { lessThan } from '../../utils';

import css from './weather-widget.module.scss';

interface WeatherWidgetProps {
  weather: WeatherStatus;
  slideId: number;
}

function convertTemp(temp: number, unit: 'c' | 'f' = 'c'): number {
  if (unit === 'c') return temp - 273.15;
  if (unit === 'f') return (temp * 9) / 5 - 459.67;
  return temp;
}

const WeatherWidget: FunctionComponent<WeatherWidgetProps> = ({ slideId, weather }) => {
  const [unit, setUnit] = useState<'c' | 'f'>('c');
  const [place, setPlace] = useState<string>(weather?.place);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!place) {
      useGeolocation().then((result) => setPlace(result));
    } else if (!weather || !lessThan(weather?.timestamp)) {
      dispatch(fetchWeather({ location: place, slideId }));
    }
  }, [place]);
  return (
    <div className={css['weather-widget']}>
      {
        weather && (
          <>
            <div className={css['weather-widget-icon']}>
              <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
            </div>
            <div className={css['weather-widget-locality']}>{weather.place}</div>
            <div className={css['weather-widget-description']}>{weather.description}</div>
            <div className={css['weather-widget-temp']}>{Math.round(convertTemp(weather.temp, unit))}</div>
            <div className={css['weather-widget-unit-picker']}>
              <button type="button" onClick={() => setUnit('c')}>C</button>
              <span>|</span>
              <button type="button" onClick={() => setUnit('f')}>F</button>
            </div>
          </>
        )
      }
    </div>
  );
};

export default WeatherWidget;
