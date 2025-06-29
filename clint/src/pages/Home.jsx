import React from 'react'
import Hero from '../components/Hero'
import Featuredestination from '../components/Featuredestination'
import Exclusiveoffer from '../components/Exclusiveoffer'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import RecommendedHotels from '../components/HotelOwner/RecommendedHotels'

const Home = () => {
  return (
    <>

        <Hero/>
         <RecommendedHotels/>
        <Featuredestination/>
        <Exclusiveoffer/>
        <Testimonial/>
        <NewsLetter/>
    </>
  )
}

export default Home