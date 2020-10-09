/* eslint-disable no-case-declarations */
import { FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE } from './actions';
import { WeatherStatus } from './data-mapper';

interface WeatherState {
  current: WeatherStatus;
  locations: WeatherStatus[];
}

const initialState: WeatherState = {
  current: null,
  locations: [],
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return state;
    case FETCH_WEATHER_SUCCESS:
      const { slideId, data } = action.payload;
      const newState = { ...state };
      if (slideId) {
        newState.locations[slideId] = data;
      } else {
        newState.current = data;
      }
      return newState;
    case FETCH_WEATHER_FAILURE:
    default:
      return state;
  }
};

export default weatherReducer;
