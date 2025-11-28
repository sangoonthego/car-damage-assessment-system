import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
  CreditCard,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

export function BillingPage() {
  // Mock data
  const subscriptionPlans = [
    {
      name: 'Free',
      price: 0,
      users: 145,
      features: ['月10回まで評価', 'AI基本機能', 'メールサポート'],
      color: 'blue'
    },
    {
      name: 'Premium',
      price: 9800,
      users: 38,
      features: ['無制限評価', 'AI高度機能', 'PDFエクスポート', '優先サポート'],
      color: 'purple',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 98000,
      users: 5,
      features: ['カスタムAI', '専任サポート', 'API アクセス', 'SLA保証', 'トレーニング'],
      color: 'red'
    }
  ];

  const revenueData = [
    { month: '7月', free: 0, premium: 372400, enterprise: 490000 },
    { month: '8月', free: 0, premium: 392000, enterprise: 490000 },
    { month: '9月', free: 0, premium: 411600, enterprise: 980000 },
    { month: '10月', free: 0, premium: 421400, enterprise: 980000 },
    { month: '11月', free: 0, premium: 392000, enterprise: 980000 },
    { month: '12月', free: 0, premium: 372400, enterprise: 980000 },
    { month: '1月', free: 0, premium: 372400, enterprise: 490000 },
  ];

  const recentPayments = [
    { date: '2025-01-15', user: '株式会社A', plan: 'Enterprise', amount: 98000, status: 'success', method: 'Stripe' },
    { date: '2025-01-14', user: '田中太郎', plan: 'Premium', amount: 9800, status: 'success', method: 'PayPal' },
    { date: '2025-01-13', user: '佐藤花子', plan: 'Premium', amount: 9800, status: 'success', method: 'Stripe' },
    { date: '2025-01-12', user: '鈴木商事', plan: 'Enterprise', amount: 98000, status: 'failed', method: 'Stripe' },
    { date: '2025-01-11', user: '高橋美咲', plan: 'Premium', amount: 9800, status: 'success', method: 'Stripe' },
  ];

  const stats = {
    mrr: 862400,
    growth: 12.5,
    churnRate: 2.3,
    activeSubscriptions: 188
  };

  const getStatusBadge = (status: string) => {
    if (status === 'success') {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">成功</Badge>;
    } else if (status === 'failed') {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">失敗</Badge>;
    } else {
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">保留中</Badge>;
    }
  };

  const getPlanColor = (color: string) => {
    const colorMap = {
      blue: 'from-blue-600 to-blue-700',
      purple: 'from-purple-600 to-purple-700',
      red: 'from-red-600 to-red-700'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const maxRevenue = Math.max(...revenueData.map(d => d.free + d.premium + d.enterprise));

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
          <h1 className="text-slate-900 mb-2">料金 / サブスクリプション</h1>
          <p className="text-slate-600">
            プラン管理と収益分析を行います
          </p>
        </div>

        <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          レポート出力
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+{stats.growth}%</span>
            </div>
          </div>
          <p className="text-slate-500 mb-2">月次経常収益 (MRR)</p>
          <p className="text-slate-900">¥{stats.mrr.toLocaleString()}</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-slate-500 mb-2">アクティブ契約</p>
          <p className="text-slate-900">{stats.activeSubscriptions}件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-slate-500 mb-2">解約率</p>
          <p className="text-slate-900">{stats.churnRate}%</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-slate-500 mb-2">今月の新規契約</p>
          <p className="text-slate-900">23件</p>
        </Card>
      </div>

      {/* Subscription Plans */}
      <div>
        <h2 className="text-slate-900 mb-6">サブスクリプションプラン</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 border-2 ${
                plan.popular ? 'border-purple-500 bg-purple-50/50' : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <Badge className="mb-4 bg-purple-600 text-white hover:bg-purple-600">
                  人気プラン
                </Badge>
              )}
              
              <h3 className="text-slate-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-slate-900">¥{plan.price.toLocaleString()}</span>
                <span className="text-slate-600">/月</span>
              </div>

              <div className="p-4 bg-slate-100 rounded-xl mb-6">
                <p className="text-slate-600 mb-1">契約ユーザー数</p>
                <p className="text-slate-900">{plan.users}人</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? `bg-gradient-to-r ${getPlanColor(plan.color)} text-white` 
                    : 'bg-white border border-slate-300 text-slate-900 hover:bg-slate-50'
                }`}
              >
                プラン編集
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Revenue Chart */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-slate-900">月次収益推移</h3>
        </div>

        <div className="space-y-3 mb-6">
          {revenueData.map((month, index) => {
            const total = month.free + month.premium + month.enterprise;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 w-12">{month.month}</span>
                  <span className="text-slate-900">¥{total.toLocaleString()}</span>
                </div>
                <div className="flex gap-1 h-8">
                  {month.premium > 0 && (
                    <div
                      className="bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center text-white text-xs first:rounded-l last:rounded-r"
                      style={{ width: `${(month.premium / maxRevenue) * 100}%` }}
                    >
                      {month.premium > 300000 && '¥' + (month.premium / 1000).toFixed(0) + 'K'}
                    </div>
                  )}
                  {month.enterprise > 0 && (
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white text-xs first:rounded-l last:rounded-r"
                      style={{ width: `${(month.enterprise / maxRevenue) * 100}%` }}
                    >
                      {month.enterprise > 300000 && '¥' + (month.enterprise / 1000).toFixed(0) + 'K'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full" />
            <span className="text-slate-600">Premium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full" />
            <span className="text-slate-600">Enterprise</span>
          </div>
        </div>
      </Card>

      {/* Recent Payments */}
      <Card className="border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-slate-600" />
            <h3 className="text-slate-900">最近の支払い</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-slate-700">日付</th>
                <th className="px-6 py-3 text-left text-slate-700">ユーザー</th>
                <th className="px-6 py-3 text-left text-slate-700">プラン</th>
                <th className="px-6 py-3 text-left text-slate-700">金額</th>
                <th className="px-6 py-3 text-left text-slate-700">決済方法</th>
                <th className="px-6 py-3 text-left text-slate-700">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentPayments.map((payment, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-600">{payment.date}</td>
                  <td className="px-6 py-4 text-slate-900">{payment.user}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary">{payment.plan}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-900">¥{payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Methods */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-slate-200">
          <h3 className="text-slate-900 mb-4">決済方法設定</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-900">Stripe</p>
                  <p className="text-slate-500 text-sm">クレジットカード決済</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                有効
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-slate-900">PayPal</p>
                  <p className="text-slate-500 text-sm">PayPal決済</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                有効
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-slate-900">銀行振込</p>
                  <p className="text-slate-500 text-sm">日本国内銀行</p>
                </div>
              </div>
              <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-200">
                <XCircle className="w-3 h-3 mr-1" />
                無効
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-slate-200">
          <h3 className="text-slate-900 mb-4">請求設定</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <p className="text-blue-900">次回請求日</p>
              </div>
              <p className="text-blue-700">2025-02-01</p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <p className="text-green-900">自動請求</p>
              </div>
              <p className="text-green-700">毎月1日に自動請求</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white">
              請求設定を変更
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
