import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  Brain,
  Zap,
  Settings,
  Save,
  RefreshCw,
  Activity,
  CheckCircle2,
  AlertCircle,
  Database,
  TrendingUp
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

export function AIModelSettingsPage() {
  const [selectedModel, setSelectedModel] = useState('yolov8');
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [iouThreshold, setIouThreshold] = useState(45);

  // Mock data
  const models = [
    {
      id: 'yolov8',
      name: 'YOLOv8',
      description: '高速で正確な物体検出モデル',
      accuracy: 94.2,
      speed: 'Fast',
      status: 'active',
      lastTrained: '2025-01-10'
    },
    {
      id: 'efficientdet',
      name: 'EfficientDet-D4',
      description: '効率的な検出モデル',
      accuracy: 92.8,
      speed: 'Medium',
      status: 'available',
      lastTrained: '2024-12-20'
    },
    {
      id: 'faster-rcnn',
      name: 'Faster R-CNN',
      description: '高精度な領域ベース検出',
      accuracy: 95.1,
      speed: 'Slow',
      status: 'available',
      lastTrained: '2024-11-15'
    },
    {
      id: 'custom',
      name: 'Custom Model',
      description: 'カスタムトレーニングモデル',
      accuracy: 91.5,
      speed: 'Fast',
      status: 'training',
      lastTrained: '進行中'
    }
  ];

  const apiLogs = [
    { timestamp: '2025-01-15 14:30:25', endpoint: '/api/detect', status: 200, duration: 234, confidence: 0.94 },
    { timestamp: '2025-01-15 14:28:12', endpoint: '/api/segment', status: 200, duration: 456, confidence: 0.88 },
    { timestamp: '2025-01-15 14:25:45', endpoint: '/api/detect', status: 200, duration: 189, confidence: 0.92 },
    { timestamp: '2025-01-15 14:22:33', endpoint: '/api/detect', status: 500, duration: 0, confidence: 0 },
    { timestamp: '2025-01-15 14:20:11', endpoint: '/api/segment', status: 200, duration: 421, confidence: 0.85 },
  ];

  const features = [
    { id: 'detection', name: '損傷検出', enabled: true },
    { id: 'segmentation', name: 'セグメンテーション', enabled: true },
    { id: 'classification', name: '損傷分類', enabled: true },
    { id: 'severity', name: '重要度評価', enabled: true },
    { id: 'cost-estimation', name: '費用推定', enabled: false },
    { id: 'auto-approval', name: '自動承認', enabled: false },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: 'アクティブ', color: 'bg-green-100 text-green-700' },
      available: { label: '利用可能', color: 'bg-blue-100 text-blue-700' },
      training: { label: 'トレーニング中', color: 'bg-orange-100 text-orange-700' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-block mb-3">
            <Badge className="bg-red-50 text-red-700 border border-red-100">
              Admin機能
            </Badge>
          </div>
          <h1 className="text-slate-900 mb-2">AIモデル設定</h1>
          <p className="text-slate-600">
            検出モデルの選択、パラメータ調整、API監視を行います
          </p>
        </div>

        <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          設定を保存
        </Button>
      </div>

      {/* Model Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {models.map((model) => (
          <Card 
            key={model.id} 
            className={`p-6 border-2 cursor-pointer transition-all ${
              selectedModel === model.id 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => setSelectedModel(model.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedModel === model.id ? 'bg-blue-600' : 'bg-slate-200'
                }`}>
                  <Brain className={`w-6 h-6 ${selectedModel === model.id ? 'text-white' : 'text-slate-600'}`} />
                </div>
                <div>
                  <h3 className={selectedModel === model.id ? 'text-blue-900' : 'text-slate-900'}>
                    {model.name}
                  </h3>
                  <p className={`text-sm ${selectedModel === model.id ? 'text-blue-600' : 'text-slate-600'}`}>
                    {model.description}
                  </p>
                </div>
              </div>
              {getStatusBadge(model.status)}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className={`p-3 rounded-lg ${selectedModel === model.id ? 'bg-white' : 'bg-slate-50'}`}>
                <p className="text-slate-500 text-sm mb-1">精度</p>
                <p className={selectedModel === model.id ? 'text-blue-900' : 'text-slate-900'}>
                  {model.accuracy}%
                </p>
              </div>
              <div className={`p-3 rounded-lg ${selectedModel === model.id ? 'bg-white' : 'bg-slate-50'}`}>
                <p className="text-slate-500 text-sm mb-1">速度</p>
                <p className={selectedModel === model.id ? 'text-blue-900' : 'text-slate-900'}>
                  {model.speed}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${selectedModel === model.id ? 'bg-white' : 'bg-slate-50'}`}>
                <p className="text-slate-500 text-sm mb-1">更新日</p>
                <p className={`text-sm ${selectedModel === model.id ? 'text-blue-900' : 'text-slate-900'}`}>
                  {model.lastTrained.substring(5)}
                </p>
              </div>
            </div>

            {selectedModel === model.id && (
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                選択中
              </Button>
            )}
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Model Parameters */}
        <Card className="p-8 border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-slate-900">モデルパラメータ</h3>
          </div>

          <div className="space-y-6">
            {/* Confidence Threshold */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>信頼度しきい値</Label>
                <span className="text-slate-900">{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${confidenceThreshold}%, rgb(226, 232, 240) ${confidenceThreshold}%, rgb(226, 232, 240) 100%)`
                }}
              />
              <p className="text-slate-500 text-sm">
                この値より低い信頼度の検出結果は表示されません
              </p>
            </div>

            {/* IOU Threshold */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>IOUしきい値</Label>
                <span className="text-slate-900">{iouThreshold}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={iouThreshold}
                onChange={(e) => setIouThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${iouThreshold}%, rgb(226, 232, 240) ${iouThreshold}%, rgb(226, 232, 240) 100%)`
                }}
              />
              <p className="text-slate-500 text-sm">
                重複する検出結果の統合に使用されます
              </p>
            </div>

            {/* Batch Size */}
            <div className="space-y-2">
              <Label>バッチサイズ</Label>
              <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 (最高精度)</SelectItem>
                  <SelectItem value="4">4 (推奨)</SelectItem>
                  <SelectItem value="8">8 (高速)</SelectItem>
                  <SelectItem value="16">16 (最高速)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Input Size */}
            <div className="space-y-2">
              <Label>入力画像サイズ</Label>
              <Select defaultValue="640">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="416">416x416</SelectItem>
                  <SelectItem value="512">512x512</SelectItem>
                  <SelectItem value="640">640x640 (推奨)</SelectItem>
                  <SelectItem value="800">800x800</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Feature Toggles */}
        <Card className="p-8 border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-slate-900">AI機能</h3>
          </div>

          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-slate-900 mb-1">{feature.name}</p>
                  <p className="text-slate-500 text-sm">
                    {feature.enabled ? '有効' : '無効'}
                  </p>
                </div>
                <button
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    feature.enabled ? 'bg-green-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      feature.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            モデルを再読み込み
          </Button>
        </Card>
      </div>

      {/* API Logs */}
      <Card className="border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">APIログ (リアルタイム)</h3>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse" />
              稼働中
            </Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-slate-700">タイムスタンプ</th>
                <th className="px-6 py-3 text-left text-slate-700">エンドポイント</th>
                <th className="px-6 py-3 text-left text-slate-700">ステータス</th>
                <th className="px-6 py-3 text-left text-slate-700">処理時間</th>
                <th className="px-6 py-3 text-left text-slate-700">信頼度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {apiLogs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-600 text-sm">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-1 bg-slate-100 text-slate-900 rounded text-sm">
                      {log.endpoint}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {log.status === 200 ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {log.status}
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                        {log.status}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-900">{log.duration}ms</td>
                  <td className="px-6 py-4">
                    {log.confidence > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-700"
                            style={{ width: `${log.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-slate-900 text-sm">{(log.confidence * 100).toFixed(0)}%</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Model Performance */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <p className="text-slate-500">24時間リクエスト</p>
          </div>
          <p className="text-slate-900">1,234件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-green-600" />
            <p className="text-slate-500">平均処理時間</p>
          </div>
          <p className="text-slate-900">287ms</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-slate-500">成功率</p>
          </div>
          <p className="text-slate-900">99.8%</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 text-purple-600" />
            <p className="text-slate-500">モデルサイズ</p>
          </div>
          <p className="text-slate-900">245 MB</p>
        </Card>
      </div>
    </div>
  );
}
