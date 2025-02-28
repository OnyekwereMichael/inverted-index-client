import React, { useRef } from "react";
import FileUpload from "../../../../assets/file-upload.svg";

const FileUploader = ({ selectedImage, setSelectedImage }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-2 border-dashed border-gray-700 rounded-lg p-6 cursor-pointer transition-all hover:border-gray-500 shadow-lg"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center w-full text-center">
        {selectedImage ? (
          <div className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-xl border border-gray-600">
            <img
              src={selectedImage}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
            type="button"
              onClick={handleButtonClick}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity"
            >
              Click or Drag to Replace
            </button>
          </div>
        ) : (
          <>
            <img src={FileUpload} width={80} height={80} alt="Upload Icon" className="opacity-80" />
            <h3 className="text-lg font-semibold text-gray-300 mt-4">Drag & Drop Image</h3>
            <p className="text-gray-400 text-sm mb-4">Supports JPG, PNG, SVG</p>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition shadow-md"
              onClick={handleButtonClick}
            >
              Select from Computer
            </button>
          </>
        )}
      </div>

      {/* Hidden File Input */}
      <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
