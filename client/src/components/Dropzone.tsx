// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { AiOutlineCloudUpload } from "react-icons/ai";

// const Dropzone = ({ onFileSelect }) => {
//   const [errorMessage, setErrorMessage] = useState("");

//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       setErrorMessage("");
//       if (acceptedFiles.length > 0) {
//         onFileSelect(acceptedFiles[0]);
//       }
//     },
//     [onFileSelect]
//   );

//   const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     maxFiles: 1,
//     noClick: true,
//     onDropRejected: (fileRejections) => {
//       const firstError = fileRejections[0]?.errors[0];
//       if (firstError.code === "file-too-large") {
//         setErrorMessage("File is too large, please choose smaller one!!!");
//       } else if (firstError.code === "file-invalid-type") {
//         setErrorMessage("Invalid file, please choose an image file!!!");
//       } else {
//         setErrorMessage("Error when choosing file!!!");
//       }
//     },
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors 
//         ${
//           isDragActive
//             ? "border-[#61DAFB] bg-[#E0F7FA]"
//             : "border-gray-300 hover:border-[#1E3D59]"
//         }`}
//     >
//       <input {...getInputProps()} />

//       <AiOutlineCloudUpload className="mx-auto h-12 w-12 text-[#1E3D59]" />

//       <p className="mt-2 text-sm text-gray-700">Upload File Here</p>

//       <button
//         type="button"
//         onClick={open}
//         className="mt-2 px-4 py-2 text-sm font-medium text-white bg-[#1E3D59] rounded-md hover:bg-[#0F4C5C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#61DAFB]"
//       >
//         Choose an Image
//       </button>

//       <p className="mt-2 text-xs text-gray-500">Only 1 Image File Accepted</p>

//       {errorMessage && (
//         <p className="mt-2 text-sm text-[#D62828] font-medium">{errorMessage}</p>
//       )}
//     </div>
//   );
// };

// export default Dropzone;

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
}

export function Dropzone({ onFileSelect }: DropzoneProps) {
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setErrorMessage('');
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    noClick: true,
    onDropRejected: (fileRejections) => {
      const firstError = fileRejections[0]?.errors[0];
      if (firstError?.code === 'file-too-large') {
        setErrorMessage('ファイルサイズが大きすぎます');
      } else if (firstError?.code === 'file-invalid-type') {
        setErrorMessage('画像ファイルを選択してください');
      } else {
        setErrorMessage('ファイルの選択中にエラーが発生しました');
      }
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed transition-all cursor-pointer ${
        isDragActive
          ? 'border-red-500 bg-red-50'
          : 'border-slate-300 hover:border-red-400 hover:bg-slate-50'
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
          isDragActive ? 'bg-red-100' : 'bg-slate-100'
        }`}>
          <Upload className={`w-8 h-8 ${isDragActive ? 'text-red-600' : 'text-slate-600'}`} />
        </div>

        <div className="text-center">
          <p className="text-slate-900 mb-2">
            {isDragActive ? '画像をドロップしてください' : '画像をドラッグ＆ドロップ'}
          </p>
          <p className="text-slate-500 mb-4">または</p>
          <button
            type="button"
            onClick={open}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 text-white rounded-lg transition-all shadow-md hover:shadow-lg hover:shadow-red-200"
          >
            ファイルを選択
          </button>
        </div>

        <p className="text-slate-400">
          PNG, JPG, JPEG形式に対応 (最大10MB)
        </p>

        {errorMessage && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
