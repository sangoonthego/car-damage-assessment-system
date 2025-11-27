import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  Search,
  BookOpen,
  Video,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  ChevronRight
} from 'lucide-react';

export function HelpPage() {
  const faqs = [
    {
      category: '基本的な使い方',
      questions: [
        {
          q: 'CarAssess AIの使い方を教えてください',
          a: '画像をアップロードし、検出モードを選択して「解析を開始」ボタンをクリックするだけです。数秒で結果が表示されます。'
        },
        {
          q: '対応している画像形式は？',
          a: 'JPEG、PNG、GIF形式の画像に対応しています。最大ファイルサイズは10MBです。'
        },
        {
          q: '解析にはどのくらい時間がかかりますか？',
          a: '通常2〜5秒で完了します。画像のサイズや複雑さによって若干変動します。'
        }
      ]
    },
    {
      category: 'AI解析について',
      questions: [
        {
          q: '物体検出とセグメンテーションの違いは？',
          a: '物体検出は損傷箇所を矩形で囲んで検出します。セグメンテーションはピクセル単位で正確な形状を検出します。'
        },
        {
          q: 'AIの精度はどのくらいですか？',
          a: '98%以上の検出精度を実現しています。ただし、照明条件や画像品質によって変動する可能性があります。'
        },
        {
          q: 'どんな損傷を検出できますか？',
          a: '擦り傷、へこみ、ガラス破損などの主要な車両損傷を検出できます。'
        }
      ]
    },
    {
      category: 'アカウントと料金',
      questions: [
        {
          q: '無料プランの制限は？',
          a: '月50件の評価まで無料でご利用いただけます。それ以上は有料プランへのアップグレードが必要です。'
        },
        {
          q: 'プランの変更方法は？',
          a: 'ダッシュボードの設定メニューから「プラン変更」を選択してください。'
        },
        {
          q: '解約方法を教えてください',
          a: '設定メニューから「サブスクリプション」→「解約」を選択できます。'
        }
      ]
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: 'ドキュメント',
      description: '詳細な使用方法とAPI仕様',
      link: '#',
      color: 'blue'
    },
    {
      icon: Video,
      title: 'ビデオチュートリアル',
      description: '実際の操作方法を動画で学ぶ',
      link: '#',
      color: 'red'
    },
    {
      icon: FileText,
      title: 'ブログ',
      description: '最新情報とベストプラクティス',
      link: '#',
      color: 'green'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-slate-900 mb-2">ヘルプセンター</h1>
        <p className="text-slate-600">
          よくある質問とサポート情報
        </p>
      </div>

      {/* Search */}
      <Card className="p-8 border-slate-200">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="質問を検索..."
            className="pl-12 h-12"
          />
        </div>
      </Card>

      {/* Resources */}
      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const colorMap = {
            blue: 'bg-blue-50 text-blue-600',
            red: 'bg-red-50 text-red-600',
            green: 'bg-green-50 text-green-600'
          };
          
          return (
            <Card 
              key={resource.title}
              className="p-6 border-slate-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className={`w-12 h-12 ${colorMap[resource.color as keyof typeof colorMap].split(' ')[0]} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${colorMap[resource.color as keyof typeof colorMap].split(' ')[1]}`} />
              </div>
              <h3 className="text-slate-900 mb-2">{resource.title}</h3>
              <p className="text-slate-600 mb-4">{resource.description}</p>
              <a href={resource.link} className="text-red-600 hover:text-red-700 flex items-center gap-2 transition-colors">
                詳しく見る
                <ChevronRight className="w-4 h-4" />
              </a>
            </Card>
          );
        })}
      </div>

      {/* FAQs */}
      <div className="space-y-6">
        <h2 className="text-slate-900">よくある質問</h2>
        
        {faqs.map((category) => (
          <Card key={category.category} className="p-8 border-slate-200">
            <h3 className="text-slate-900 mb-6">{category.category}</h3>
            <div className="space-y-6">
              {category.questions.map((item, index) => (
                <div key={index} className="pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                  <p className="text-slate-900 mb-3">
                    Q: {item.q}
                  </p>
                  <p className="text-slate-600 pl-4 border-l-2 border-red-200">
                    A: {item.a}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="p-8 border-slate-200 bg-gradient-to-r from-red-50 to-white">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-slate-900 mb-4">問題が解決しない場合は？</h3>
          <p className="text-slate-600 mb-6">
            サポートチームが24時間365日対応いたします。お気軽にお問い合わせください。
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col border-slate-300">
              <MessageCircle className="w-6 h-6 mb-2 text-blue-600" />
              <span className="text-slate-900">チャット</span>
              <span className="text-slate-500 text-sm">即座に対応</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex-col border-slate-300">
              <Mail className="w-6 h-6 mb-2 text-green-600" />
              <span className="text-slate-900">メール</span>
              <span className="text-slate-500 text-sm">24時間以内に返信</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex-col border-slate-300">
              <Phone className="w-6 h-6 mb-2 text-red-600" />
              <span className="text-slate-900">電話</span>
              <span className="text-slate-500 text-sm">平日 9:00-18:00</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
