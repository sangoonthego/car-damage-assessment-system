import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Bell,
  HelpCircle,
  Mail,
  Phone
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';

export function CMSPage() {
  const [isCreateFAQOpen, setIsCreateFAQOpen] = useState(false);
  const [isCreateNotificationOpen, setIsCreateNotificationOpen] = useState(false);

  // Mock data
  const faqItems = [
    {
      id: 1,
      question: '評価にはどのくらい時間がかかりますか？',
      answer: 'AIによる自動評価は通常2-3分で完了します。Assessorによる確認が必要な場合は、24時間以内に結果をお知らせします。',
      category: '評価プロセス',
      published: true,
      views: 1234
    },
    {
      id: 2,
      question: 'どのような損傷を検出できますか？',
      answer: 'バンパー損傷、ヘッドライト破損、ドア凹み、塗装剥がれ、ボンネット損傷など、車両の外装損傷を幅広く検出できます。',
      category: 'AI機能',
      published: true,
      views: 987
    },
    {
      id: 3,
      question: 'プランの変更はいつでも可能ですか？',
      answer: 'はい、いつでもプランの変更が可能です。アップグレードは即座に反映され、ダウングレードは次回請求日から適用されます。',
      category: '料金プラン',
      published: true,
      views: 654
    },
  ];

  const pages = [
    { id: 1, title: 'About Us', slug: '/about', lastUpdated: '2025-01-10', published: true },
    { id: 2, title: 'Contact', slug: '/contact', lastUpdated: '2025-01-08', published: true },
    { id: 3, title: 'Privacy Policy', slug: '/privacy', lastUpdated: '2024-12-15', published: true },
    { id: 4, title: 'Terms of Service', slug: '/terms', lastUpdated: '2024-12-15', published: true },
  ];

  const notifications = [
    {
      id: 1,
      title: 'システムメンテナンスのお知らせ',
      message: '2025年1月20日 2:00-4:00にシステムメンテナンスを実施します。',
      type: 'warning',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      active: true,
      targetUsers: 'all'
    },
    {
      id: 2,
      title: '新機能リリース',
      message: 'AI評価モードが追加されました。Assessorの皆様、ぜひお試しください。',
      type: 'info',
      startDate: '2025-01-10',
      endDate: '2025-01-17',
      active: true,
      targetUsers: 'assessor'
    },
    {
      id: 3,
      title: 'Premium プランキャンペーン',
      message: '今月限定！Premium プランが20%オフ。',
      type: 'success',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      active: true,
      targetUsers: 'client'
    },
  ];

  const getTypeBadge = (type: string) => {
    const typeMap = {
      warning: { label: '警告', color: 'bg-orange-100 text-orange-700' },
      info: { label: '情報', color: 'bg-blue-100 text-blue-700' },
      success: { label: '成功', color: 'bg-green-100 text-green-700' },
    };
    const config = typeMap[type as keyof typeof typeMap];
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-block mb-3">
          <Badge className="bg-red-50 text-red-700 border border-red-100">
            Admin機能
          </Badge>
        </div>
        <h1 className="text-slate-900 mb-2">CMS / コンテンツ管理</h1>
        <p className="text-slate-600">
          FAQ、ページ、通知を管理します
        </p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="pages">ページ</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">{faqItems.length}件のFAQアイテム</p>
            
            <Dialog open={isCreateFAQOpen} onOpenChange={setIsCreateFAQOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  FAQ追加
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>新しいFAQを追加</DialogTitle>
                  <DialogDescription>
                    よくある質問と回答を入力してください
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">カテゴリ</Label>
                    <select id="category" className="w-full p-2 border border-slate-300 rounded-lg">
                      <option>評価プロセス</option>
                      <option>AI機能</option>
                      <option>料金プラン</option>
                      <option>アカウント</option>
                      <option>技術サポート</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question">質問</Label>
                    <Input id="question" placeholder="例: 評価にはどのくらい時間がかかりますか？" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="answer">回答</Label>
                    <Textarea
                      id="answer"
                      placeholder="詳しい回答を入力してください..."
                      rows={5}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateFAQOpen(false)}>
                    キャンセル
                  </Button>
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    保存
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq) => (
              <Card key={faq.id} className="p-6 border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary">{faq.category}</Badge>
                      {faq.published ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">公開中</Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">下書き</Badge>
                      )}
                    </div>
                    <h3 className="text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{faq.views}回表示</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">{pages.length}ページ</p>
            
            <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              ページ追加
            </Button>
          </div>

          <Card className="border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-slate-700">タイトル</th>
                  <th className="px-6 py-3 text-left text-slate-700">スラッグ</th>
                  <th className="px-6 py-3 text-left text-slate-700">最終更新</th>
                  <th className="px-6 py-3 text-left text-slate-700">ステータス</th>
                  <th className="px-6 py-3 text-left text-slate-700">アクション</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-900">{page.title}</td>
                    <td className="px-6 py-4">
                      <code className="text-sm text-slate-600">{page.slug}</code>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{page.lastUpdated}</td>
                    <td className="px-6 py-4">
                      {page.published ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">公開中</Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">下書き</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Contact Info Card */}
          <Card className="p-8 border-slate-200">
            <h3 className="text-slate-900 mb-6">お問い合わせ情報</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input id="email" defaultValue="support@carassess.ai" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input id="phone" defaultValue="03-1234-5678" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Textarea
                  id="address"
                  defaultValue="〒100-0001&#10;東京都千代田区千代田1-1-1"
                  rows={3}
                />
              </div>

              <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                情報を更新
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">{notifications.length}件の通知</p>
            
            <Dialog open={isCreateNotificationOpen} onOpenChange={setIsCreateNotificationOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  通知追加
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>新しい通知を作成</DialogTitle>
                  <DialogDescription>
                    システム通知を作成して、ユーザーに情報を伝えます
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="notifType">通知タイプ</Label>
                    <select id="notifType" className="w-full p-2 border border-slate-300 rounded-lg">
                      <option value="info">情報</option>
                      <option value="warning">警告</option>
                      <option value="success">成功</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notifTitle">タイトル</Label>
                    <Input id="notifTitle" placeholder="通知のタイトル" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notifMessage">メッセージ</Label>
                    <Textarea
                      id="notifMessage"
                      placeholder="通知の内容を入力..."
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">開始日</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">終了日</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetUsers">対象ユーザー</Label>
                    <select id="targetUsers" className="w-full p-2 border border-slate-300 rounded-lg">
                      <option value="all">全ユーザー</option>
                      <option value="client">Client のみ</option>
                      <option value="assessor">Assessor のみ</option>
                      <option value="admin">Admin のみ</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateNotificationOpen(false)}>
                    キャンセル
                  </Button>
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    作成
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className="p-6 border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Bell className="w-5 h-5 text-slate-600" />
                      {getTypeBadge(notification.type)}
                      {notification.active ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">アクティブ</Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">非アクティブ</Badge>
                      )}
                    </div>
                    <h3 className="text-slate-900 mb-2">{notification.title}</h3>
                    <p className="text-slate-600 mb-4">{notification.message}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <span>対象: {
                        notification.targetUsers === 'all' ? '全ユーザー' :
                        notification.targetUsers === 'client' ? 'Client' :
                        notification.targetUsers === 'assessor' ? 'Assessor' : 'Admin'
                      }</span>
                      <span>期間: {notification.startDate} 〜 {notification.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
