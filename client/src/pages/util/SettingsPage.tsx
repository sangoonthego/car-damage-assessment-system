import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from 'recharts';
import { Switch } from '@radix-ui/react-switch';
import {
  Settings,
  Bell,
  Globe,
  Moon,
  Lock,
  Database,
  Zap
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    assessment: true,
    weekly: false
  });

  const [preferences, setPreferences] = useState({
    language: 'ja',
    theme: 'light',
    autoSave: true,
    highQuality: false
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">設定</h1>
        <p className="text-slate-600">
          アプリケーションの設定をカスタマイズします
        </p>
      </div>

      {/* Notifications Settings */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-slate-900">通知設定</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900">メール通知</Label>
              <p className="text-slate-500 mt-1">
                評価完了時にメールで通知を受け取る
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, email: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900">プッシュ通知</Label>
              <p className="text-slate-500 mt-1">
                ブラウザのプッシュ通知を有効化
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, push: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900">評価通知</Label>
              <p className="text-slate-500 mt-1">
                新しい評価が作成されたときに通知
              </p>
            </div>
            <Switch
              checked={notifications.assessment}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, assessment: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900">週次レポート</Label>
              <p className="text-slate-500 mt-1">
                毎週月曜日に統計レポートを受信
              </p>
            </div>
            <Switch
              checked={notifications.weekly}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, weekly: checked })
              }
            />
          </div>
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <Moon className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-slate-900">表示設定</h3>
        </div>
        
        <div className='flex-1 space-y-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className="space-y-2">
              <Label>テーマ</Label>
              <Select 
                value={preferences.theme} 
                onValueChange={(value) => 
                  setPreferences({ ...preferences, theme: value })
                }
              >
                <SelectTrigger>
                  <Moon className='w-4 h-4 mr-2' />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light" className='text-slate-700'>ライトモード</SelectItem>
                  <SelectItem value="dark" className='text-slate-700'>ダークモード</SelectItem>
                  <SelectItem value="auto" className='text-slate-700'>システム設定に従う</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>言語</Label>
              <Select 
                value={preferences.language} 
                onValueChange={(value) => 
                  setPreferences({ ...preferences, language: value })
                }
              >
                <SelectTrigger>
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja" className='text-slate-700'>日本語</SelectItem>
                  <SelectItem value="en" className='text-slate-700'>English</SelectItem>
                  <SelectItem value="vi" className='text-slate-700'>Tiếng Việt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Processing Settings */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-slate-900">処理設定</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900">自動保存</Label>
              <p className="text-slate-500 mt-1">
                評価結果を自動的に履歴に保存
              </p>
            </div>
            <Switch
              checked={preferences.autoSave}
              onCheckedChange={(checked) => 
                setPreferences({ ...preferences, autoSave: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900">高品質モード</Label>
              <p className="text-slate-500 mt-1">
                より高精度な解析（処理時間が長くなります）
              </p>
            </div>
            <Switch
              checked={preferences.highQuality}
              onCheckedChange={(checked) => 
                setPreferences({ ...preferences, highQuality: checked })
              }
              className='bg-slate-400'
            />
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-slate-900">プライバシーとセキュリティ</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-900 mb-1">データの暗号化</p>
              <p className="text-slate-500">すべてのデータはAES-256で暗号化されます</p>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">
              有効
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-900 mb-1">データ保持期間</p>
              <p className="text-slate-500">履歴データの自動削除設定</p>
            </div>
            <Button variant="outline" className="border-slate-300">
              設定する
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-900 mb-1">データのエクスポート</p>
              <p className="text-slate-500">すべてのデータをダウンロード</p>
            </div>
            <Button variant="outline" className="border-slate-300">
              <Database className="w-4 h-4 mr-2" />
              エクスポート
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-slate-300">
          リセット
        </Button>
        <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
          <Settings className="w-4 h-4 mr-2" />
          設定を保存
        </Button>
      </div>
    </div>
  );
}
