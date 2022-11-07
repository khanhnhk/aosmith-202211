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
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img src="/images/Slide_R400s.png"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/Slide_S600.png"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/Slide_VitaPlus.png"></img>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
