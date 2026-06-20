import React from 'react'
import Hero from './heroSection'
import Testimonials from './testimonial'
import AllFreelancers from '@/pages/AllFreelancer/AllFreelancers'
import AllGigs from '@/AllGigs/Allgigs'

export default function Home() {
  return (
    <div>
        <Hero></Hero>
        <AllFreelancers></AllFreelancers>
        <AllGigs></AllGigs>
        <Testimonials></Testimonials>
    </div>
  )
}
