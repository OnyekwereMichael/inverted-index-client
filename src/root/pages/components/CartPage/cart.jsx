import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RemoveFromCart } from "../../../../lib/Cartfunctionality/Cart";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, amount) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="px-4 md:px-16 pt-6 pb-10 bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">YOUR CART</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 md:p-6 overflow-x-auto">
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                      <p className="font-semibold text-gray-800">{item.name}</p>
                    </td>
                    <td className="p-3 text-lg font-medium text-gray-700">₦{item.price}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg transition hover:bg-blue-500"
                        >
                          -
                        </button>
                        <span className="text-lg font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg transition hover:bg-blue-500"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => navigate("/checkout")}
                        className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg transition hover:bg-green-500"
                      >
                        Checkout
                      </button>
                      <button
                        onClick={() => RemoveFromCart(item.id)}
                        className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg transition hover:bg-red-400"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col gap-4">
            {cart.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-lg font-medium text-gray-700">₦{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between max-sm:flex-col max-sm:justify-start max-sm:gap-4">
                  <div className="flex items-center gap-3 max-sm:justify-start">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg transition hover:bg-blue-500"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg transition hover:bg-blue-500"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate("/checkout")}
                      className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg transition hover:bg-green-500"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={() => RemoveFromCart(item.id)}
                      className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg transition hover:bg-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
