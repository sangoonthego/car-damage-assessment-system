import React, { useState, useMemo } from "react";
import Dropzone from "../components/Dropzone";
import ResultDisplay from "../components/ResultDisplay";
import { runAssessment } from "../api/ai";
import { AiOutlineSearch, AiOutlineCloudUpload, AiOutlineLoading3Quarters } from "react-icons/ai";

const AssessmentPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [mode, setMode] = useState("detect"); 
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const modeOptions = useMemo(
    () => [
      { value: "detect", label: "Detection (Object Detection)" },
      { value: "segment", label: "Segmentation (Object Segmentation)" },
    ],
    []
  );

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResult(null);  
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select an image file before running analysis.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiMode = mode === "detect" ? "detect" : "segment";
      const res = await runAssessment(selectedFile, apiMode);
      setResult(res);
    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <header className="text-center py-6 border-b mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          Car Damage Assessment System
        </h1>
      </header>

      {/* Control Section */}
      <div className="bg-white p-6 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <AiOutlineSearch className="mr-2" /> Analysis Settings
        </h2>

        {/* Mode Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select AI Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          >
            {modeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dropzone */}
        <Dropzone onFileSelect={handleFileSelect} />

        {/* Selected File Info */}
        {selectedFile && (
          <div className="mt-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 rounded-md">
            <p className="font-medium">
              Selected file: <strong>{selectedFile.name}</strong>
            </p>
            <p className="text-sm">
              Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          className={`w-full mt-6 py-3 px-4 rounded-lg text-lg font-bold transition-all flex justify-center items-center ${
            !selectedFile || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white shadow-md"
          }`}
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <AiOutlineSearch className="mr-2" /> Start Analysis
            </>
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Result Section */}
      {result && (
        <>
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-center">
            ✨ Analysis Result
          </h2>
          <ResultDisplay result={result} />
        </>
      )}

      {/* Footer Note */}
      <div className="mt-12 p-6 bg-white border-t pt-8 rounded-b-xl shadow-inner">
        <p className="text-center text-gray-600 font-medium mb-2">
          **Car Damage Assessment System**
        </p>
        <p className="text-center text-sm text-gray-500 italic">
          The application uses the YOLOv8 model to detect and segment car damage (broken glass, dents, scratches) through images.
        </p>
        <p className="text-center text-sm text-gray-700 mt-4">
          Developed by Nguyen Tuan Ngoc
        </p>
      </div>
    </div>
  );
};

export default AssessmentPage;
