import Logo from "../../../../assets/morent-logo.png";
import { MdEditSquare, MdOutlineShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Inputs from "../SearchInputs/inputs";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useLogout } from "../../../../lib/query/query";
import { useState } from "react";

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <div className="bg-white fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow-md md:px-6 z-50">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-28 cursor-pointer" onClick={() => navigate("/")} />

        {/* Desktop Search Input */}
        <div className="hidden md:flex relative w-1/2">
          <Inputs />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to="/create">
            <MdEditSquare size={28} className="cursor-pointer hover:text-blue-600" />
          </Link>
          <button onClick={handleLogout} className="hover:text-red-500">
            <IoLogOutOutline size={28} />
          </button>
          <Link to="/cart" className="relative">
            <MdOutlineShoppingCart size={28} className="cursor-pointer hover:text-blue-600" />
            {/* {cartCount > 0 && (
              <span className="absolute -top-2 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )} */}
          </Link>
          <button>
            <FaUserCircle className="text-3xl hover:text-blue-600" />
          </button>
        </div>
      </div>

      {/* Space to prevent content from being hidden behind fixed navbar */}
      <div className="h-16 md:h-20"></div>

      {/* Mobile Search Input */}
      <div className="md:hidden p-2">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="w-full p-2 bg-gray-200 rounded-md focus:outline-none"
        >
          {showSearch ? "Hide Search" : "Show Search"}
        </button>
        {showSearch && <Inputs className="w-full mt-2" />}
      </div>
    </div>
  );
};

export default Navbar;
