/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { FormEvent, FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { fetchWeather } from '../../store/actions';
import { WeatherStatus } from '../../types';

import css from './search-widget.module.scss';

const SearchWidget: FunctionComponent = () => {
  const dispatch = useDispatch();
  const places: WeatherStatus[] = useSelector((store) => store?.places || []);
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [autofill, setAutofill] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    // debounce()
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuery('');
    dispatch(fetchWeather({ slideId: places.length, location: query }));
  };

  const labelCss = [css['search-widget-label']];
  if (focus) labelCss.push(css['search-widget-label-active']);

  return (
    <div className={css['search-widget']}>
      <div className={css['search-widget-header']}>
        <Link href="/">
          <a className={css['search-widget-header-link']}>
            <span className={css['search-widget-header-link-icon']}>〈</span>
            <span>Back to weather</span>
          </a>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={css['search-widget-form']}>
        <div className={css['search-widget-form-field']}>
          <label htmlFor="searchQuery" className={labelCss.join(' ')}>Search place...</label>
          <input
            type="search"
            id="searchQuery"
            name="searchQuery"
            autoComplete="off"
            className={css['search-widget-input']}
            onChange={handleChange}
            value={query}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <button type="submit" className={css['search-widget-btn']}>➔</button>
          {
            autofill.length ? (
              <div className={css['search-widget-input-dropdown']}>
                {
                  autofill.map((place) => console.log(place))
                }
              </div>
            ) : null
          }
        </div>
      </form>
      <div>
        {
          places.map((weather, i) => (
            <div key={`search-list-${i}-${weather?.id}`}>{weather?.place}</div>
          ))
        }
      </div>
      <div>
        {
          autofill.map((place) => (
            <div key={place?.id}>{place.text}</div>
          ))
        }
      </div>
    </div>
  );
};

export default SearchWidget;
