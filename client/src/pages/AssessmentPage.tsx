import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Dropzone } from '../components/Dropzone';
import { ResultDisplay } from '../components/ResultDisplay';
import { runAssessment, AssessmentResult } from '../api/ai';
import { 
  Sparkles, 
  ArrowLeft, 
  Play, 
  Loader2,
  FileImage,
  Settings2,
  AlertCircle
} from 'lucide-react';

export function AssessmentPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'detect' | 'segment'>('detect');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('画像ファイルを選択してください');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await runAssessment(selectedFile, mode);
      setResult(res);
    } catch (err) {
      setError(`解析に失敗しました: ${err instanceof Error ? err.message : '不明なエラー'}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      {/* <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="tracking-tight text-slate-900">Car Damage Assessment</span>
            </Link>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">車両損傷評価システム</span>
          </div>

          <Link to="/">
            <Button variant="ghost" className="text-slate-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ホームに戻る
            </Button>
          </Link>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-red-50 text-red-700 rounded-full border border-red-100">
              AI損傷診断
            </span>
          </div>
          <h1 className="text-slate-900 mb-4">
            車両損傷評価システム
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            写真をアップロードして、AIによる高精度な損傷解析を開始してください。
            わずか数秒で詳細な評価結果と修理費用の概算を取得できます。
          </p>
        </div>

        {/* Assessment Settings */}
        <Card className="p-8 border-slate-200 shadow-xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-slate-900">解析設定</h2>
          </div>

          {/* Mode Selection */}
          <div className="mb-8">
            <Label className="mb-3 block text-slate-700">AIモード選択</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setMode('detect')}
                disabled={isLoading}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  mode === 'detect'
                    ? 'border-red-500 bg-red-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    mode === 'detect' ? 'border-red-600' : 'border-slate-300'
                  }`}>
                    {mode === 'detect' && (
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    )}
                  </div>
                  <h3 className={mode === 'detect' ? 'text-red-700' : 'text-slate-900'}>
                    物体検出 (Detection)
                  </h3>
                </div>
                <p className="text-slate-600">
                  損傷箇所を矩形で検出し、位置と種類を特定します
                </p>
              </button>

              <button
                onClick={() => setMode('segment')}
                disabled={isLoading}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  mode === 'segment'
                    ? 'border-red-500 bg-red-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    mode === 'segment' ? 'border-red-600' : 'border-slate-300'
                  }`}>
                    {mode === 'segment' && (
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    )}
                  </div>
                  <h3 className={mode === 'segment' ? 'text-red-700' : 'text-slate-900'}>
                    セグメンテーション (Segmentation)
                  </h3>
                </div>
                <p className="text-slate-600">
                  損傷箇所の正確な形状と範囲をピクセル単位で解析します
                </p>
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <Label className="mb-3 block text-slate-700">画像アップロード</Label>
            <Dropzone onFileSelect={handleFileSelect} />
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileImage className="w-6 h-6 text-green-700" />
                </div>
                <div className="flex-1">
                  <p className="text-green-900 mb-1">
                    <strong>{selectedFile.name}</strong>
                  </p>
                  <p className="text-green-700">
                    ファイルサイズ: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900 mb-1">
                    エラーが発生しました
                  </p>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
            size="lg"
            className={`w-full h-14 transition-all ${
              !selectedFile || isLoading
                ? 'bg-slate-300 cursor-not-allowed text-slate-500 hover:bg-slate-300'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-200 hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                解析中...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                解析を開始
              </>
            )}
          </Button>

          <p className="text-center text-slate-500 mt-4">
            ※ 解析には通常2〜5秒かかります
          </p>
        </Card>

        {/* Results Section */}
        {result && (
          <div>
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                  解析完了
                </span>
              </div>
              <h2 className="text-slate-900">
                解析結果
              </h2>
              <p className="text-slate-600 mt-2">
                AIによる車両損傷の評価が完了しました
              </p>
            </div>

            <ResultDisplay result={result} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-slate-600 mb-2">
              YOLOv8モデルを使用した高精度な車両損傷検出システム
            </p>
            <p className="text-slate-500">
              擦り傷、へこみ、ガラス破損などを自動的に検出・評価します
            </p>
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-slate-400">
                © 2025 Car Damage Assessment. Developed by Nguyen Tuan Ngoc
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
