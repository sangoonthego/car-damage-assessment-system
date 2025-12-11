import { useState } from 'react';
import { AssessorLayout } from '../../components/layout/AssessorLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Clock,
  AlertTriangle,
  User,
  Image as ImageIcon,
  Play,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { useAssessmentQueue } from '../../hooks/useAssessor';

export function AssessmentQueuePage() {
  const { queue, loading, error, claimAssessment } = useAssessmentQueue({ status: 'Pending' });
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  if (loading) {
    return (
      <AssessorLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-slate-500">読み込み中...</div>
        </div>
      </AssessorLayout>
    );
  }

  if (error) {
    return (
      <AssessorLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-red-500">エラー: {error}</div>
        </div>
      </AssessorLayout>
    );
  }

  // Mock data for kanban columns
  const columns = [
    {
      id: 'new',
      title: '新規',
      color: 'blue',
      count: 8,
      items: [
        {
          id: 'ASM-2025-015',
          clientName: '田中太郎',
          submittedAt: '2025-01-15 14:30',
          images: 3,
          aiDamages: 5,
          aiConfidence: 0.92,
          priority: 'high',
          estimatedCost: '¥180,000',
          waitTime: '10分'
        },
        {
          id: 'ASM-2025-014',
          clientName: '佐藤花子',
          submittedAt: '2025-01-15 13:15',
          images: 2,
          aiDamages: 3,
          aiConfidence: 0.88,
          priority: 'medium',
          estimatedCost: '¥120,000',
          waitTime: '1時間25分'
        },
      ]
    },
    {
      id: 'in_progress',
      title: '確認中',
      color: 'orange',
      count: 3,
      items: [
        {
          id: 'ASM-2025-013',
          clientName: '鈴木一郎',
          submittedAt: '2025-01-15 11:45',
          images: 4,
          aiDamages: 7,
          aiConfidence: 0.85,
          priority: 'high',
          estimatedCost: '¥250,000',
          waitTime: '2時間45分',
          reviewer: '山田太郎'
        },
      ]
    },
    {
      id: 'review',
      title: 'レビュー',
      color: 'purple',
      count: 2,
      items: []
    },
    {
      id: 'completed',
      title: '完了',
      color: 'green',
      count: 12,
      items: []
    },
  ];

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      high: { label: '高', className: 'bg-red-100 text-red-700 border-red-200' },
      medium: { label: '中', className: 'bg-orange-100 text-orange-700 border-orange-200' },
      low: { label: '低', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    };
    const config = priorityMap[priority as keyof typeof priorityMap];
    return <Badge className={`${config.className} border`}>{config.label}</Badge>;
  };

  const getColumnColor = (color: string) => {
    const colorMap = {
      blue: 'border-blue-200 bg-blue-50',
      orange: 'border-orange-200 bg-orange-50',
      purple: 'border-purple-200 bg-purple-50',
      green: 'border-green-200 bg-green-50',
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <AssessorLayout>
      <div className="space-y-6">
        {/* Header with Stats */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">評価キュー</h1>
          <p className="text-slate-600">新しい評価リクエストを確認し、レビューを開始します</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">新規</p>
                <p className="text-2xl font-bold text-slate-900">8<span className="text-sm text-slate-500 ml-1">件</span></p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">確認中</p>
                <p className="text-2xl font-bold text-slate-900">3<span className="text-sm text-slate-500 ml-1">件</span></p>
              </div>
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">平均待機時間</p>
                <p className="text-2xl font-bold text-slate-900">2<span className="text-sm text-slate-500 ml-1">時間</span></p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">今日完了</p>
                <p className="text-2xl font-bold text-slate-900">12<span className="text-sm text-slate-500 ml-1">件</span></p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col">
              {/* Column Header */}
              <div className={`p-4 rounded-t-xl border-2 ${getColumnColor(column.color)}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">{column.title}</h3>
                  <Badge className="bg-white border-slate-300">
                    {column.count}
                  </Badge>
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 p-2 bg-slate-100 rounded-b-xl border-2 border-t-0 border-slate-200 min-h-[600px] space-y-3">
                {column.items.map((item) => (
                  <Card
                    key={item.id}
                    className="p-4 border-slate-200 hover:shadow-lg transition-all cursor-move bg-white"
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-900 text-sm">{item.id}</h4>
                          {getPriorityBadge(item.priority)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <User className="w-3 h-3" />
                          <span>{item.clientName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <ImageIcon className="w-3 h-3 text-slate-500" />
                          <span className="text-xs text-slate-500">画像</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">{item.images}枚</p>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">AI検出</p>
                        <p className="text-sm font-semibold text-slate-900">{item.aiDamages}箇所</p>
                      </div>
                    </div>

                    {/* AI Confidence */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500">AI信頼度</span>
                        <span className="font-semibold text-slate-900">{(item.aiConfidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600"
                          style={{ width: `${item.aiConfidence * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <div className="text-xs text-slate-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {item.waitTime}
                      </div>
                      <div className="text-xs font-semibold text-slate-900">
                        {item.estimatedCost}
                      </div>
                    </div>

                    {/* Action Button */}
                    {column.id === 'new' && (
                      <Button
                        size="sm"
                        className="w-full mt-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        開始
                      </Button>
                    )}
                  </Card>
                ))}

                {/* Empty State */}
                {column.items.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-slate-400 text-sm">
                    項目なし
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AssessorLayout>
  );
}
