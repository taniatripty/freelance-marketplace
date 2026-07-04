import React from 'react'
import Hero from './heroSection'
import Testimonials from './testimonial'
import AllFreelancers from '@/pages/AllFreelancer/AllFreelancers'
import AllGigs from '@/AllGigs/Allgigs'
import PopularServices from '@/pages/PopularServices/PopularServices'
import TopFreelancers from '@/pages/TopFreelancers/TopFreelancers'
import WhyChooseUs from '@/pages/WhyChooseUs/WhyChooseUs'
import LatestGigs from '@/pages/LatestGigs/LatestGigs'

export default function Home() {
  return (
    <div>
        <Hero></Hero>
        <AllFreelancers></AllFreelancers>
        <TopFreelancers></TopFreelancers>
        <PopularServices></PopularServices>
        <LatestGigs></LatestGigs>
        <AllGigs></AllGigs>
        <WhyChooseUs></WhyChooseUs>
        <Testimonials></Testimonials>
    </div>
  )
}
