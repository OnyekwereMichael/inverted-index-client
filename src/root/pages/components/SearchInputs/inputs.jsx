import { useCallback, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Simplified debounce function
function debounce(func, wait) {
    let timeout;
    return (arg) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(arg), wait);
    };
  }

const inputs = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
  
    // Debounced function to handle redirection
    const debouncedRedirect = useCallback(
      debounce((query) => {
        if (query.trim()) {
          navigate(`/search?query=${encodeURIComponent(query)}`);
        }
      }, 500),
      [navigate]
    );
  
    // Handle input change
    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearch(value);
      debouncedRedirect(value);
    };
    return (
        <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
        <div className="relative md:w-[50vw] max-sm:w-full">
        <input className="p-2 pl-16 md:pl-10 md:rounded-xl outline-none font-bold w-full border-2 border-gray-300"  placeholder="Search something here"  onChange={handleInputChange}/>
        <IoSearch className="absolute top-3 pl-5 md:pl-0 w-20 md:w-12"/>
        </div>
        </form>
    )
}

export default inputs