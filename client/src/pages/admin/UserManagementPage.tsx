import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Mail,
  Shield,
  MoreVertical,
  Filter
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';

export function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data
  const users = [
    {
      id: '1',
      name: '田中太郎',
      email: 'tanaka@example.com',
      role: 'client',
      status: 'active',
      assessments: 45,
      joinedAt: '2024-06-15',
      lastActive: '2時間前'
    },
    {
      id: '2',
      name: '山田太郎',
      email: 'yamada@example.com',
      role: 'assessor',
      status: 'active',
      assessments: 234,
      joinedAt: '2024-01-10',
      lastActive: '5分前'
    },
    {
      id: '3',
      name: '佐藤花子',
      email: 'sato@example.com',
      role: 'assessor',
      status: 'active',
      assessments: 189,
      joinedAt: '2024-03-22',
      lastActive: '30分前'
    },
    {
      id: '4',
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      role: 'client',
      status: 'locked',
      assessments: 12,
      joinedAt: '2024-11-05',
      lastActive: '3日前'
    },
    {
      id: '5',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      assessments: 0,
      joinedAt: '2024-01-01',
      lastActive: '1分前'
    },
  ];

  const getRoleBadge = (role: string) => {
    const roleMap = {
      client: { label: 'Client', color: 'bg-blue-100 text-blue-700' },
      assessor: { label: 'Assessor', color: 'bg-purple-100 text-purple-700' },
      admin: { label: 'Admin', color: 'bg-red-100 text-red-700' },
    };
    const config = roleMap[role as keyof typeof roleMap];
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: 'アクティブ', color: 'bg-green-100 text-green-700' },
      locked: { label: 'ロック中', color: 'bg-red-100 text-red-700' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
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
          <h1 className="text-slate-900 mb-2">ユーザー管理</h1>
          <p className="text-slate-600">
            システムユーザーの作成、編集、削除を行います
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              新規ユーザー作成
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規ユーザー作成</DialogTitle>
              <DialogDescription>
                新しいユーザーアカウントを作成します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">氏名</Label>
                <Input id="name" placeholder="山田太郎" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" placeholder="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">役割</Label>
                <Select defaultValue="client">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="assessor">Assessor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">初期パスワード</Label>
                <Input id="password" type="password" placeholder="********" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                キャンセル
              </Button>
              <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                作成
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <p className="text-slate-500 mb-2">総ユーザー数</p>
          <p className="text-slate-900">{users.length}人</p>
        </Card>
        <Card className="p-6 border-slate-200">
          <p className="text-slate-500 mb-2">Client</p>
          <p className="text-slate-900">{users.filter(u => u.role === 'client').length}人</p>
        </Card>
        <Card className="p-6 border-slate-200">
          <p className="text-slate-500 mb-2">Assessor</p>
          <p className="text-slate-900">{users.filter(u => u.role === 'assessor').length}人</p>
        </Card>
        <Card className="p-6 border-slate-200">
          <p className="text-slate-500 mb-2">アクティブユーザー</p>
          <p className="text-slate-900">{users.filter(u => u.status === 'active').length}人</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="名前、メールアドレスで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての役割</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="assessor">Assessor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-slate-700">ユーザー</th>
                <th className="px-6 py-4 text-left text-slate-700">役割</th>
                <th className="px-6 py-4 text-left text-slate-700">ステータス</th>
                <th className="px-6 py-4 text-left text-slate-700">評価数</th>
                <th className="px-6 py-4 text-left text-slate-700">登録日</th>
                <th className="px-6 py-4 text-left text-slate-700">最終アクセス</th>
                <th className="px-6 py-4 text-left text-slate-700">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white">
                        {user.name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-slate-900">{user.name}</p>
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 text-slate-900">
                    {user.assessments}件
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {user.joinedAt}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>アクション</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          編集
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          役割変更
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          パスワードリセット
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === 'active' ? (
                          <DropdownMenuItem className="text-orange-600">
                            <Lock className="w-4 h-4 mr-2" />
                            アカウントロック
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-600">
                            <Unlock className="w-4 h-4 mr-2" />
                            ロック解除
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
