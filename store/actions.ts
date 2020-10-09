import { mapApiResponse } from './data-mapper';

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

const apiKey = '59763b5dc32f1dd5e8cd55f84c0c19be';

export const updateWeather = (slideId, weatherData) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: {
    slideId,
    data: weatherData,
  },
});

export const fetchError = (err) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: err,
});

export const fetchWeather = ({
  slideId,
  location,
  latitude,
  longitude,
}) => async (dispatch) => {
  const apiEndpoint = location
    ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    dispatch(updateWeather(slideId, mapApiResponse(data)));
  } catch (err) {
    dispatch(fetchError(err));
  }
};
