import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card } from '../../components/ui/card';
import {
  TrendingUp,
  TrendingDown,
  ScanSearch,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  Activity
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useAdminDashboard } from '../../hooks/useAdmin';

export function DashboardPage() {
  const { data, loading, error } = useAdminDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-slate-500">読み込み中...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-red-500">エラー: {error}</div>
        </div>
      </AdminLayout>
    );
  }

  // Mock data for charts (replace with actual data from API)
  const weeklyData = [
    { name: '月', detect: 12, segment: 8, total: 20 },
    { name: '火', detect: 19, segment: 15, total: 34 },
    { name: '水', detect: 15, segment: 10, total: 25 },
    { name: '木', detect: 25, segment: 18, total: 43 },
    { name: '金', detect: 22, segment: 20, total: 42 },
    { name: '土', detect: 30, segment: 25, total: 55 },
    { name: '日', detect: 28, segment: 22, total: 50 },
  ];

  const statusData = [
    { name: '完了', value: 156, color: '#10b981' },
    { name: '処理中', value: 45, color: '#f59e0b' },
    { name: '保留中', value: 23, color: '#6b7280' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">ダッシュボード</h1>
          <p className="text-slate-600">
            システム全体の統計と最近のアクティビティ
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Assessments */}
          <Card className="p-6 border-slate-200 hover:shadow-lg transition-all hover:border-red-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                <ScanSearch className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">今月の評価数</p>
            <p className="text-3xl font-bold text-slate-900">156<span className="text-lg text-slate-500 ml-1">件</span></p>
          </Card>

          {/* Active Users */}
          <Card className="p-6 border-slate-200 hover:shadow-lg transition-all hover:border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+8%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">アクティブユーザー</p>
            <p className="text-3xl font-bold text-slate-900">1,234<span className="text-lg text-slate-500 ml-1">人</span></p>
          </Card>

          {/* Completion Rate */}
          <Card className="p-6 border-slate-200 hover:shadow-lg transition-all hover:border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+3%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">完了率</p>
            <p className="text-3xl font-bold text-slate-900">98.5<span className="text-lg text-slate-500 ml-1">%</span></p>
          </Card>

          {/* Revenue */}
          <Card className="p-6 border-slate-200 hover:shadow-lg transition-all hover:border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+18%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">総修理費用概算</p>
            <p className="text-3xl font-bold text-slate-900">¥18.5<span className="text-lg text-slate-500 ml-1">M</span></p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Trend */}
          <Card className="p-6 border-slate-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">週間評価数の推移</h3>
              <p className="text-sm text-slate-500">過去7日間の評価トレンド</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#dc2626"
                  strokeWidth={2}
                  fill="url(#colorTotal)"
                  name="合計"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Status Distribution */}
          <Card className="p-6 border-slate-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">ステータス分布</h3>
              <p className="text-sm text-slate-500">評価のステータス別内訳</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="value" fill="#dc2626" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">最近のアクティビティ</h3>
              <p className="text-sm text-slate-500">直近の評価活動</p>
            </div>
            <a href="/admin/assessments" className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium">
              すべて表示 →
            </a>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, user: '田中太郎', action: '新規評価を提出', time: '5分前', status: 'new' },
              { id: 2, user: '佐藤花子', action: '評価を完了', time: '15分前', status: 'completed' },
              { id: 3, user: '鈴木一郎', action: '評価を開始', time: '30分前', status: 'processing' },
              { id: 4, user: '高橋美咲', action: '新規評価を提出', time: '1時間前', status: 'new' },
              { id: 5, user: '伊藤健太', action: '評価を完了', time: '2時間前', status: 'completed' },
            ].map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{activity.user}</p>
                  <p className="text-sm text-slate-500">{activity.action}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">{activity.time}</span>
                  {activity.status === 'completed' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {activity.status === 'processing' && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                  {activity.status === 'new' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
