import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import {
  ChevronLeft,
  Save,
  Send,
  Edit3,
  Check,
  X,
  AlertCircle,
  DollarSign,
  Clock,
  Wrench,
  Image as ImageIcon,
  ZoomIn,
  Download
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

export function CaseReviewPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data
  const caseData = {
    id: 'ASM-2025-015',
    clientName: '田中太郎',
    clientEmail: 'tanaka@example.com',
    submittedAt: '2025-01-15 14:30',
    status: 'under_review',
    images: [
      'https://images.unsplash.com/photo-1449130015084-2dc19ce65bcc?w=800',
      'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
    ]
  };

  const [damages, setDamages] = useState([
    {
      id: 1,
      type: 'バンパー損傷',
      severity: 'high',
      aiConfidence: 0.94,
      location: 'フロント左',
      estimatedCost: 45000,
      repairTime: 2,
      parts: ['フロントバンパー'],
      aiDetected: true
    },
    {
      id: 2,
      type: 'ヘッドライト破損',
      severity: 'medium',
      aiConfidence: 0.88,
      location: 'フロント左',
      estimatedCost: 32000,
      repairTime: 1,
      parts: ['ヘッドライトアセンブリ'],
      aiDetected: true
    },
    {
      id: 3,
      type: '塗装剥がれ',
      severity: 'low',
      aiConfidence: 0.76,
      location: 'ドア左',
      estimatedCost: 15000,
      repairTime: 1,
      parts: ['再塗装'],
      aiDetected: true
    }
  ]);

  const [notes, setNotes] = useState('');
  const [overrideReason, setOverrideReason] = useState('');

  const getSeverityBadge = (severity: string) => {
    const severityMap = {
      high: { label: '重度', color: 'bg-red-100 text-red-700' },
      medium: { label: '中度', color: 'bg-orange-100 text-orange-700' },
      low: { label: '軽度', color: 'bg-yellow-100 text-yellow-700' },
    };
    const config = severityMap[severity as keyof typeof severityMap];
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
  };

  const totalCost = damages.reduce((sum, d) => sum + d.estimatedCost, 0);
  const totalTime = damages.reduce((sum, d) => sum + d.repairTime, 0);

  const handleAcceptAI = () => {
    alert('AI評価を承認しました');
  };

  const handleSubmitReview = () => {
    alert('レビューを送信しました');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="inline-block mb-2">
              <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
                Assessor機能
              </Badge>
            </div>
            <h1 className="text-slate-900">{caseData.id}</h1>
            <p className="text-slate-600">
              クライアント: {caseData.clientName} • 提出日時: {caseData.submittedAt}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleAcceptAI} variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
            <Check className="w-4 h-4 mr-2" />
            AI評価を承認
          </Button>
          <Button onClick={handleSubmitReview} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <Send className="w-4 h-4 mr-2" />
            レビュー送信
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Images */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900">損傷画像</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-slate-300">
                  <ZoomIn className="w-4 h-4 mr-2" />
                  拡大
                </Button>
                <Button size="sm" variant="outline" className="border-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  ダウンロード
                </Button>
              </div>
            </div>

            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4">
              <img 
                src={caseData.images[selectedImage]} 
                alt={`Damage ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {caseData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-blue-600' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </Card>

          {/* AI Detection Results */}
          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900">損傷詳細</h3>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="border-slate-300"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing ? '編集終了' : '編集'}
              </Button>
            </div>

            <div className="space-y-4">
              {damages.map((damage, index) => (
                <Card key={damage.id} className="p-5 border-slate-200 bg-slate-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-slate-900">{damage.type}</h4>
                          {getSeverityBadge(damage.severity)}
                        </div>
                        <p className="text-slate-600">
                          {damage.location} • AI信頼度: {(damage.aiConfidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    {damage.aiDetected && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        AI検出
                      </Badge>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4 mt-4 pt-4 border-t border-slate-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>損傷タイプ</Label>
                          <Input defaultValue={damage.type} />
                        </div>
                        <div className="space-y-2">
                          <Label>重要度</Label>
                          <Select defaultValue={damage.severity}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">軽度</SelectItem>
                              <SelectItem value="medium">中度</SelectItem>
                              <SelectItem value="high">重度</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>推定費用 (¥)</Label>
                          <Input type="number" defaultValue={damage.estimatedCost} />
                        </div>
                        <div className="space-y-2">
                          <Label>修理日数</Label>
                          <Input type="number" defaultValue={damage.repairTime} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>必要部品</Label>
                        <Input defaultValue={damage.parts.join(', ')} />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-slate-500 mb-1">推定費用</p>
                        <p className="text-slate-900">¥{damage.estimatedCost.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-slate-500 mb-1">修理期間</p>
                        <p className="text-slate-900">{damage.repairTime}日</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-slate-500 mb-1">必要部品</p>
                        <p className="text-slate-900 text-sm">{damage.parts.length}点</p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Add New Damage */}
            {isEditing && (
              <Button className="w-full mt-4 border-2 border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-50">
                + 新しい損傷を追加
              </Button>
            )}
          </Card>
        </div>

        {/* Right: Summary & Actions */}
        <div className="space-y-6">
          {/* Summary */}
          <Card className="p-6 border-slate-200">
            <h3 className="text-slate-900 mb-4">評価サマリー</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-900">検出された損傷</p>
                </div>
                <p className="text-red-900">{damages.length}箇所</p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <p className="text-green-900">合計推定費用</p>
                </div>
                <p className="text-green-900">¥{totalCost.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <p className="text-blue-900">合計修理期間</p>
                </div>
                <p className="text-blue-900">{totalTime}日</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <Wrench className="w-5 h-5 text-orange-600" />
                  <p className="text-orange-900">必要部品</p>
                </div>
                <p className="text-orange-900">{damages.reduce((sum, d) => sum + d.parts.length, 0)}点</p>
              </div>
            </div>
          </Card>

          {/* Override AI */}
          <Card className="p-6 border-slate-200 border-orange-300 bg-orange-50/50">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-orange-900">AI評価を上書き</h3>
            </div>
            <p className="text-orange-700 mb-4 text-sm">
              AI評価と異なる判断をする場合は、理由を記入してください
            </p>
            <Textarea
              placeholder="上書き理由を入力..."
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              rows={4}
            />
          </Card>

          {/* Notes */}
          <Card className="p-6 border-slate-200">
            <h3 className="text-slate-900 mb-4">メモ</h3>
            <Textarea
              placeholder="追加のコメントや特記事項..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
            />
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              一時保存
            </Button>
            <Button variant="outline" className="w-full border-slate-300">
              <X className="w-4 h-4 mr-2" />
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
