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
