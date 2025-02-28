import Car_1 from "../../../assets/car-1.png";
import Car_2 from "../../../assets/car-2.png";
import Mark from "../../../assets/mark.png";
import Switch from "../../../assets/Switch.png";
import Card from "../components/Card/card";
import { bundle } from "../../../components/Js File/bundle";
import Footer from "../components/Footer/footer";

const Home = () => {
  return (
    <div className="p-5 md:px-6">
      {/* Banner Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-blue-400 p-5 rounded-xl relative">
          <h2 className="text-white text-2xl font-bold mb-3  max-sm:text-lg">
            The Best Platform For Car Rentals
          </h2>
          <p className="text-white mb-4 text-lg max-sm:text-[16px]">
            Ease of doing a car rental safely and reliably.
            <br /> Of course, at a low price.
          </p>
          <button className="p-3 bg-blue-600 hover:bg-blue-300 text-white rounded-lg font-bold max-sm:p-2">
            Rental Car
          </button>
          <img src={Car_1} alt="" className="w-44 md:w-64 absolute right-5 bottom-0" />
        </div>
        <div className="bg-blue-600 p-5 rounded-xl relative">
          <h2 className="text-white text-2xl font-bold mb-3 max-sm:text-lg">
            Easy way to rent a car at a low price.
          </h2>
          <p className="text-white mb-4 text-lg max-sm:text-[16px]">
            Providing cheap car rental service.
            <br /> Safe and comfortable facilities.
          </p>
          <button className="p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-bold">
            Rental Car
          </button>
          <img src={Car_2} alt="" className="w-44 md:w-64 absolute right-5 bottom-0" />
        </div>
      </div>

      {/* Pick-Up & Drop-Off Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-5">
        {/* Pick-Up */}
        <div className="bg-white p-5 rounded-xl w-full shadow-md border border-gray-200">
          <div className="flex items-center gap-2">
            <img src={Mark} alt="Pick-Up Icon" className="w-4 h-4" />
            <p className="font-semibold text-[16px] text-black">Pick-Up</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="font-semibold block pb-2 text-gray-700">Location</label>
              <select className="border border-gray-300 rounded-lg p-2 w-full text-gray-600 focus:outline-blue-500">
                <option>Select your city</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
                <option>Ibadan</option>
                <option>Kano</option>
                <option>Benin City</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block pb-2 text-gray-700">Date</label>
              <select className="border border-gray-300 rounded-lg p-2 w-full text-gray-600 focus:outline-blue-500">
                <option>Select your date</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block pb-2 text-gray-700">Time</label>
              <select className="border border-gray-300 rounded-lg p-2 w-full text-gray-600 focus:outline-blue-500">
                <option>Select your time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
          </div>
        </div>

        {/* Switch Icon */}
        <div className="flex justify-center items-center">
          <img src={Switch} alt="Switch" className="w-10 h-10 cursor-pointer transition-transform hover:scale-110" />
        </div>

        {/* Drop-Off */}
        <div className="bg-white p-5 rounded-xl w-full shadow-md border border-gray-200">
          <div className="flex items-center gap-2">
            <img src={Mark} alt="Drop-Off Icon" className="w-4 h-4" />
            <p className="font-semibold text-[16px] text-black">Drop-Off</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="font-semibold block pb-2 text-gray-700">Location</label>
              <select className="border border-gray-300 rounded-lg p-2 w-full text-gray-600 focus:outline-blue-500">
                <option>Select your city</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
                <option>Ibadan</option>
                <option>Kano</option>
                <option>Benin City</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block pb-2 text-gray-700">Date</label>
              <select className="border border-gray-300 rounded-lg p-2 w-full text-gray-600 focus:outline-blue-500">
                <option>Select your date</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block pb-2 text-gray-700">Time</label>
              <select className="border border-gray-300 rounded-lg p-2 w-full text-gray-600 focus:outline-blue-500">
                <option>Select your time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Cars Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Popular Cars</h3>
          <p className="font-bold text-blue-500 cursor-pointer hover:text-blue-400">View All</p>
        </div>
        <div className="mt-5">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Home;
