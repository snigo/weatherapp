import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../store/actions';
import { WeatherStatus } from '../../store/data-mapper';

import css from './weather-widget.module.scss';

interface WeatherWidgetProps {
  slideId: number;
}

function convertTemp(temp: number, unit: 'c' | 'f' = 'c'): number {
  if (unit === 'c') return temp - 273.15;
  if (unit === 'f') return (temp * 9) / 5 - 459.67;
  return temp;
}

const WeatherWidget: FunctionComponent<WeatherWidgetProps> = ({ slideId }) => {
  const weather: WeatherStatus = useSelector((store) => store.current);
  const [unit, setUnit] = useState<'c' | 'f'>('c');
  const dispatch = useDispatch();
  useEffect(() => {
    if (!slideId) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(fetchWeather({
          slideId,
          latitude,
          longitude,
          location: null,
        }));
      }, (err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
    }
  }, []);
  return (
    <div className={css['weather-widget']}>
      {
        weather && (
          <>
            <div className={css['weather-widget-icon']}>
              <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
            </div>
            <div className={css['weather-widget-locality']}>{weather.locality}</div>
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
