import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchRides } from "../../../../lib/query/query";
import { AiFillHeart } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import Loader from "../loader/loader";
import { IoTrashOutline } from "react-icons/io5";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { data: rides, isLoading, isError, error } = useSearchRides(query);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="px-4 py-6">
      {rides.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No results found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rides?.data?.map((ride) => (
            <motion.div
              key={ride.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white shadow-xl border border-gray-200 rounded-2xl p-5 flex flex-col transition-transform duration-300 hover:shadow-2xl"
            >
              {/* Header: Title + Icons */}
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-xl text-gray-900">{ride.name}</h4>
                <div className="flex items-center space-x-3">
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <AiFillHeart className="text-red-500 cursor-pointer transition-transform hover:scale-110 text-2xl" />
                  </motion.div>
              <motion.div whileTap={{ scale: 0.8 }}>
                <FiEdit className="text-blue-500 cursor-pointer transition-transform hover:scale-110 text-xl" />
              </motion.div>
              <motion.div whileTap={{ scale: 0.8 }}>
                <IoTrashOutline className="text-gray-600 cursor-pointer transition-transform hover:scale-110 text-2xl" />
              </motion.div>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.03 }} className="mb-4 overflow-hidden rounded-xl">
                <img
                  src={ride.image}
                  alt={ride.text || "Card image"}
                  className="w-full h-[200px] object-cover rounded-lg shadow-sm"
                />
              </motion.div>

              {/* Ride Type */}
              <p className="text-gray-600 text-sm mb-3">{ride.type}</p>

              {/* Footer: Price & Button */}
              <div className="flex justify-between items-center mt-auto">
                <p className="font-bold text-gray-900 text-xl">₦{ride.price.toLocaleString()}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-600 hover:bg-blue-500 px-5 py-2 text-white font-semibold rounded-lg transition-all"
                >
                  Rent Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
