import { Outlet } from "react-router-dom"
import Footer from "./pages/components/Footer/footer";
import Navbar from './pages/components/Navbar/Navbar'

const RootLayout = () => {
  
  return (
    <div className="">  
    <div>
           <Navbar />
           </div>
        <section >
          <Outlet />
        </section>
        <Footer />

    </div>
  )
}

export default RootLayout
