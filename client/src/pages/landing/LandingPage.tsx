import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Camera, 
  BarChart3, 
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="tracking-tight text-slate-600">Car Damage Assessment</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
              機能
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
              使い方
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
              料金
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-700 bg-white hover:bg-slate-100 border-0">
                ログイン
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-200 border-0">
                無料で始める
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-1.5 bg-red-50 text-red-700 rounded-full border border-red-100">
                AIによる革新的な診断システム
              </span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-slate-900 leading-tight">
                車両損傷を
                <br />
                <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  瞬時に評価
                </span>
              </h1>
              
              <p className="text-slate-600 max-w-lg">
                最先端のAI技術により、車両の損傷状態を高精度で分析。
                従来の査定時間を90%削減し、より正確な評価を実現します。
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl shadow-red-200 h-12 px-8 border-0">
                  無料トライアルを開始
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-8 hover:bg-zinc-800 border-slate-300 border-0">
                デモを見る
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-slate-600">クレジットカード不要</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-slate-600">30日間返金保証</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-red-50 rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1549339693-f174ce8618ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqYXBhbmVzZSUyMGNhcnxlbnwxfHx8fDE3NjM0NDUxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Luxury Japanese Car"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-600 tracking-wider uppercase">機能</span>
            <h2 className="mt-4 text-slate-900">
              プロフェッショナルグレードの
              <br />
              損傷評価システム
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <Camera className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="mb-4 text-slate-900">AI画像認識</h3>
              <p className="text-slate-600">
                写真をアップロードするだけで、AIが自動的に損傷箇所を検出し、分類します。
              </p>
            </Card>

            <Card className="p-8 bg-white border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-4 text-slate-900">詳細レポート</h3>
              <p className="text-slate-600">
                損傷の程度、修理費用の見積もり、総合評価を含む包括的なレポートを生成。
              </p>
            </Card>

            <Card className="p-8 bg-white border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="mb-4 text-slate-900">即座に結果</h3>
              <p className="text-slate-600">
                従来の査定方法と比較して、わずか数分で正確な評価結果を取得できます。
              </p>
            </Card>

            <Card className="p-8 bg-white border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mb-4 text-slate-900">高精度評価</h3>
              <p className="text-slate-600">
                機械学習により、98%以上の精度で損傷を検出し、評価を行います。
              </p>
            </Card>

            <Card className="p-8 bg-white border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="mb-4 text-slate-900">クラウド連携</h3>
              <p className="text-slate-600">
                すべてのデータはクラウドに安全に保存され、どこからでもアクセス可能。
              </p>
            </Card>

            <Card className="p-8 bg-white border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="mb-4 text-slate-900">自動更新</h3>
              <p className="text-slate-600">
                AIモデルは継続的に学習し、常に最新の精度を提供します。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-600 tracking-wider uppercase">使い方</span>
            <h2 className="mt-4 text-slate-900">
              シンプルな3ステップ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-200">
                <span>01</span>
              </div>
              <h3 className="mb-4 text-slate-900">写真をアップロード</h3>
              <p className="text-slate-600">
                車両の損傷箇所を複数角度から撮影し、システムにアップロード
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
                <span>02</span>
              </div>
              <h3 className="mb-4 text-slate-900">AI分析</h3>
              <p className="text-slate-600">
                高度なAIアルゴリズムが損傷を自動検出し、詳細に分析
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                <span>03</span>
              </div>
              <h3 className="mb-4 text-slate-900">レポート取得</h3>
              <p className="text-slate-600">
                詳細な評価レポートと修理費用見積もりを即座に取得
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-red-400 tracking-wider uppercase">テクノロジー</span>
              <h2 className="mt-4 mb-6">
                最先端のAI技術で
                <br />
                未来の査定を実現
              </h2>
              <p className="text-slate-300 mb-8">
                ディープラーニングとコンピュータビジョンを組み合わせた独自のアルゴリズムにより、
                人間の目では見逃しがちな微細な損傷も正確に検出します。
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">98%以上の検出精度</p>
                    <p className="text-slate-400">業界最高水準のAIモデル</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">100万件以上の学習データ</p>
                    <p className="text-slate-400">継続的な精度向上</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">リアルタイム処理</p>
                    <p className="text-slate-400">平均3分で完了</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1694479452720-782feb4d488b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzQ0NTE3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Modern Car Technology"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-600 tracking-wider uppercase">料金プラン</span>
            <h2 className="mt-4 text-slate-900">
              シンプルで透明性の高い料金体系
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-slate-200">
              <div className="mb-6">
                <h3 className="text-slate-900 mb-2">スターター</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900">¥9,800</span>
                  <span className="text-slate-500">/月</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  月50件の査定
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  基本レポート
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  メールサポート
                </li>
              </ul>
              
              <Link to="/signup" className="block">
                <Button variant="outline" className="w-full border-slate-300 hover:bg-zinc-800 text-white border-0">
                  始める
                </Button>
              </Link>
            </Card>

            <Card className="p-8 border-red-200 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full">
                人気
              </div>
              
              <div className="mb-6">
                <h3 className="text-slate-900 mb-2">プロフェッショナル</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900">¥29,800</span>
                  <span className="text-slate-500">/月</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  月200件の査定
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  詳細レポート
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  優先サポート
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  API連携
                </li>
              </ul>
              
              <Link to="/signup" className="block">
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0">
                  始める
                </Button>
              </Link>
            </Card>

            <Card className="p-8 border-slate-200">
              <div className="mb-6">
                <h3 className="text-slate-900 mb-2">エンタープライズ</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900">カスタム</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  無制限の査定
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  カスタムレポート
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  専任サポート
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  オンプレミス対応
                </li>
              </ul>
              
              <Button variant="outline" className="w-full hover:bg-zinc-800 border-0 border-slate-300 text-white">
                お問い合わせ
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white mb-6">
            今すぐ始めて、査定業務を革新しましょう
          </h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            30日間の無料トライアルで、AIによる車両損傷評価の威力を体験してください。
            クレジットカードの登録は不要です。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white border-0 hover:bg-slate-100 text-red-700 h-12 px-8 shadow-xl">
                無料で始める
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 border-0 border-white text-white hover:bg-zinc-800">
              営業チームに相談
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="tracking-tight">Car Damage Assessment AI</span>
              </div>
              <p className="text-white">
                AIで車両査定の未来を創造
              </p>
            </div>

            <div>
              <h4 className="mb-4">製品</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">機能</a></li>
                <li><a href="#" className="hover:text-white transition-colors">料金</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">会社</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">会社概要</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ブログ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">採用情報</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">サポート</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">ヘルプセンター</a></li>
                <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
            <p>© 2025 CarAssess AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="#" className="hover:text-white transition-colors">利用規約</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
