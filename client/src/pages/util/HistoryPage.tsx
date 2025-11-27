import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  ScanSearch,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock history data
  const historyData = [
    {
      id: 1,
      date: '2025-01-15 14:30',
      type: 'detect',
      imageName: 'car_front_damage.jpg',
      damages: 3,
      confidence: 0.95,
      cost: '¥120,000',
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-01-15 12:15',
      type: 'segment',
      imageName: 'car_side_scratches.jpg',
      damages: 5,
      confidence: 0.89,
      cost: '¥250,000',
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-01-14 16:45',
      type: 'detect',
      imageName: 'car_rear_dent.jpg',
      damages: 2,
      confidence: 0.92,
      cost: '¥80,000',
      status: 'completed'
    },
    {
      id: 4,
      date: '2025-01-14 10:20',
      type: 'segment',
      imageName: 'car_bumper_damage.jpg',
      damages: 4,
      confidence: 0.88,
      cost: '¥180,000',
      status: 'completed'
    },
    {
      id: 5,
      date: '2025-01-13 15:30',
      type: 'detect',
      imageName: 'car_hood_scratch.jpg',
      damages: 1,
      confidence: 0.97,
      cost: '¥50,000',
      status: 'completed'
    },
    {
      id: 6,
      date: '2025-01-13 09:00',
      type: 'segment',
      imageName: 'car_door_damage.jpg',
      damages: 3,
      confidence: 0.91,
      cost: '¥150,000',
      status: 'completed'
    },
  ];

  const filteredHistory = historyData.filter((item) => {
    const matchesSearch = item.imageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">評価履歴</h1>
        <p className="text-slate-600">
          過去に実行した車両損傷評価の履歴を確認できます
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="画像名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="detect">物体検出</SelectItem>
              <SelectItem value="segment">セグメンテーション</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-slate-300">
            <Calendar className="w-4 h-4 mr-2" />
            日付選択
          </Button>
        </div>
      </Card>

      {/* History Table */}
      <Card className="border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-slate-700">日時</th>
                <th className="px-6 py-4 text-left text-slate-700">画像名</th>
                <th className="px-6 py-4 text-left text-slate-700">タイプ</th>
                <th className="px-6 py-4 text-left text-slate-700">損傷数</th>
                <th className="px-6 py-4 text-left text-slate-700">信頼度</th>
                <th className="px-6 py-4 text-left text-slate-700">修理費用</th>
                <th className="px-6 py-4 text-left text-slate-700">ステータス</th>
                <th className="px-6 py-4 text-left text-slate-700">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-600">
                    {item.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.type === 'detect' ? 'bg-red-50' : 'bg-blue-50'
                      }`}>
                        <ScanSearch className={`w-4 h-4 ${
                          item.type === 'detect' ? 'text-red-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <span className="text-slate-900">{item.imageName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={item.type === 'detect' ? 'default' : 'secondary'}
                      className={item.type === 'detect' 
                        ? 'bg-red-100 text-red-700 hover:bg-red-100' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                      }
                    >
                      {item.type === 'detect' ? '物体検出' : 'セグメンテーション'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-900">
                    {item.damages}箇所
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-600 to-red-700"
                          style={{ width: `${item.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-slate-900 min-w-[3rem]">
                        {(item.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">
                    {item.cost}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {item.status === 'completed' ? '完了' : '処理中'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <ScanSearch className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">該当する評価履歴がありません</p>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {filteredHistory.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-slate-600">
            全{filteredHistory.length}件中 1-{filteredHistory.length}件を表示
          </p>
          <div className="flex gap-2">
            <Button variant="outline" disabled className="border-slate-300">
              前へ
            </Button>
            <Button variant="outline" disabled className="border-slate-300">
              次へ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
