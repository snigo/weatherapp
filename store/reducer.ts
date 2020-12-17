/* eslint-disable no-case-declarations */
import { cloneDeep } from 'lodash';
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  LOAD_PERSISTENT_STORE,
} from './actions';
import { WeatherStatus } from '../types';

interface WeatherState {
  places: WeatherStatus[];
}

const initialState: WeatherState = {
  places: [null],
};

const persistStore = (state) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('store', JSON.stringify(state));
  }
  return state;
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return state;
    case FETCH_WEATHER_SUCCESS:
      const { slideId, data } = action.payload;
      const newState: WeatherState = cloneDeep(state);
      newState.places[slideId] = data;
      return persistStore(newState);
    case LOAD_PERSISTENT_STORE:
      return action.payload;
    case FETCH_WEATHER_FAILURE:
    default:
      return state;
  }
};

export default weatherReducer;
