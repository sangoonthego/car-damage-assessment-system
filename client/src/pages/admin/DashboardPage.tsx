import { Card } from '../../components/ui/card';
import { 
  TrendingUp, 
  TrendingDown,
  ScanSearch,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DashboardPage() {
  // Mock data for charts
  const weeklyData = [
    { name: '月', detect: 12, segment: 8 },
    { name: '火', detect: 19, segment: 15 },
    { name: '水', detect: 15, segment: 10 },
    { name: '木', detect: 25, segment: 18 },
    { name: '金', detect: 22, segment: 20 },
    { name: '土', detect: 30, segment: 25 },
    { name: '日', detect: 28, segment: 22 },
  ];

  const damageTypeData = [
    { name: '擦り傷', value: 45, color: '#dc2626' },
    { name: 'へこみ', value: 30, color: '#2563eb' },
    { name: 'ガラス破損', value: 25, color: '#16a34a' },
  ];

  const recentAssessments = [
    { id: 1, type: 'detect', damages: 3, cost: '¥120,000', status: 'completed', time: '2時間前' },
    { id: 2, type: 'segment', damages: 5, cost: '¥250,000', status: 'completed', time: '4時間前' },
    { id: 3, type: 'detect', damages: 2, cost: '¥80,000', status: 'completed', time: '6時間前' },
    { id: 4, type: 'segment', damages: 4, cost: '¥180,000', status: 'processing', time: '8時間前' },
    { id: 5, type: 'detect', damages: 1, cost: '¥50,000', status: 'completed', time: '1日前' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">ダッシュボード</h1>
        <p className="text-slate-600">
          車両損傷評価システムの統計と最近のアクティビティ
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <ScanSearch className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-1">今月の評価数</p>
          <p className="text-slate-900">156件</p>
        </Card>

        <Card className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-1">完了率</p>
          <p className="text-slate-900">98.5%</p>
        </Card>

        <Card className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span>-15%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-1">平均処理時間</p>
          <p className="text-slate-900">2.3秒</p>
        </Card>

        <Card className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+18%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-1">総修理費用概算</p>
          <p className="text-slate-900">¥18.5M</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Assessment Chart */}
        <Card className="p-6 border-slate-200">
          <h3 className="text-slate-900 mb-6">週間評価数の推移</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="detect" 
                stroke="#dc2626" 
                strokeWidth={2}
                name="物体検出"
              />
              <Line 
                type="monotone" 
                dataKey="segment" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="セグメンテーション"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Damage Type Distribution */}
        <Card className="p-6 border-slate-200">
          <h3 className="text-slate-900 mb-6">損傷タイプの分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={damageTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {damageTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Assessments */}
      <Card className="p-6 border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-900">最近の評価</h3>
          <a href="/history" className="text-red-600 hover:text-red-700 transition-colors">
            すべて表示 →
          </a>
        </div>

        <div className="space-y-4">
          {recentAssessments.map((assessment) => (
            <div
              key={assessment.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  assessment.type === 'detect' ? 'bg-red-50' : 'bg-blue-50'
                }`}>
                  <ScanSearch className={`w-5 h-5 ${
                    assessment.type === 'detect' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="text-slate-900">
                    {assessment.type === 'detect' ? '物体検出' : 'セグメンテーション'}
                  </p>
                  <p className="text-slate-500">
                    {assessment.damages}箇所 • {assessment.cost} • {assessment.time}
                  </p>
                </div>
              </div>
              
              {assessment.status === 'completed' ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>完了</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg border border-orange-200">
                  <Clock className="w-4 h-4" />
                  <span>処理中</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
