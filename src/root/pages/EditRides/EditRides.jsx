"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from "../components/loader/loader";
import FileUploader from "../components/Fileuploader/FileUploader";
import { motion } from "framer-motion";
import { useEditRide } from "../../../lib/query/query";
import { useNavigate, useParams } from "react-router-dom";

const EditRides = () => {
  const navigate = useNavigate()
  const { id: rideId } = useParams();
  console.log('the', rideId);
  
const { mutate:EditRide, isPending} = useEditRide() 
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        image: "",
        type: "",
        year: "",
      }}
      validationSchema={""}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log("Form Submitted:", { ...values });
        EditRide({rid:rideId, ...values }, {
          onSuccess: () => {
            navigate("/");
            resetForm();
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }) => {
        useEffect(() => {
          if (selectedImage) {
            setFieldValue("image", selectedImage);
          }
        }, [selectedImage, setFieldValue]);

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full mb-6  max-sm:px-3"
          >
            <Form className="flex flex-col gap-6 w-full max-w-[600px] mx-auto bg-white shadow-lg p-6 rounded-lg border mt-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">Name</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">Year</label>
                  <Field
                    type="text"
                    name="year"
                    placeholder="Enter  Year"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Type & Price Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">Type</label>
                  <Field
                    type="text"
                    name="type"
                    placeholder="Enter type"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">Price</label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <FileUploader
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {isSubmitting || isPending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  ) : (
                    `Edit`
                  )}
                </motion.button>
              </div>
            </Form>
          </motion.div>
        );
      }}
    </Formik>
  );
};

export default EditRides;
