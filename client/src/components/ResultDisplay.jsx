import React, { useState, useEffect } from "react";
import { formatJson } from "../utils/format";

const ResultDisplay = ({ result }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (result?.imagePath) {
      const fileName = result.imagePath.split(/\\|\//).pop();
      const url = `http://localhost:3636/uploads/${fileName}`;
      setImageUrl(url);
    }
  }, [result]);

  if (!result) return null;

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-8">
      {/* Result Image Card */}
      <div className="p-4 bg-white shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-3 text-[#1E3D59]">
          🖼️ Result Image ({result.type.toUpperCase()})
        </h3>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Analysis Result"
            className="w-full h-auto max-h-[500px] object-contain rounded-lg border border-gray-300"
            onError={() => setImageUrl("")}
          />
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600">
            Cannot Load Result Image
          </div>
        )}
      </div>

      {/* Prediction Data Card */}
      <div className="p-4 bg-white shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-3 text-[#1E3D59]">
          📄 Prediction Data (JSON)
        </h3>

        <pre className="bg-[#1C1C1C] text-[#E9C46A] p-4 rounded-lg overflow-x-auto text-sm max-h-[500px]">
          {formatJson(result)}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;
