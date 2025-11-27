import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Search,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Image as ImageIcon,
  Play,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export function AssessmentQueuePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Mock data
  const queue = [
    {
      id: 'ASM-2025-015',
      clientName: '田中太郎',
      clientEmail: 'tanaka@example.com',
      submittedAt: '2025-01-15 14:30',
      images: 3,
      aiDamages: 5,
      aiConfidence: 0.92,
      priority: 'high',
      estimatedCost: '¥180,000',
      status: 'new',
      waitTime: '10分'
    },
    {
      id: 'ASM-2025-014',
      clientName: '佐藤花子',
      clientEmail: 'sato@example.com',
      submittedAt: '2025-01-15 13:15',
      images: 2,
      aiDamages: 3,
      aiConfidence: 0.88,
      priority: 'medium',
      estimatedCost: '¥120,000',
      status: 'new',
      waitTime: '1時間25分'
    },
    {
      id: 'ASM-2025-013',
      clientName: '鈴木一郎',
      clientEmail: 'suzuki@example.com',
      submittedAt: '2025-01-15 11:45',
      images: 4,
      aiDamages: 7,
      aiConfidence: 0.85,
      priority: 'high',
      estimatedCost: '¥250,000',
      status: 'under_review',
      waitTime: '2時間45分',
      reviewer: '山田太郎'
    },
    {
      id: 'ASM-2025-012',
      clientName: '高橋美咲',
      clientEmail: 'takahashi@example.com',
      submittedAt: '2025-01-15 09:20',
      images: 1,
      aiDamages: 2,
      aiConfidence: 0.95,
      priority: 'low',
      estimatedCost: '¥80,000',
      status: 'new',
      waitTime: '5時間10分'
    },
  ];

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      high: { label: '高優先度', color: 'bg-red-100 text-red-700' },
      medium: { label: '中優先度', color: 'bg-orange-100 text-orange-700' },
      low: { label: '低優先度', color: 'bg-blue-100 text-blue-700' },
    };
    const config = priorityMap[priority as keyof typeof priorityMap];
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      new: { label: '新規', color: 'bg-green-100 text-green-700' },
      under_review: { label: '確認中', color: 'bg-yellow-100 text-yellow-700' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
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
        <h1 className="text-slate-900 mb-2">評価キュー</h1>
        <p className="text-slate-600">
          新しい評価リクエストを確認し、レビューを開始します
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">新規</p>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-slate-900">3件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">確認中</p>
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-slate-900">1件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">平均待機時間</p>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-slate-900">2時間23分</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">今日完了</p>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-slate-900">12件</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="評価ID、クライアント名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="high">高優先度</SelectItem>
              <SelectItem value="medium">中優先度</SelectItem>
              <SelectItem value="low">低優先度</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">日時順</SelectItem>
              <SelectItem value="priority">優先度順</SelectItem>
              <SelectItem value="confidence">AI信頼度順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Queue Items */}
      <div className="space-y-4">
        {queue.map((item) => (
          <Card key={item.id} className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Main Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-slate-900">{item.id}</h3>
                      {getStatusBadge(item.status)}
                      {getPriorityBadge(item.priority)}
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{item.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{item.submittedAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-orange-600">待機: {item.waitTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-1">画像数</p>
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-slate-600" />
                      <span className="text-slate-900">{item.images}枚</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-1">AI検出</p>
                    <span className="text-slate-900">{item.aiDamages}箇所</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-1">AI信頼度</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-600 to-green-700"
                          style={{ width: `${item.aiConfidence * 100}%` }}
                        />
                      </div>
                      <span className="text-slate-900 text-sm">{(item.aiConfidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-1">推定費用</p>
                    <span className="text-slate-900">{item.estimatedCost}</span>
                  </div>
                </div>

                {item.status === 'under_review' && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-900">
                      確認中: <strong>{item.reviewer}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex lg:flex-col gap-2 lg:min-w-[160px]">
                {item.status === 'new' ? (
                  <Button className="flex-1 lg:flex-none bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    レビュー開始
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1 lg:flex-none border-slate-300">
                    詳細表示
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
