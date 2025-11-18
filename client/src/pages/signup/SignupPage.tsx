import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1549339693-f174ce8618ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqYXBhbmVzZSUyMGNhcnxlbnwxfHx8fDE3NjM0NDUxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Car"
          className="w-full h-full object-cover opacity-80"
        />
        
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-lg">
            <h2 className="mb-6">
              30日間無料トライアル
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1 text-green-400" />
                <div>
                  <p className="text-white">クレジットカード不要</p>
                  <p className="text-slate-300">すぐに始められます</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1 text-green-400" />
                <div>
                  <p className="text-white">50件の無料査定</p>
                  <p className="text-slate-300">トライアル期間中</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1 text-green-400" />
                <div>
                  <p className="text-white">すべての機能にアクセス</p>
                  <p className="text-slate-300">制限なしで体験可能</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1 text-green-400" />
                <div>
                  <p className="text-white">いつでもキャンセル可能</p>
                  <p className="text-slate-300">自動更新なし</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            ホームに戻る
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-slate-900 tracking-tight">CarAssess AI</span>
            </div>
            
            <h1 className="text-slate-900 mb-2">アカウントを作成</h1>
            <p className="text-slate-600">
              既にアカウントをお持ちの方は{' '}
              <Link to="/login" className="text-red-600 hover:text-red-700 transition-colors">
                ログイン
              </Link>
            </p>
          </div>

          <Card className="p-8 border-slate-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="山田 太郎"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">会社名（任意）</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="株式会社サンプル"
                  value={formData.company}
                  onChange={handleChange}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="8文字以上"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="再度入力してください"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required className="mt-1" />
                <Label 
                  htmlFor="terms" 
                  className="cursor-pointer text-slate-600"
                >
                  <a href="#" className="text-red-600 hover:text-red-700 transition-colors">利用規約</a>
                  および
                  <a href="#" className="text-red-600 hover:text-red-700 transition-colors">プライバシーポリシー</a>
                  に同意します
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                無料トライアルを開始
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-slate-500">または</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="h-11 border-slate-300">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="h-11 border-slate-300">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center">
              🎉 30日間の無料トライアル期間中はすべての機能を制限なくご利用いただけます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
