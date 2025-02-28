
import { Route, Routes } from "react-router-dom"
import Authform from "./auth/authform/AuthLayout";
import Signin from "./auth/signin/Signin";
import Signup from "./auth/signup/Signup";
import { Toaster } from "react-hot-toast";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/Homepage/Home";
import Search from "./root/pages/components/search/Search";
import Create from './root/pages/CreateRides/CreateRide'
import EditRides from "./root/pages/EditRides/EditRides";
import Cart from "./root/pages/components/CartPage/cart";
import CarDetails from "./root/pages/CarDetails/CarDetails";
import Checkout from "./root/pages/CheckOutPage/checkout";



const App = () => {
  return (
    <main>
     <Routes>
       {/* auth route  */}
       <Route element={<Authform />}>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
       </Route>

       {/* page route  */}
       <Route element={<RootLayout />}>
         <Route index element={<Home />} />
         <Route path="/search"  element={<Search />} />
         <Route path="/create"  element={<Create />} />
         <Route path="/edit/:id"  element={<EditRides />} />
         <Route path="/cart"  element={<Cart />} />
         <Route path="/ride/:id"  element={<CarDetails />} />
         <Route path="/checkout"  element={<Checkout />} />
         {/* <Route path="/explore" element={<Explore />} />
         <Route path="/saved" element={<Saved />} />
         <Route path="/all-users" element={<AllUsers />} />
         <Route path="/create-post" element={<CreatePost />} />
         <Route path="/update-post/:id" element={<EditPost />} />
         <Route path="/posts/:id" element={<PostDetails />} />
         <Route path="/profile/:id/*" element={<Profile />} />
         <Route path="/update-profile/:id" element={<UpdateProfile />} /> */}
       </Route>
     </Routes>
     <Toaster />
    </main>
  )
}

export default App

