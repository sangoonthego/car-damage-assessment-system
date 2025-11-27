import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export function ClientHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const assessments = [
    {
      id: 'ASM-2025-001',
      date: '2025-01-15 14:30',
      images: 3,
      damages: 5,
      status: 'assessor_confirmed',
      estimatedCost: '¥180,000',
      repairTime: '3-5日',
      assessor: '山田太郎'
    },
    {
      id: 'ASM-2025-002',
      date: '2025-01-14 10:20',
      images: 2,
      damages: 3,
      status: 'sent_to_assessor',
      estimatedCost: '¥120,000',
      repairTime: '2-3日',
      assessor: '佐藤花子'
    },
    {
      id: 'ASM-2025-003',
      date: '2025-01-13 16:45',
      images: 4,
      damages: 7,
      status: 'ai_assessed',
      estimatedCost: '¥250,000',
      repairTime: '5-7日',
      assessor: '-'
    },
    {
      id: 'ASM-2025-004',
      date: '2025-01-12 09:15',
      images: 1,
      damages: 2,
      status: 'assessor_confirmed',
      estimatedCost: '¥80,000',
      repairTime: '1-2日',
      assessor: '鈴木一郎'
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      ai_assessed: { label: 'AI評価済み', color: 'bg-blue-100 text-blue-700' },
      sent_to_assessor: { label: 'Assessor確認中', color: 'bg-orange-100 text-orange-700' },
      assessor_confirmed: { label: '確認完了', color: 'bg-green-100 text-green-700' },
    };
    const config = statusMap[status as keyof typeof statusMap] || statusMap.ai_assessed;
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    const iconMap = {
      ai_assessed: <Clock className="w-5 h-5 text-blue-600" />,
      sent_to_assessor: <AlertCircle className="w-5 h-5 text-orange-600" />,
      assessor_confirmed: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    };
    return iconMap[status as keyof typeof iconMap] || <Clock className="w-5 h-5 text-blue-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-block mb-3">
          <Badge className="bg-red-50 text-red-700 border border-red-100">
            クライアント機能
          </Badge>
        </div>
        <h1 className="text-slate-900 mb-2">評価履歴</h1>
        <p className="text-slate-600">
          過去の車両損傷評価を確認し、レポートをダウンロードできます
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="評価IDで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのステータス</SelectItem>
              <SelectItem value="ai_assessed">AI評価済み</SelectItem>
              <SelectItem value="sent_to_assessor">Assessor確認中</SelectItem>
              <SelectItem value="assessor_confirmed">確認完了</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-slate-300">
            <Calendar className="w-4 h-4 mr-2" />
            期間指定
          </Button>
        </div>
      </Card>

      {/* Assessment Cards */}
      <div className="space-y-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Status & Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-slate-900">{assessment.id}</h3>
                      {getStatusBadge(assessment.status)}
                    </div>
                    <p className="text-slate-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {assessment.date}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    assessment.status === 'assessor_confirmed' ? 'bg-green-50' :
                    assessment.status === 'sent_to_assessor' ? 'bg-orange-50' : 'bg-blue-50'
                  }`}>
                    {getStatusIcon(assessment.status)}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-1">画像数</p>
                    <p className="text-slate-900">{assessment.images}枚</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-1">損傷箇所</p>
                    <p className="text-slate-900">{assessment.damages}箇所</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-1">推定費用</p>
                    <p className="text-slate-900">{assessment.estimatedCost}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-1">修理期間</p>
                    <p className="text-slate-900">{assessment.repairTime}</p>
                  </div>
                </div>

                {assessment.status !== 'ai_assessed' && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-900">
                      担当Assessor: <strong>{assessment.assessor}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex lg:flex-col gap-2 lg:min-w-[140px]">
                <Button variant="outline" className="flex-1 lg:flex-none border-slate-300">
                  <Eye className="w-4 h-4 mr-2" />
                  詳細表示
                </Button>
                <Button variant="outline" className="flex-1 lg:flex-none border-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" className="flex-1 lg:flex-none border-slate-300">
                  <Share2 className="w-4 h-4 mr-2" />
                  共有
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {assessments.length === 0 && (
        <Card className="p-12 border-slate-200 text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-slate-900 mb-2">評価履歴がありません</h3>
          <p className="text-slate-600 mb-6">
            まだ車両損傷の評価を行っていません。新しい評価を開始しましょう。
          </p>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            新規評価を開始
          </Button>
        </Card>
      )}
    </div>
  );
}
