import React from "react";
import { motion } from "framer-motion";
import { GetAllRides, useDeleteRide } from "../../../../lib/query/query";
import Loader from "../loader/loader";
import { IoHeart, IoTrashOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Card = () => {
  const navigate = useNavigate()
  const { data: ride, isLoading } = GetAllRides();
  const {mutate:deleteRide, isPending:isDeleteing} = useDeleteRide()

  const handleDelete = (rid) => {
    deleteRide(rid)
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {ride?.data?.map((item) => (
        <Link to={`/ride/${item._id}`}>
        <motion.div
          key={item.id}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white shadow-xl border border-gray-200 rounded-2xl p-5 flex flex-col transition-transform duration-300 hover:shadow-2xl"
        >
          {/* Title & Action Icons */}
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-xl text-gray-900">{item.name}</h4>
            <div className="flex items-center space-x-3">
              <motion.div whileTap={{ scale: 0.8 }}>
                <IoHeart className="text-red-500 cursor-pointer transition-transform hover:scale-110 text-2xl" />
              </motion.div>
              <motion.div whileTap={{ scale: 0.8 }}>
                <FiEdit className="text-blue-500 cursor-pointer transition-transform hover:scale-110 text-xl" onClick={() => navigate(`/edit/${item._id}`)}/>
              </motion.div>
              <motion.div whileTap={{ scale: 0.8 }}>
                {isDeleteing ?    
                 <div className="flex items-center justify-center">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
:  <IoTrashOutline className="text-gray-600 cursor-pointer transition-transform hover:scale-110 text-2xl" onClick={() => handleDelete(item._id)} />
}          
              </motion.div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} className="mb-4 overflow-hidden rounded-xl">
            <img
              src={item.image}
              alt={item.text || "Card image"}
              className="w-full h-[200px] object-cover rounded-lg shadow-sm"
            />
          </motion.div>
          <p className="text-gray-600 text-[15px] mb-3">{item.type} - {item.year}</p>

          {/* Price & Button */}
          <div className="flex justify-between items-center mt-auto">
            <p className="font-bold text-gray-900 text-xl">₦{item.price}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-600 hover:bg-blue-500 px-5 py-2 text-white font-semibold rounded-lg transition-all"
            >
              Rent Now
            </motion.button>
          </div>
        </motion.div>
      </Link>
      ))}
    </div>
  );
};

export default Card;
