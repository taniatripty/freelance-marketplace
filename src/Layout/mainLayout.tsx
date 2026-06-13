


import Footer from "@/pages/shared/Footer"
import Navbar from "@/pages/shared/navbar"
import React from 'react'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
