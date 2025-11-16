import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Dropzone = ({ onFileSelect }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      setErrorMessage("");
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    noClick: true, 
    onDropRejected: (fileRejections) => {
      const firstError = fileRejections[0]?.errors[0];
      if (firstError.code === "file-too-large") {
        setErrorMessage("File is too large, please choose smaller one!!!");
      } else if (firstError.code === "file-invalid-type") {
        setErrorMessage("Invalid file, please choose an image file!!!");
      } else {
        setErrorMessage("Error when choosing file!!!");
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-300 hover:border-indigo-400"
      }`}
    >
      <input {...getInputProps()} />
      <AiOutlineCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Upload File Here
      </p>
      <button
        type="button"
        onClick={open}
        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Choose an Image
      </button>
      <p className="mt-2 text-xs text-gray-500">Only 1 Image File Accepted</p>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-500 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

export default Dropzone;