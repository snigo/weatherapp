import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import WeatherWidget from '../components/weather-widget';
import Fab from '../components/fab';

SwiperCore.use([Navigation, Pagination]);

function Index() {
  const places = useSelector((store) => store.places);
  return (
    <main>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {
          places.map((weather, idx) => (
            <SwiperSlide key={weather?.id || 'current'}>
              <WeatherWidget weather={weather} slideId={idx} />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Fab href="/add" label="&#65291;" />
    </main>
  );
}

export default Index;
