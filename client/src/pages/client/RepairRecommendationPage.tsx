import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Wrench,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Phone,
  Navigation,
  ChevronRight,
  ShoppingCart,
  AlertCircle
} from 'lucide-react';

export function RepairRecommendationPage() {
  const parts = [
    { name: 'フロントバンパー', price: '¥45,000', required: true, availability: '在庫あり' },
    { name: 'ヘッドライト (左)', price: '¥32,000', required: true, availability: '在庫あり' },
    { name: 'ボンネット', price: '¥68,000', required: false, availability: '取り寄せ (2-3日)' },
    { name: 'フロントグリル', price: '¥15,000', required: true, availability: '在庫あり' },
  ];

  const garages = [
    {
      name: '東京オートサービス',
      rating: 4.8,
      reviews: 245,
      distance: '1.2km',
      price: '¥120,000',
      time: '2-3日',
      specialization: '事故修理専門',
      phone: '03-1234-5678'
    },
    {
      name: 'カーケアプロ渋谷',
      rating: 4.6,
      reviews: 189,
      distance: '2.5km',
      price: '¥135,000',
      time: '3-4日',
      specialization: '高級車専門',
      phone: '03-2345-6789'
    },
    {
      name: 'スピード修理センター',
      rating: 4.7,
      reviews: 312,
      distance: '3.8km',
      price: '¥110,000',
      time: '1-2日',
      specialization: '迅速対応',
      phone: '03-3456-7890'
    },
  ];

  const repairOptions = [
    {
      type: 'スタンダード',
      price: '¥120,000',
      time: '3-5日',
      warranty: '6ヶ月',
      features: ['純正パーツ使用', '基本塗装', '標準作業']
    },
    {
      type: 'プレミアム',
      price: '¥180,000',
      time: '5-7日',
      warranty: '1年',
      features: ['純正パーツ使用', 'ハイクオリティ塗装', '詳細チェック', '洗車サービス'],
      recommended: true
    },
    {
      type: 'エコノミー',
      price: '¥85,000',
      time: '2-3日',
      warranty: '3ヶ月',
      features: ['互換パーツ使用', '簡易塗装', '迅速作業']
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-block mb-3">
          <Badge className="bg-red-50 text-red-700 border border-red-100">
            クライアント機能
          </Badge>
        </div>
        <h1 className="text-slate-900 mb-2">修理レコメンデーション</h1>
        <p className="text-slate-600">
          AIが提案する最適な修理プランと近隣の修理工場
        </p>
      </div>

      {/* Summary Alert */}
      <Card className="p-6 border-blue-200 bg-blue-50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-blue-900 mb-2">評価結果: ASM-2025-001</h3>
            <p className="text-blue-700 mb-3">
              検出された損傷: <strong>5箇所</strong> / 推定修理費用: <strong>¥120,000 - ¥180,000</strong>
            </p>
            <div className="flex gap-2">
              <Badge className="bg-blue-200 text-blue-900">フロント損傷</Badge>
              <Badge className="bg-blue-200 text-blue-900">中度</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Required Parts */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-slate-900">必要な交換部品</h2>
        </div>

        <div className="space-y-3">
          {parts.map((part, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${part.required ? 'bg-red-600' : 'bg-slate-400'}`} />
                <div>
                  <p className="text-slate-900">{part.name}</p>
                  <p className="text-slate-500">
                    {part.required ? '必須' : '推奨'} • {part.availability}
                  </p>
                </div>
              </div>
              <p className="text-slate-900">{part.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-green-900">部品合計</p>
            <p className="text-green-900">¥160,000</p>
          </div>
        </div>
      </Card>

      {/* Repair Options */}
      <div>
        <h2 className="text-slate-900 mb-6">修理プラン比較</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {repairOptions.map((option, index) => (
            <Card key={index} className={`p-6 border-2 ${
              option.recommended 
                ? 'border-red-500 bg-red-50/50' 
                : 'border-slate-200'
            }`}>
              {option.recommended && (
                <Badge className="mb-4 bg-red-600 text-white hover:bg-red-600">
                  おすすめ
                </Badge>
              )}
              <h3 className="text-slate-900 mb-2">{option.type}</h3>
              <p className="text-slate-900 mb-1">{option.price}</p>
              <p className="text-slate-600 mb-4">
                <Clock className="w-4 h-4 inline mr-1" />
                {option.time}
              </p>
              <div className="border-t border-slate-200 pt-4 mb-4">
                <p className="text-slate-500 mb-3">保証期間: {option.warranty}</p>
                <ul className="space-y-2">
                  {option.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-slate-700">
                      <ChevronRight className="w-4 h-4 text-red-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className={`w-full ${
                  option.recommended 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
                    : 'bg-white border border-slate-300 text-slate-900 hover:bg-slate-50'
                }`}
              >
                選択する
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Nearby Garages */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-slate-900">近隣の修理工場</h2>
        </div>

        <div className="space-y-4">
          {garages.map((garage, index) => (
            <div key={index} className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-slate-900 mb-1">{garage.name}</h3>
                      <div className="flex items-center gap-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{garage.rating}</span>
                          <span className="text-slate-400">({garage.reviews}件)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="w-4 h-4" />
                          <span>{garage.distance}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{garage.specialization}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-slate-500 mb-1">見積価格</p>
                      <p className="text-slate-900">{garage.price}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-slate-500 mb-1">作業時間</p>
                      <p className="text-slate-900">{garage.time}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-slate-500 mb-1">電話番号</p>
                      <p className="text-slate-900 text-sm">{garage.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2 lg:min-w-[140px]">
                  <Button variant="outline" className="flex-1 lg:flex-none border-slate-300">
                    <Phone className="w-4 h-4 mr-2" />
                    電話
                  </Button>
                  <Button variant="outline" className="flex-1 lg:flex-none border-slate-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    地図
                  </Button>
                  <Button className="flex-1 lg:flex-none bg-gradient-to-r from-red-600 to-red-700 text-white">
                    予約
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
