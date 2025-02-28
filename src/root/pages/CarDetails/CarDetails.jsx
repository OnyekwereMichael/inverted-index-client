import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDeleteRide, useGetRideById } from "../../../lib/query/query";
import { IoHeart, IoTrashOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import Card from "../components/Card/card";
import { AddToCart } from "../../../lib/Cartfunctionality/Cart";
import Loader from "../components/loader/loader";



const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: ride, isLoading, isError } = useGetRideById(id);
   const {mutate:deleteRide, isPending:isDeleteing} = useDeleteRide()
  
    const handleDelete = (rid) => {
      deleteRide(rid)
    };

  if (isLoading) return <p className=" mt-8"><Loader /></p>;
  if (isError || !ride?.data) return <p className="text-center mt-8">Error loading car details</p>;

  // Destructure data from API response
  const { name, image, type, year, price, _id } = ride.data;

  return (
    <div className=" px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden"
      >
        {/* Image Section */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="md:w-1/2 bg-gray-100"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </motion.div>

        {/* Details Section */}
        <div className="p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
              <div className="flex items-center space-x-4">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <IoHeart className="text-red-500 cursor-pointer text-2xl transition-transform hover:scale-110" />
                </motion.div>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <FiEdit
                    className="text-blue-500 cursor-pointer text-2xl transition-transform hover:scale-110"
                    onClick={() => navigate(`/edit/${_id}`)}
                  />
                </motion.div>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <IoTrashOutline className="text-gray-600 cursor-pointer text-2xl transition-transform hover:scale-110" onClick={() => handleDelete(_id)}/>
                </motion.div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-lg">
              {type} &bull; {year}
            </p>
            <p className="mt-4 text-gray-800 font-semibold text-xl">Price: ₦{price}</p>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
              Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>
          </div>
          <div className="mt-6 flex space-x-4">
            <Link to={'/cart'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            onClick={() => AddToCart(ride.data)}>
              Rent Now
            </motion.button>
            </Link>
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-300 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Go Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Add to Favorites ❤️
            </motion.button>
          </div>
        </div>
      </motion.div>
 <div className="mt-10 mb-6">
      <Card />
      </div>
    </div>
  );
};

export default CarDetails;
