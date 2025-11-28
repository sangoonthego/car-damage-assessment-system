import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  Target,
  Activity,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

export function AnalyticsDashboardPage() {
  // Mock data
  const stats = {
    totalCases: 1234,
    growth: 12.5,
    totalRevenue: 15680000,
    revenueGrowth: 8.3,
    activeUsers: 456,
    userGrowth: 15.2,
    avgProcessingTime: 18,
    timeImprovement: -5.3
  };

  const casesPerDay = [
    { date: '01/09', cases: 45, ai: 38, manual: 7 },
    { date: '01/10', cases: 52, ai: 44, manual: 8 },
    { date: '01/11', cases: 48, ai: 40, manual: 8 },
    { date: '01/12', cases: 61, ai: 52, manual: 9 },
    { date: '01/13', cases: 55, ai: 47, manual: 8 },
    { date: '01/14', cases: 68, ai: 58, manual: 10 },
    { date: '01/15', cases: 72, ai: 62, manual: 10 },
  ];

  const damageDistribution = [
    { type: 'バンパー損傷', count: 342, percentage: 27.7, color: 'bg-red-500' },
    { type: 'ヘッドライト破損', count: 278, percentage: 22.5, color: 'bg-orange-500' },
    { type: 'ドア凹み', count: 245, percentage: 19.9, color: 'bg-yellow-500' },
    { type: '塗装剥がれ', count: 198, percentage: 16.0, color: 'bg-green-500' },
    { type: 'ボンネット損傷', count: 171, percentage: 13.9, color: 'bg-blue-500' },
  ];

  const aiAccuracyOverTime = [
    { month: '7月', accuracy: 89.2 },
    { month: '8月', accuracy: 90.5 },
    { month: '9月', accuracy: 91.8 },
    { month: '10月', accuracy: 92.4 },
    { month: '11月', accuracy: 93.1 },
    { month: '12月', accuracy: 93.8 },
    { month: '1月', accuracy: 94.2 },
  ];

  const assessorPerformance = [
    { name: '山田太郎', cases: 312, accuracy: 96.5, avgTime: 15, revenue: 4680000 },
    { name: '佐藤花子', cases: 289, accuracy: 95.2, avgTime: 17, revenue: 4335000 },
    { name: '鈴木一郎', cases: 256, accuracy: 94.8, avgTime: 16, revenue: 3840000 },
    { name: '高橋美咲', cases: 234, accuracy: 95.8, avgTime: 18, revenue: 3510000 },
    { name: '田中次郎', cases: 143, accuracy: 93.2, avgTime: 20, revenue: 2145000 },
  ];

  const maxCases = Math.max(...casesPerDay.map(d => d.cases));
  const maxAccuracy = Math.max(...aiAccuracyOverTime.map(d => d.accuracy));

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
          <h1 className="text-slate-900 mb-2">分析ダッシュボード</h1>
          <p className="text-slate-600">
            システム全体のパフォーマンスと傾向を確認します
          </p>
        </div>

        <Select defaultValue="30days">
          <SelectTrigger className="w-[180px]">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">過去7日間</SelectItem>
            <SelectItem value="30days">過去30日間</SelectItem>
            <SelectItem value="90days">過去90日間</SelectItem>
            <SelectItem value="year">過去1年</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+{stats.growth}%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-2">総評価数</p>
          <p className="text-slate-900">{stats.totalCases.toLocaleString()}件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+{stats.revenueGrowth}%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-2">総収益</p>
          <p className="text-slate-900">¥{stats.totalRevenue.toLocaleString()}</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+{stats.userGrowth}%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-2">アクティブユーザー</p>
          <p className="text-slate-900">{stats.activeUsers}人</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">{Math.abs(stats.timeImprovement)}%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-2">平均処理時間</p>
          <p className="text-slate-900">{stats.avgProcessingTime}分</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Cases Per Day Chart */}
        <Card className="p-8 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-slate-900">日別評価数</h3>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                <span className="text-slate-600">AI評価</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-600 rounded-full" />
                <span className="text-slate-600">手動評価</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {casesPerDay.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 w-16">{day.date}</span>
                  <span className="text-slate-900">{day.cases}件</span>
                </div>
                <div className="flex gap-1 h-8">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-l flex items-center justify-center text-white text-xs"
                    style={{ width: `${(day.ai / maxCases) * 100}%` }}
                  >
                    {day.ai}
                  </div>
                  <div
                    className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-r flex items-center justify-center text-white text-xs"
                    style={{ width: `${(day.manual / maxCases) * 100}%` }}
                  >
                    {day.manual}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Damage Distribution */}
        <Card className="p-8 border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-slate-900">損傷タイプ分布</h3>
          </div>

          <div className="space-y-4">
            {damageDistribution.map((damage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${damage.color} rounded`} />
                    <span className="text-slate-900">{damage.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600">{damage.count}件</span>
                    <span className="text-slate-900 w-12 text-right">{damage.percentage}%</span>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${damage.color}`}
                    style={{ width: `${damage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <p className="text-slate-600 text-sm mb-1">最も多い損傷タイプ</p>
            <p className="text-slate-900">
              {damageDistribution[0].type} ({damageDistribution[0].percentage}%)
            </p>
          </div>
        </Card>
      </div>

      {/* AI Accuracy Over Time */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-slate-900">AI精度の推移</h3>
        </div>

        <div className="flex items-end gap-4 h-64">
          {aiAccuracyOverTime.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '100%' }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-green-600 to-green-500 rounded-t-lg flex items-end justify-center pb-2"
                  style={{ height: `${(month.accuracy / maxAccuracy) * 100}%` }}
                >
                  <span className="text-white text-xs">{month.accuracy}%</span>
                </div>
              </div>
              <span className="text-slate-600 text-sm">{month.month}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-green-900 mb-1">現在の精度</p>
            <p className="text-green-900">{aiAccuracyOverTime[aiAccuracyOverTime.length - 1].accuracy}%</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-900 mb-1">6ヶ月前</p>
            <p className="text-blue-900">{aiAccuracyOverTime[0].accuracy}%</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <p className="text-purple-900 mb-1">改善率</p>
            <p className="text-purple-900">
              +{(aiAccuracyOverTime[aiAccuracyOverTime.length - 1].accuracy - aiAccuracyOverTime[0].accuracy).toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      {/* Assessor Performance */}
      <Card className="border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-slate-600" />
            <h3 className="text-slate-900">Assessorパフォーマンス</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-slate-700">順位</th>
                <th className="px-6 py-3 text-left text-slate-700">名前</th>
                <th className="px-6 py-3 text-left text-slate-700">評価数</th>
                <th className="px-6 py-3 text-left text-slate-700">精度</th>
                <th className="px-6 py-3 text-left text-slate-700">平均時間</th>
                <th className="px-6 py-3 text-left text-slate-700">貢献収益</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {assessorPerformance.map((assessor, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{assessor.name}</td>
                  <td className="px-6 py-4 text-slate-900">{assessor.cases}件</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-600 to-green-700"
                          style={{ width: `${assessor.accuracy}%` }}
                        />
                      </div>
                      <span className="text-slate-900 text-sm">{assessor.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{assessor.avgTime}分</td>
                  <td className="px-6 py-4 text-slate-900">¥{assessor.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
