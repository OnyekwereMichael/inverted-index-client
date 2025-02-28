import { Outlet } from "react-router-dom"
import Navbar from "./pages/components/Navbar/navbar"
import { useState, useEffect } from "react";
import Footer from "./pages/components/Footer/footer";


const RootLayout = () => {
    
  const [cart, setCart] = useState([]); // Track cart items

  // Load cart data from localStorage on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Function to add an item to the cart
//   const addToCart = (item) => {
//     const updatedCart = [...cart, item];
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
//   };

const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if item exists
    } else {
      updatedCart.push({ ...item, quantity: 1 }); // Ensure quantity is initialized
    }
  
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  

  return (
    <div className="">  
    <div>
           <Navbar cartCount={cart.length}/>
           </div>
        <section className="mt-2">
          <Outlet />
        </section>
        <Footer />

    </div>
  )
}

export default RootLayout
