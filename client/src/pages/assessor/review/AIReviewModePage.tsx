import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
  Check,
  X,
  Bot,
  User,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export function AIReviewModePage() {
  const [selectedCase, setSelectedCase] = useState(0);

  // Mock comparison data
  const cases = [
    {
      id: 'ASM-2025-020',
      imageUrl: 'https://images.unsplash.com/photo-1449130015084-2dc19ce65bcc?w=800',
      aiPredictions: [
        { type: 'バンパー損傷', severity: 'high', cost: 45000, confidence: 0.94 },
        { type: 'ヘッドライト破損', severity: 'medium', cost: 32000, confidence: 0.88 }
      ],
      assessorReview: [
        { type: 'バンパー損傷', severity: 'high', cost: 48000 },
        { type: 'ヘッドライト破損', severity: 'medium', cost: 30000 },
        { type: 'グリル変形', severity: 'low', cost: 12000 }
      ],
      decision: null
    },
    {
      id: 'ASM-2025-019',
      imageUrl: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800',
      aiPredictions: [
        { type: 'ドア凹み', severity: 'medium', cost: 35000, confidence: 0.91 },
        { type: '塗装剥がれ', severity: 'low', cost: 15000, confidence: 0.85 }
      ],
      assessorReview: [
        { type: 'ドア凹み', severity: 'medium', cost: 35000 },
        { type: '塗装剥がれ', severity: 'low', cost: 15000 }
      ],
      decision: 'accept'
    },
    {
      id: 'ASM-2025-018',
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      aiPredictions: [
        { type: 'ボンネット損傷', severity: 'high', cost: 68000, confidence: 0.82 }
      ],
      assessorReview: [
        { type: 'ボンネット損傷', severity: 'medium', cost: 55000 },
        { type: 'ラッチ破損', severity: 'low', cost: 8000 }
      ],
      decision: 'override'
    }
  ];

  const currentCase = cases[selectedCase];

  const handleAcceptAI = () => {
    const updatedCases = [...cases];
    updatedCases[selectedCase].decision = 'accept';
    alert('AI評価を承認しました。このデータは学習に使用されます。');
  };

  const handleOverride = () => {
    const updatedCases = [...cases];
    updatedCases[selectedCase].decision = 'override';
    alert('Assessor評価で上書きしました。このデータは学習に使用されます。');
  };

  const stats = {
    totalReviews: 234,
    aiAccepted: 189,
    overridden: 45,
    accuracy: 80.8
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-block mb-3">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
            Assessor機能
          </Badge>
        </div>
        <h1 className="text-slate-900 mb-2">AI評価モード</h1>
        <p className="text-slate-600">
          AI評価と人間評価を比較し、最適な判断を選択します
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">総レビュー数</p>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-slate-900">{stats.totalReviews}件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">AI承認</p>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-slate-900">{stats.aiAccepted}件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">上書き</p>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-slate-900">{stats.overridden}件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">AI精度</p>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-slate-900">{stats.accuracy}%</p>
        </Card>
      </div>

      {/* Case Selector */}
      <Card className="p-6 border-slate-200">
        <div className="flex items-center gap-4 overflow-x-auto">
          {cases.map((c, index) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(index)}
              className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all ${
                selectedCase === index 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <p className={`mb-2 ${selectedCase === index ? 'text-blue-900' : 'text-slate-900'}`}>
                {c.id}
              </p>
              {c.decision && (
                <Badge className={
                  c.decision === 'accept' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }>
                  {c.decision === 'accept' ? 'AI承認' : '上書き'}
                </Badge>
              )}
              {!c.decision && (
                <Badge className="bg-slate-100 text-slate-700">未判定</Badge>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Comparison View */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Prediction */}
        <Card className="border-2 border-blue-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white mb-1">AI評価</h3>
                <p className="text-blue-100">機械学習モデル予測</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Image */}
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-6">
              <img 
                src={currentCase.imageUrl} 
                alt="Case"
                className="w-full h-full object-cover"
              />
            </div>

            {/* AI Predictions */}
            <div className="space-y-3">
              <h4 className="text-slate-900 mb-3">検出された損傷</h4>
              {currentCase.aiPredictions.map((pred, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-blue-900 mb-1">{pred.type}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          pred.severity === 'high' ? 'bg-red-100 text-red-700' :
                          pred.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }>
                          {pred.severity === 'high' ? '重度' : pred.severity === 'medium' ? '中度' : '軽度'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-blue-900">¥{pred.cost.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600"
                        style={{ width: `${pred.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-blue-900 text-sm">{(pred.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-blue-100 rounded-xl mt-4">
                <p className="text-blue-900">
                  合計: <strong>¥{currentCase.aiPredictions.reduce((sum, p) => sum + p.cost, 0).toLocaleString()}</strong>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessor Review */}
        <Card className="border-2 border-purple-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white mb-1">Assessor評価</h3>
                <p className="text-purple-100">専門家による判断</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Image */}
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-6">
              <img 
                src={currentCase.imageUrl} 
                alt="Case"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Assessor Review */}
            <div className="space-y-3">
              <h4 className="text-slate-900 mb-3">確認された損傷</h4>
              {currentCase.assessorReview.map((review, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-purple-900 mb-1">{review.type}</p>
                      <Badge className={
                        review.severity === 'high' ? 'bg-red-100 text-red-700' :
                        review.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }>
                        {review.severity === 'high' ? '重度' : review.severity === 'medium' ? '中度' : '軽度'}
                      </Badge>
                    </div>
                    <p className="text-purple-900">¥{review.cost.toLocaleString()}</p>
                  </div>

                  {/* Check if this was detected by AI */}
                  {!currentCase.aiPredictions.find(p => p.type === review.type) && (
                    <Badge className="bg-orange-100 text-orange-700 mt-2">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      AIが検出できなかった
                    </Badge>
                  )}
                </div>
              ))}

              <div className="p-4 bg-purple-100 rounded-xl mt-4">
                <p className="text-purple-900">
                  合計: <strong>¥{currentCase.assessorReview.reduce((sum, r) => sum + r.cost, 0).toLocaleString()}</strong>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Comparison Summary */}
      <Card className="p-8 border-slate-200 bg-slate-50">
        <h3 className="text-slate-900 mb-6">比較サマリー</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-white rounded-xl">
            <p className="text-slate-500 mb-2">検出数の差</p>
            <p className="text-slate-900">
              AI: {currentCase.aiPredictions.length}件 
              <ArrowRight className="w-4 h-4 inline mx-2 text-slate-400" />
              Assessor: {currentCase.assessorReview.length}件
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl">
            <p className="text-slate-500 mb-2">費用の差</p>
            <p className="text-slate-900">
              ¥{Math.abs(
                currentCase.aiPredictions.reduce((sum, p) => sum + p.cost, 0) -
                currentCase.assessorReview.reduce((sum, r) => sum + r.cost, 0)
              ).toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl">
            <p className="text-slate-500 mb-2">一致率</p>
            <p className="text-slate-900">
              {((currentCase.aiPredictions.filter(p => 
                currentCase.assessorReview.find(r => r.type === p.type)
              ).length / currentCase.aiPredictions.length) * 100).toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Decision Buttons */}
        {!currentCase.decision && (
          <div className="flex gap-4">
            <Button 
              onClick={handleAcceptAI}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white h-14"
            >
              <Check className="w-5 h-5 mr-2" />
              AI評価を承認
            </Button>
            <Button 
              onClick={handleOverride}
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white h-14"
            >
              <X className="w-5 h-5 mr-2" />
              Assessor評価で上書き
            </Button>
          </div>
        )}

        {currentCase.decision && (
          <div className={`p-6 rounded-xl ${
            currentCase.decision === 'accept' 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-orange-50 border-2 border-orange-200'
          }`}>
            <div className="flex items-center gap-3">
              {currentCase.decision === 'accept' ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <p className="text-green-900">AI評価を承認しました。このデータは学習に使用されます。</p>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  <p className="text-orange-900">Assessor評価で上書きしました。このデータは学習に使用されます。</p>
                </>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
