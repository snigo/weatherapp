export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const LOAD_PERSISTENT_STORE = 'LOAD_PERSISTENT_STORE';

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

export const fetchWeather = ({ slideId, location }) => async (dispatch) => {
  try {
    const response = await fetch(`/api/weather?location=${location}`);
    const data = await response.json();
    dispatch(updateWeather(slideId, data));
  } catch (err) {
    dispatch(fetchError(err));
  }
};

export const loadPersistentStore = (store) => ({
  type: LOAD_PERSISTENT_STORE,
  payload: store,
});
