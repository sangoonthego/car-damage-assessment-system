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
      {}
      <div className="p-4 bg-white shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-3">
          🖼️ Result Image ({result.type.toUpperCase()})
        </h3>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Kết quả phân tích"
            className="w-full h-auto max-h-[500px] object-contain rounded-lg border"
            onError={() => setImageUrl("")} 
          />
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            Cannot Load Result Image
          </div>
        )}
      </div>

      {}
      <div className="p-4 bg-white shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-3">
          📄 Prediction Data (JSON)
        </h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-[500px]">
          {formatJson(result)}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;