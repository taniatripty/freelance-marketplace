import React from 'react'
import Hero from './heroSection'
import Testimonials from './testimonial'
import AllFreelancers from '@/pages/AllFreelancer/AllFreelancers'
import AllGigs from '@/AllGigs/Allgigs'
import PopularServices from '@/pages/PopularServices/PopularServices'
import TopFreelancers from '@/pages/TopFreelancers/TopFreelancers'

export default function Home() {
  return (
    <div>
        <Hero></Hero>
        <AllFreelancers></AllFreelancers>
        <TopFreelancers></TopFreelancers>
        <PopularServices></PopularServices>
        <AllGigs></AllGigs>

        <Testimonials></Testimonials>
    </div>
  )
}
