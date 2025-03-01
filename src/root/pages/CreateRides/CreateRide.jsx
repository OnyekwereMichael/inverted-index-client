"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from "../components/loader/loader";
import FileUploader from "../components/Fileuploader/FileUploader";
import { motion } from "framer-motion";
import { useCreateRide } from "../../../lib/query/query";
import { useNavigate } from "react-router-dom";
import Video_car from "../../../assets/3752531-hd_1920_1080_24fps.mp4";

const CreateRides = () => {
  const navigate = useNavigate();
  const { mutate: CreateRide, isPending } = useCreateRide();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
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
          CreateRide(
            { ...values },
            {
              onSuccess: () => {
                navigate("/");
                resetForm();
              },
            }
          );
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
              className="w-full max-w-[38rem] bg-white shadow-xl rounded-lg p-8 border border-gray-200 max-sm:p-5 max-sm:mx-2"
            >
              <Form className="flex flex-col gap-6 w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800">CREATE RIDE</h2>
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
                      placeholder="Enter Year"
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="year"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
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
                <div className="flex justify-end gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => navigate("/")}
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
                      `Create`
                    )}
                  </motion.button>
                </div>
              </Form>
            </motion.div>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateRides;