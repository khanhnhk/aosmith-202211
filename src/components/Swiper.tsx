import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import '../styles/global.css'

// import required modules
import { Navigation } from 'swiper'

export default function App() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper bg-light-green"
      >
        <SwiperSlide>
          <img
            src="/images/Slide_R400s.png"
            className="max-w-xl bg-light-green"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/Slide_S600.png"
            className="max-w-xl bg-light-green"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/Slide_VitaPlus.png"
            className="max-w-xl bg-light-green"
          ></img>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
