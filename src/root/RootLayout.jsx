import { Outlet } from "react-router-dom"
import Navbar from "./pages/components/Navbar/navbar"
import { useState, useEffect } from "react";
import Footer from "./pages/components/Footer/footer";


const RootLayout = () => {
  
  return (
    <div className="">  
    <div>
           <Navbar />
           </div>
        <section className="mt-2">
          <Outlet />
        </section>
        <Footer />

    </div>
  )
}

export default RootLayout
