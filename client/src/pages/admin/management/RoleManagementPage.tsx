import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Check,
  X
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

export function RoleManagementPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data
  const roles = [
    {
      id: 'client',
      name: 'Client',
      description: '車両損傷評価を依頼するユーザー',
      userCount: 145,
      color: 'blue',
      permissions: {
        uploadDamage: true,
        viewHistory: true,
        viewRepairRecommendation: true,
        contactSupport: true,
        manageUsers: false,
        manageRoles: false,
        viewAllAssessments: false,
        configureAI: false,
        viewLogs: false,
        reviewCases: false
      }
    },
    {
      id: 'assessor',
      name: 'Assessor',
      description: '損傷評価を行う専門家',
      userCount: 12,
      color: 'purple',
      permissions: {
        uploadDamage: false,
        viewHistory: false,
        viewRepairRecommendation: false,
        contactSupport: true,
        manageUsers: false,
        manageRoles: false,
        viewAllAssessments: true,
        configureAI: false,
        viewLogs: false,
        reviewCases: true,
        editAssessments: true,
        aiReviewMode: true
      }
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'システム全体を管理する管理者',
      userCount: 3,
      color: 'red',
      permissions: {
        uploadDamage: false,
        viewHistory: false,
        viewRepairRecommendation: false,
        contactSupport: true,
        manageUsers: true,
        manageRoles: true,
        viewAllAssessments: true,
        configureAI: true,
        viewLogs: true,
        reviewCases: false,
        manageBilling: true,
        manageCMS: true
      }
    }
  ];

  const permissionCategories = {
    'クライアント機能': [
      { key: 'uploadDamage', label: '損傷アップロード' },
      { key: 'viewHistory', label: '評価履歴表示' },
      { key: 'viewRepairRecommendation', label: '修理推奨表示' },
      { key: 'contactSupport', label: 'サポート連絡' }
    ],
    'Assessor機能': [
      { key: 'reviewCases', label: 'ケースレビュー' },
      { key: 'editAssessments', label: '評価編集' },
      { key: 'aiReviewMode', label: 'AI評価モード' },
      { key: 'viewAllAssessments', label: '全評価表示' }
    ],
    'Admin機能': [
      { key: 'manageUsers', label: 'ユーザー管理' },
      { key: 'manageRoles', label: '権限管理' },
      { key: 'configureAI', label: 'AI設定' },
      { key: 'viewLogs', label: 'ログ表示' },
      { key: 'manageBilling', label: '料金管理' },
      { key: 'manageCMS', label: 'CMS管理' }
    ]
  };

  const getRoleColor = (color: string) => {
    const colorMap = {
      blue: 'from-blue-600 to-blue-700',
      purple: 'from-purple-600 to-purple-700',
      red: 'from-red-600 to-red-700'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
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
          <h1 className="text-slate-900 mb-2">権限管理</h1>
          <p className="text-slate-600">
            ユーザーロールと権限を管理します
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              新規ロール作成
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>新規ロール作成</DialogTitle>
              <DialogDescription>
                カスタムロールを作成し、権限を設定します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">ロール名</Label>
                <Input id="roleName" placeholder="例: Senior Assessor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">説明</Label>
                <Input id="description" placeholder="このロールの説明" />
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

      {/* Roles Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
            <div className={`w-12 h-12 bg-gradient-to-br ${getRoleColor(role.color)} rounded-xl flex items-center justify-center mb-4`}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-slate-900 mb-2">{role.name}</h3>
            <p className="text-slate-600 mb-4 text-sm">{role.description}</p>
            
            <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg">
              <p className="text-slate-600 text-sm">ユーザー数</p>
              <p className="text-slate-900">{role.userCount}人</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 border-slate-300">
                <Edit className="w-3 h-3 mr-1" />
                編集
              </Button>
              {role.userCount === 0 && (
                <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Permission Matrix */}
      <Card className="border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-slate-600" />
            <h3 className="text-slate-900">権限マトリックス</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-slate-700 w-64">権限</th>
                {roles.map((role) => (
                  <th key={role.id} className="px-6 py-4 text-center text-slate-700">
                    <div className={`inline-block px-3 py-1 bg-gradient-to-r ${getRoleColor(role.color)} text-white rounded-full text-sm`}>
                      {role.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Object.entries(permissionCategories).map(([category, permissions]) => (
                <>
                  <tr key={category} className="bg-slate-50">
                    <td colSpan={roles.length + 1} className="px-6 py-3 text-slate-900 font-medium">
                      {category}
                    </td>
                  </tr>
                  {permissions.map((permission) => (
                    <tr key={permission.key} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-700">
                        {permission.label}
                      </td>
                      {roles.map((role) => (
                        <td key={role.id} className="px-6 py-4 text-center">
                          {role.permissions[permission.key as keyof typeof role.permissions] ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full">
                              <X className="w-4 h-4 text-slate-400" />
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role Assignment History */}
      <Card className="p-8 border-slate-200">
        <h3 className="text-slate-900 mb-6">最近のロール変更</h3>
        
        <div className="space-y-3">
          {[
            { user: '田中太郎', from: 'Client', to: 'Assessor', date: '2025-01-15 14:30', admin: '管理者A' },
            { user: '佐藤花子', from: 'Assessor', to: 'Admin', date: '2025-01-14 10:20', admin: '管理者A' },
            { user: '鈴木一郎', from: 'Client', to: 'Client', date: '2025-01-13 16:45', admin: '管理者B' },
          ].map((change, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white">
                  {change.user.substring(0, 2)}
                </div>
                <div>
                  <p className="text-slate-900 mb-1">{change.user}</p>
                  <p className="text-slate-600 text-sm">
                    {change.from} → {change.to}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-600 text-sm">{change.date}</p>
                <p className="text-slate-500 text-sm">変更者: {change.admin}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
