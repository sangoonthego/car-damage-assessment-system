import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import {
  Upload,
  X,
  FileImage,
  Play,
  Loader2,
  Download,
  Share2,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';
import { runAssessment, AssessmentResult } from '../../api/ai';

export function UploadDamagePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [incidentType, setIncidentType] = useState('');
  const [notes, setNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'results'>('upload');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
    
    // Create previews
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (files.length === 0) return;

    setIsAnalyzing(true);
    setCurrentStep('analyzing');
    const newResults: AssessmentResult[] = [];

    try {
      for (const file of files) {
        const result = await runAssessment(file, 'detect');
        newResults.push(result);
      }
      setResults(newResults);
      setCurrentStep('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      setCurrentStep('upload');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportPDF = () => {
    // Export logic
    alert('PDF レポートをダウンロード中...');
  };

  const handleShare = () => {
    alert('リンクをコピーしました');
  };

  const handleNewAssessment = () => {
    setFiles([]);
    setPreviews([]);
    setResults([]);
    setIncidentType('');
    setNotes('');
    setCurrentStep('upload');
  };

  if (currentStep === 'analyzing') {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 border-slate-200 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
          </div>
          <h2 className="text-slate-900 mb-4">AI解析中...</h2>
          <p className="text-slate-600 mb-8">
            {files.length}枚の画像を解析しています。しばらくお待ちください。
          </p>
          <div className="max-w-md mx-auto bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 h-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </Card>
      </div>
    );
  }

  if (currentStep === 'results') {
    const totalDamages = results.reduce((sum, r) => sum + (r.predictions?.length || 0), 0);
    const avgConfidence = results.reduce((sum, r) => sum + (r.confidence || 0.9), 0) / results.length;
    const estimatedCost = results.reduce((sum, r) => sum + ((r.estimatedCost?.max || 100000)), 0);

    return (
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-block mb-3">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                解析完了
              </Badge>
            </div>
            <h1 className="text-slate-900">損傷評価レポート</h1>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleShare} variant="outline" className="border-slate-300">
              <Share2 className="w-4 h-4 mr-2" />
              共有
            </Button>
            <Button onClick={handleExportPDF} variant="outline" className="border-slate-300">
              <Download className="w-4 h-4 mr-2" />
              PDFダウンロード
            </Button>
            <Button onClick={handleNewAssessment} className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              新規評価
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-slate-500">検出された損傷</p>
            </div>
            <p className="text-slate-900">{totalDamages}箇所</p>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-slate-500">平均信頼度</p>
            </div>
            <p className="text-slate-900">{(avgConfidence * 100).toFixed(1)}%</p>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-slate-500">推定修理費用</p>
            </div>
            <p className="text-slate-900">¥{estimatedCost.toLocaleString()}</p>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-slate-500">推定修理期間</p>
            </div>
            <p className="text-slate-900">3〜5日</p>
          </Card>
        </div>

        {/* Results Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {results.map((result, index) => (
            <Card key={index} className="p-6 border-slate-200">
              <div className="mb-4">
                <Badge variant="secondary">画像 {index + 1}</Badge>
              </div>
              <div className="aspect-video bg-slate-100 rounded-lg mb-4 overflow-hidden">
                <img src={previews[index]} alt={`Result ${index + 1}`} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                {result.predictions?.slice(0, 3).map((pred: any, pIndex: number) => (
                  <div key={pIndex} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                        <span className="text-red-600">{pIndex + 1}</span>
                      </div>
                      <div>
                        <p className="text-slate-900">{pred.class || '損傷'}</p>
                        <p className="text-slate-500">信頼度: {((pred.confidence || 0.9) * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-block mb-4">
          <Badge className="bg-red-50 text-red-700 border border-red-100">
            クライアント機能
          </Badge>
        </div>
        <h1 className="text-slate-900 mb-4">車両損傷アップロード</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          損傷した車両の写真をアップロードして、AIによる自動評価を受けましょう
        </p>
      </div>

      {/* Upload Section */}
      <Card className="p-8 border-slate-200">
        <Label className="mb-4 block text-slate-700">画像をアップロード (1〜10枚)</Label>
        
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-red-400 transition-colors cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-slate-900 mb-2">クリックして画像を選択</p>
            <p className="text-slate-500">または画像をドラッグ&ドロップ</p>
          </label>
        </div>

        {/* File Previews */}
        {files.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-slate-200"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 right-2">
                  <Badge className="bg-white/90 text-slate-900 text-xs">
                    <FileImage className="w-3 h-3 mr-1" />
                    {files[index].name.substring(0, 10)}...
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Incident Type (Optional) */}
      <Card className="p-8 border-slate-200">
        <Label className="mb-4 block text-slate-700">事故タイプ (任意)</Label>
        <div className="grid md:grid-cols-4 gap-3">
          {['衝突事故', '擦り傷', 'へこみ', 'その他'].map((type) => (
            <button
              key={type}
              onClick={() => setIncidentType(type)}
              className={`p-4 rounded-xl border-2 transition-all ${
                incidentType === type
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <p className={incidentType === type ? 'text-red-700' : 'text-slate-900'}>
                {type}
              </p>
            </button>
          ))}
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-8 border-slate-200">
        <Label htmlFor="notes" className="mb-4 block text-slate-700">追加メモ (任意)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="事故の詳細や特記事項を入力してください..."
          rows={4}
        />
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleAnalyze}
          disabled={files.length === 0 || isAnalyzing}
          size="lg"
          className={`w-full md:w-auto px-12 h-14 ${
            files.length === 0 || isAnalyzing
              ? 'bg-slate-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              解析中...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              AI解析を開始 ({files.length}枚)
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
