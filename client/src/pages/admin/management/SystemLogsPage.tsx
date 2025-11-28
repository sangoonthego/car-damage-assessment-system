import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';

export function SystemLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [logType, setLogType] = useState('all');

  // Mock data
  const apiLogs = [
    { timestamp: '2025-01-15 14:30:25', method: 'POST', endpoint: '/api/assessment/detect', user: 'tanaka@example.com', status: 200, duration: 234 },
    { timestamp: '2025-01-15 14:28:12', method: 'POST', endpoint: '/api/assessment/segment', user: 'sato@example.com', status: 200, duration: 456 },
    { timestamp: '2025-01-15 14:25:45', method: 'GET', endpoint: '/api/assessment/history', user: 'suzuki@example.com', status: 200, duration: 45 },
    { timestamp: '2025-01-15 14:22:33', method: 'POST', endpoint: '/api/assessment/detect', user: 'tanaka@example.com', status: 500, duration: 0 },
    { timestamp: '2025-01-15 14:20:11', method: 'PUT', endpoint: '/api/assessment/update', user: 'yamada@example.com', status: 200, duration: 123 },
  ];

  const loginLogs = [
    { timestamp: '2025-01-15 14:30:00', user: 'tanaka@example.com', ip: '192.168.1.100', status: 'success', method: 'Email' },
    { timestamp: '2025-01-15 14:15:22', user: 'sato@example.com', ip: '192.168.1.101', status: 'success', method: 'Google' },
    { timestamp: '2025-01-15 13:45:10', user: 'unknown@example.com', ip: '192.168.1.200', status: 'failed', method: 'Email' },
    { timestamp: '2025-01-15 13:20:55', user: 'suzuki@example.com', ip: '192.168.1.102', status: 'success', method: 'GitHub' },
    { timestamp: '2025-01-15 12:50:30', user: 'yamada@example.com', ip: '192.168.1.103', status: 'success', method: 'Email' },
  ];

  const errorLogs = [
    { timestamp: '2025-01-15 14:22:33', level: 'error', message: 'AI model inference failed', service: 'AI Service', details: 'CUDA out of memory' },
    { timestamp: '2025-01-15 13:45:12', level: 'warning', message: 'High API latency detected', service: 'API Gateway', details: 'Response time > 2s' },
    { timestamp: '2025-01-15 12:30:55', level: 'error', message: 'Database connection timeout', service: 'Database', details: 'Connection pool exhausted' },
    { timestamp: '2025-01-15 11:15:20', level: 'warning', message: 'Rate limit exceeded', service: 'API Gateway', details: 'User: tanaka@example.com' },
    { timestamp: '2025-01-15 10:05:10', level: 'info', message: 'Model training completed', service: 'ML Pipeline', details: 'Accuracy: 94.2%' },
  ];

  const auditLogs = [
    { timestamp: '2025-01-15 14:30:00', user: 'admin@example.com', action: 'User role changed', target: 'tanaka@example.com', details: 'Client → Assessor' },
    { timestamp: '2025-01-15 13:20:00', user: 'admin@example.com', action: 'AI model updated', target: 'YOLOv8', details: 'Confidence threshold: 70% → 75%' },
    { timestamp: '2025-01-15 12:15:00', user: 'admin@example.com', action: 'User deleted', target: 'old_user@example.com', details: 'Account closed' },
    { timestamp: '2025-01-15 11:00:00', user: 'admin@example.com', action: 'Permission granted', target: 'sato@example.com', details: 'AI Review Mode' },
    { timestamp: '2025-01-15 10:30:00', user: 'admin@example.com', action: 'Settings changed', target: 'System', details: 'Auto-approval enabled' },
  ];

  const getStatusBadge = (status: number | string) => {
    if (status === 200 || status === 'success') {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{status}</Badge>;
    } else if (status === 'failed') {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{status}</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{status}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    const levelMap = {
      error: { label: 'ERROR', color: 'bg-red-100 text-red-700', icon: XCircle },
      warning: { label: 'WARNING', color: 'bg-orange-100 text-orange-700', icon: AlertCircle },
      info: { label: 'INFO', color: 'bg-blue-100 text-blue-700', icon: Info },
    };
    const config = levelMap[level as keyof typeof levelMap];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} hover:${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

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
          <h1 className="text-slate-900 mb-2">システムログ</h1>
          <p className="text-slate-600">
            API、ログイン、エラー、監査ログを確認します
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            更新
          </Button>
          <Button variant="outline" className="border-slate-300">
            <Download className="w-4 h-4 mr-2" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">24時間API呼び出し</p>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-slate-900">1,234件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">ログイン試行</p>
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-slate-900">456件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">エラー発生</p>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-slate-900">12件</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">監査イベント</p>
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-slate-900">34件</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="ログを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={logType} onValueChange={setLogType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのログ</SelectItem>
              <SelectItem value="api">APIログ</SelectItem>
              <SelectItem value="login">ログインログ</SelectItem>
              <SelectItem value="error">エラーログ</SelectItem>
              <SelectItem value="audit">監査ログ</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="24h">
            <SelectTrigger className="w-full md:w-[180px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">過去1時間</SelectItem>
              <SelectItem value="24h">過去24時間</SelectItem>
              <SelectItem value="7d">過去7日間</SelectItem>
              <SelectItem value="30d">過去30日間</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Logs Tabs */}
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api">APIログ</TabsTrigger>
          <TabsTrigger value="login">ログインログ</TabsTrigger>
          <TabsTrigger value="error">エラーログ</TabsTrigger>
          <TabsTrigger value="audit">監査ログ</TabsTrigger>
        </TabsList>

        {/* API Logs */}
        <TabsContent value="api">
          <Card className="border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-slate-700">タイムスタンプ</th>
                    <th className="px-6 py-3 text-left text-slate-700">メソッド</th>
                    <th className="px-6 py-3 text-left text-slate-700">エンドポイント</th>
                    <th className="px-6 py-3 text-left text-slate-700">ユーザー</th>
                    <th className="px-6 py-3 text-left text-slate-700">ステータス</th>
                    <th className="px-6 py-3 text-left text-slate-700">処理時間</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {apiLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-600 text-sm">{log.timestamp}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">{log.method}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm text-slate-900">{log.endpoint}</code>
                      </td>
                      <td className="px-6 py-4 text-slate-900 text-sm">{log.user}</td>
                      <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                      <td className="px-6 py-4 text-slate-900">{log.duration}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Login Logs */}
        <TabsContent value="login">
          <Card className="border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-slate-700">タイムスタンプ</th>
                    <th className="px-6 py-3 text-left text-slate-700">ユーザー</th>
                    <th className="px-6 py-3 text-left text-slate-700">IPアドレス</th>
                    <th className="px-6 py-3 text-left text-slate-700">認証方法</th>
                    <th className="px-6 py-3 text-left text-slate-700">ステータス</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loginLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-600 text-sm">{log.timestamp}</td>
                      <td className="px-6 py-4 text-slate-900">{log.user}</td>
                      <td className="px-6 py-4">
                        <code className="text-sm text-slate-600">{log.ip}</code>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">{log.method}</Badge>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Error Logs */}
        <TabsContent value="error">
          <Card className="border-slate-200">
            <div className="divide-y divide-slate-200">
              {errorLogs.map((log, index) => (
                <div key={index} className="p-6 hover:bg-slate-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getLevelBadge(log.level)}
                      <p className="text-slate-600 text-sm">{log.timestamp}</p>
                    </div>
                    <Badge variant="secondary">{log.service}</Badge>
                  </div>
                  <p className="text-slate-900 mb-2">{log.message}</p>
                  <p className="text-slate-600 text-sm">{log.details}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Audit Logs */}
        <TabsContent value="audit">
          <Card className="border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-slate-700">タイムスタンプ</th>
                    <th className="px-6 py-3 text-left text-slate-700">実行者</th>
                    <th className="px-6 py-3 text-left text-slate-700">アクション</th>
                    <th className="px-6 py-3 text-left text-slate-700">対象</th>
                    <th className="px-6 py-3 text-left text-slate-700">詳細</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {auditLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-600 text-sm">{log.timestamp}</td>
                      <td className="px-6 py-4 text-slate-900">{log.user}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">{log.action}</Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-900">{log.target}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
