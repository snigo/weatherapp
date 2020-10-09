import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import WeatherWidget from '../components/weather-widget';

SwiperCore.use([Navigation, Pagination]);

function Index() {
  const locations = useSelector((store) => [store.current, ...store.locations]);
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {
        locations.map((location, idx) => (
          <SwiperSlide key={location}>
            <WeatherWidget slideId={idx} />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

export default Index;
