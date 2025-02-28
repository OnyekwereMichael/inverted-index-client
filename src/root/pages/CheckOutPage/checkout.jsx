import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleConfirmCheckout = () => {
    alert("Checkout successful! Your rental is confirmed.");
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/");
  };

  return (
    <div className="bg-gray-50 flex flex-col  p-4">
      <div className="max-w-5xl mx-auto p-5 w-full bg-white shadow-lg rounded-lg">
        <div className="flex gap-4 justify-center items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700">
            CHECKOUT
          </h2>
          <FaShoppingCart size={24} />
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg text-sm md:text-base">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="p-3 md:p-4">Item</th>
                  <th className="p-3 md:p-4">Price</th>
                  <th className="p-3 md:p-4">Quantity</th>
                  <th className="p-3 md:p-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3 md:p-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-12 md:w-32 md:h-20 object-cover rounded-md shadow-md mr-2 md:mr-4"
                      />
                      <span className="font-semibold text-gray-800">
                        {item.name}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 text-gray-600">₦{item.price}</td>
                    <td className="p-3 md:p-4 text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="p-3 md:p-4 font-semibold text-gray-800">
                      ₦{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-center md:justify-end">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirmCheckout}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 px-6 py-3 text-white text-[16px] font-bold rounded-md shadow-lg transition duration-300"
              >
                Confirm Checkout
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
