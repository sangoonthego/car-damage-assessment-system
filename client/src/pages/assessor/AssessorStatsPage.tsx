import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Target,
  Award,
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export function AssessorStatsPage() {
  // Mock data
  const stats = {
    totalCases: 234,
    completedToday: 12,
    averageTime: 18,
    accuracy: 94.2,
    aiAgreement: 87.5,
    weeklyTrend: '+12%'
  };

  const recentActivity = [
    { date: '2025-01-15', cases: 12, avgTime: 15, accuracy: 95 },
    { date: '2025-01-14', cases: 15, avgTime: 18, accuracy: 93 },
    { date: '2025-01-13', cases: 10, avgTime: 20, accuracy: 96 },
    { date: '2025-01-12', cases: 14, avgTime: 17, accuracy: 92 },
    { date: '2025-01-11', cases: 11, avgTime: 19, accuracy: 94 },
    { date: '2025-01-10', cases: 13, avgTime: 16, accuracy: 95 },
    { date: '2025-01-09', cases: 9, avgTime: 22, accuracy: 91 },
  ];

  const damageTypes = [
    { type: 'バンパー損傷', count: 56, accuracy: 96 },
    { type: 'ヘッドライト破損', count: 42, accuracy: 94 },
    { type: 'ドア凹み', count: 38, accuracy: 92 },
    { type: '塗装剥がれ', count: 34, accuracy: 95 },
    { type: 'ボンネット損傷', count: 28, accuracy: 91 },
  ];

  const leaderboard = [
    { rank: 1, name: '山田太郎', cases: 312, accuracy: 96.5, avgTime: 15 },
    { rank: 2, name: 'あなた', cases: 234, accuracy: 94.2, avgTime: 18, isCurrentUser: true },
    { rank: 3, name: '佐藤花子', cases: 189, accuracy: 93.8, avgTime: 20 },
    { rank: 4, name: '鈴木一郎', cases: 156, accuracy: 95.1, avgTime: 19 },
    { rank: 5, name: '高橋美咲', cases: 142, accuracy: 92.7, avgTime: 22 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-block mb-3">
            <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
              Assessor機能
            </Badge>
          </div>
          <h1 className="text-slate-900 mb-2">統計 / KPI</h1>
          <p className="text-slate-600">
            あなたのパフォーマンスとAI精度を確認します
          </p>
        </div>

        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px]">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">今日</SelectItem>
            <SelectItem value="7days">過去7日間</SelectItem>
            <SelectItem value="30days">過去30日間</SelectItem>
            <SelectItem value="all">全期間</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-slate-500 mb-2">総評価数</p>
          <p className="text-slate-900">{stats.totalCases}件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-slate-500 mb-2">今日完了</p>
          <p className="text-slate-900">{stats.completedToday}件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-slate-500 mb-2">平均時間</p>
          <p className="text-slate-900">{stats.averageTime}分</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-slate-500 mb-2">精度</p>
          <p className="text-slate-900">{stats.accuracy}%</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-slate-500 mb-2">AI一致率</p>
          <p className="text-slate-900">{stats.aiAgreement}%</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-slate-500 mb-2">週間成長</p>
          <p className="text-green-600">{stats.weeklyTrend}</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity Chart */}
        <Card className="p-8 border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-slate-900">最近のアクティビティ</h3>
          </div>

          <div className="space-y-3">
            {recentActivity.map((day, index) => (
              <div key={day.date} className="flex items-center gap-4">
                <p className="text-slate-600 w-24 text-sm">{day.date.substring(5)}</p>
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg text-center">
                    <p className="text-blue-900 text-sm">{day.cases}件</p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg text-center">
                    <p className="text-orange-900 text-sm">{day.avgTime}分</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg text-center">
                    <p className="text-green-900 text-sm">{day.accuracy}%</p>
                  </div>
                </div>
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-700"
                    style={{ width: `${(day.cases / 15) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Damage Type Breakdown */}
        <Card className="p-8 border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-slate-900">損傷タイプ別精度</h3>
          </div>

          <div className="space-y-4">
            {damageTypes.map((damage, index) => (
              <div key={damage.type}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center text-white text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-slate-900">{damage.type}</p>
                      <p className="text-slate-500 text-sm">{damage.count}件</p>
                    </div>
                  </div>
                  <p className="text-slate-900">{damage.accuracy}%</p>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-700"
                    style={{ width: `${damage.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="text-slate-900">Assessorランキング</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-slate-700">順位</th>
                <th className="px-4 py-3 text-left text-slate-700">名前</th>
                <th className="px-4 py-3 text-left text-slate-700">評価数</th>
                <th className="px-4 py-3 text-left text-slate-700">精度</th>
                <th className="px-4 py-3 text-left text-slate-700">平均時間</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {leaderboard.map((assessor) => (
                <tr 
                  key={assessor.rank}
                  className={assessor.isCurrentUser ? 'bg-blue-50' : 'hover:bg-slate-50'}
                >
                  <td className="px-4 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      assessor.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                      assessor.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                      assessor.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {assessor.rank}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <p className={assessor.isCurrentUser ? 'text-blue-900' : 'text-slate-900'}>
                        {assessor.name}
                      </p>
                      {assessor.isCurrentUser && (
                        <Badge className="bg-blue-600 text-white hover:bg-blue-600">You</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-900">{assessor.cases}件</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-600 to-green-700"
                          style={{ width: `${assessor.accuracy}%` }}
                        />
                      </div>
                      <span className="text-slate-900 text-sm">{assessor.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-900">{assessor.avgTime}分</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Performance Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h4 className="text-green-900">強み</h4>
          </div>
          <p className="text-green-700 mb-2">バンパー損傷の評価精度が高い (96%)</p>
          <p className="text-green-600 text-sm">この分野でトップ3にランクイン</p>
        </Card>

        <Card className="p-6 border-orange-200 bg-orange-50">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h4 className="text-orange-900">改善の余地</h4>
          </div>
          <p className="text-orange-700 mb-2">ボンネット損傷の評価時間を短縮可能</p>
          <p className="text-orange-600 text-sm">平均より3分長い</p>
        </Card>

        <Card className="p-6 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-5 h-5 text-blue-600" />
            <h4 className="text-blue-900">目標</h4>
          </div>
          <p className="text-blue-700 mb-2">今月の目標まであと15件</p>
          <p className="text-blue-600 text-sm">目標達成まで93%</p>
        </Card>
      </div>
    </div>
  );
}
