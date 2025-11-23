import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Calendar } from 'lucide-react';
import { fetchProfile, UserProfile, updateProfile } from '../../api/profile';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Camera,
  Save,
  Shield
} from 'lucide-react';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [formData, setFormData] = useState<UserProfile>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    avatar: '',
    birthday: undefined,
    company: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const loadProfile = async () => {
    try {
      const data = await fetchProfile();
      setUser(data);
      setFormData({
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        email: data.email || '',
        phone: data.phone || '',
        birthday: data.birthday ? new Date(data.birthday).toISOString().substring(0, 10) : '',
        company: data.company || '',
        address: data.address || '',
        avatar: data.avatar || '',
        bio: data.bio || '',
      });
    } catch (error) {
      console.error(error);
      setMessage('プロフィールの取得に失敗しました');
    }
  };

  loadProfile();
}, []);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const updated = await updateProfile(formData);
      setUser(updated); // OK
      setIsEditing(false); // OK
      setMessage('プロフィールを更新しました！');
    } catch (error) {
      console.error(error);
      setMessage('プロフィールの更新に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) setFormData({ ...user }); 
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">プロフィール設定</h1>
        <p className="text-slate-600">
          アカウント情報を管理します
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-8 border-slate-200">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-4xl">
                NT
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-lg">
                <Camera className="w-5 h-5 text-slate-700" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-slate-900">{formData.firstname} {formData.lastname}</p>
              <p className="text-slate-500">クライアント</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className='text-slate-700'>氏名</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="name"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className='text-slate-700'>メールアドレス</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing || loading}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className='text-slate-700'>電話番号</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing || loading}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-slate-700">生年月日</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday || ''}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    disabled={!isEditing || loading}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className='text-slate-700'>会社名</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={!isEditing || loading}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className='text-slate-700'>住所</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing || loading}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio" className='text-slate-700'>自己紹介</Label>
                <Textarea
                  id="bio"
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing || loading}
                  rows={3}
                />
              </div>

            <div className="flex gap-3">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-200"
                >
                  編集する
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-200"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? '保存中...' : '保存する'}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-0 text-white hover:bg-slate-800 shadow-lg shadow-zinc-400"
                    disabled={loading}
                  >
                    キャンセル
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Account Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="text-center">
            <p className="text-slate-500 mb-2">今月の評価数</p>
            <p className="text-slate-900 mb-1">156件</p>
            <p className="text-green-600">先月比 +12%</p>
          </div>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="text-center">
            <p className="text-slate-500 mb-2">利用開始日</p>
            <p className="text-slate-900 mb-1">2024年6月15日</p>
            <p className="text-slate-600">220日経過</p>
          </div>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="text-center">
            <p className="text-slate-500 mb-2">総評価数</p>
            <p className="text-slate-900 mb-1">1,245件</p>
            <p className="text-blue-600">累計記録</p>
          </div>
        </Card>
      </div>

      {/* Security Settings */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-slate-900">セキュリティ設定</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-900 mb-1">パスワード</p>
              <p className="text-slate-500">最終更新: 2024年12月1日</p>
            </div>
            <Button variant="outline" className="border-slate-300">
              変更する
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-900 mb-1">二段階認証</p>
              <p className="text-slate-500">追加のセキュリティ保護を有効化</p>
            </div>
            <Button variant="outline" className="border-slate-300">
              設定する
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-900 mb-1">ログインセッション</p>
              <p className="text-slate-500">アクティブなセッション: 2個</p>
            </div>
            <Button variant="outline" className="border-slate-300">
              管理する
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-8 border-red-200 bg-red-50/50">
        <h3 className="text-red-900 mb-4">危険な操作</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-900 mb-1">アカウントを削除</p>
              <p className="text-red-700">この操作は取り消すことができません</p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
              削除する
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
