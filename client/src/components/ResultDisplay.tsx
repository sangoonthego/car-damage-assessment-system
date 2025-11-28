import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { formatJson } from '../utils/format';
import { AssessmentResult } from '../api/ai';
import { ImageIcon, FileJson, AlertCircle } from 'lucide-react';

interface ResultDisplayProps {
  result: AssessmentResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (result?.imagePath) {
      // Check if imagePath is a full URL or relative path
      if (result.imagePath.startsWith('http')) {
        setImageUrl(result.imagePath);
      } else {
        const fileName = result.imagePath.split(/\\|\//).pop();
        const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3636';
        setImageUrl(`${baseUrl}/uploads/${fileName}`);
      }
    }
  }, [result]);

  if (!result) return null;

  const damageTypeMap: { [key: string]: string } = {
    'scratch': '擦り傷',
    'dent': 'へこみ',
    'broken-glass': 'ガラス破損',
    'broken_glass': 'ガラス破損',
  };

  return (
    <div className="space-y-8">
      {/* Main Result Display */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Result Image Card */}
        <Card className="p-6 border-slate-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-slate-900">
                解析結果画像
              </h3>
              <Badge variant="secondary" className="mt-1">
                {result.type === 'detect' ? '物体検出' : 'セグメンテーション'}
              </Badge>
            </div>
          </div>

          {imageUrl ? (
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src={imageUrl}
                alt="Analysis Result"
                className="w-full h-auto object-contain"
                onError={() => setImageUrl('')}
              />
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-center text-slate-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>画像を読み込めません</p>
              </div>
            </div>
          )}
        </Card>

        {/* Prediction Data Card */}
        <Card className="p-6 border-slate-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileJson className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-slate-900">
              詳細データ (JSON)
            </h3>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200">
            <div className="bg-slate-900 p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
              <pre className="text-green-400 text-sm">
                {formatJson(result)}
              </pre>
            </div>
          </div>
        </Card>
      </div>

      {/* Damage Details */}
      {result.predictions && result.predictions.length > 0 && (
        <Card className="p-8 border-slate-200 shadow-lg">
          <h3 className="text-slate-900 mb-6">検出された損傷の詳細</h3>
          
          <div className="space-y-4">
            {result.predictions.map((pred: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <span className="text-red-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-slate-900">
                      {damageTypeMap[pred.class] || pred.class || `損傷 ${index + 1}`}
                    </p>
                    {pred.confidence && (
                      <p className="text-slate-500">
                        信頼度: {(pred.confidence * 100).toFixed(1)}%
                      </p>
                    )}
                  </div>
                </div>
                {pred.confidence && (
                  <Badge 
                    variant={pred.confidence > 0.9 ? 'default' : 'secondary'}
                    className={pred.confidence > 0.9 ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                  >
                    {pred.confidence > 0.9 ? '高精度' : '中精度'}
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900">
                  <strong>注意事項</strong>
                </p>
                <p className="text-blue-700 mt-1">
                  この評価はAIによる自動解析結果です。正確な見積もりや修理については、専門業者にご相談ください。
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
