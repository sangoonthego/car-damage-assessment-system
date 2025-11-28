import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import {
  Upload,
  Download,
  Database,
  Image as ImageIcon,
  Tag,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  Play
} from 'lucide-react';

export function TrainingDataPage() {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  // Mock data
  const datasets = [
    {
      id: 1,
      name: 'フロント損傷セット v2.1',
      images: 1234,
      labeled: 1180,
      classes: 8,
      createdAt: '2025-01-10',
      size: '2.3 GB',
      status: 'ready'
    },
    {
      id: 2,
      name: 'サイド損傷セット v1.5',
      images: 892,
      labeled: 850,
      classes: 6,
      createdAt: '2025-01-05',
      size: '1.8 GB',
      status: 'ready'
    },
    {
      id: 3,
      name: '新規データセット',
      images: 156,
      labeled: 89,
      classes: 5,
      createdAt: '2025-01-15',
      size: '320 MB',
      status: 'in_progress'
    },
  ];

  const trainingImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1449130015084-2dc19ce65bcc?w=400',
      filename: 'damage_001.jpg',
      labels: ['バンパー損傷', 'ヘッドライト破損'],
      labelCount: 2,
      verified: true,
      uploadedAt: '2025-01-15'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=400',
      filename: 'damage_002.jpg',
      labels: ['ドア凹み'],
      labelCount: 1,
      verified: true,
      uploadedAt: '2025-01-14'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      filename: 'damage_003.jpg',
      labels: ['ボンネット損傷', 'グリル破損'],
      labelCount: 2,
      verified: false,
      uploadedAt: '2025-01-14'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1449130015084-2dc19ce65bcc?w=400',
      filename: 'damage_004.jpg',
      labels: [],
      labelCount: 0,
      verified: false,
      uploadedAt: '2025-01-13'
    },
  ];

  const labelClasses = [
    { name: 'バンパー損傷', count: 342, color: 'bg-red-500' },
    { name: 'ヘッドライト破損', count: 278, color: 'bg-orange-500' },
    { name: 'ドア凹み', count: 245, color: 'bg-yellow-500' },
    { name: '塗装剥がれ', count: 198, color: 'bg-green-500' },
    { name: 'ボンネット損傷', count: 171, color: 'bg-blue-500' },
    { name: 'グリル破損', count: 145, color: 'bg-purple-500' },
    { name: 'サイドミラー', count: 123, color: 'bg-pink-500' },
    { name: 'テールライト', count: 98, color: 'bg-indigo-500' },
  ];

  const stats = {
    totalImages: 2282,
    labeledImages: 2119,
    totalLabels: 5234,
    verifiedImages: 1987
  };

  const getStatusBadge = (status: string) => {
    if (status === 'ready') {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">準備完了</Badge>;
    } else if (status === 'in_progress') {
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">作業中</Badge>;
    } else {
      return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">下書き</Badge>;
    }
  };

  const toggleImageSelection = (id: number) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
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
          <h1 className="text-slate-900 mb-2">AIトレーニングデータ管理</h1>
          <p className="text-slate-600">
            学習用画像のアップロード、ラベリング、データセット管理
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-300">
            <Download className="w-4 h-4 mr-2" />
            エクスポート
          </Button>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            <Upload className="w-4 h-4 mr-2" />
            画像アップロード
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-slate-500 mb-2">総画像数</p>
          <p className="text-slate-900">{stats.totalImages.toLocaleString()}枚</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-slate-500 mb-2">ラベル済み</p>
          <p className="text-slate-900">
            {stats.labeledImages.toLocaleString()}枚
            <span className="text-slate-500 text-sm ml-2">
              ({((stats.labeledImages / stats.totalImages) * 100).toFixed(1)}%)
            </span>
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-slate-500 mb-2">総ラベル数</p>
          <p className="text-slate-900">{stats.totalLabels.toLocaleString()}個</p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-slate-500 mb-2">検証済み</p>
          <p className="text-slate-900">
            {stats.verifiedImages.toLocaleString()}枚
            <span className="text-slate-500 text-sm ml-2">
              ({((stats.verifiedImages / stats.totalImages) * 100).toFixed(1)}%)
            </span>
          </p>
        </Card>
      </div>

      {/* Datasets */}
      <Card className="p-8 border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-slate-900">データセット</h3>
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            新規データセット作成
          </Button>
        </div>

        <div className="space-y-4">
          {datasets.map((dataset) => (
            <Card key={dataset.id} className="p-6 border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-slate-900">{dataset.name}</h4>
                    {getStatusBadge(dataset.status)}
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-slate-500 text-sm mb-1">画像数</p>
                      <p className="text-slate-900">{dataset.images}枚</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-slate-500 text-sm mb-1">ラベル済み</p>
                      <p className="text-slate-900">{dataset.labeled}枚</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-slate-500 text-sm mb-1">クラス数</p>
                      <p className="text-slate-900">{dataset.classes}個</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-slate-500 text-sm mb-1">サイズ</p>
                      <p className="text-slate-900">{dataset.size}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-slate-500 text-sm mb-1">作成日</p>
                      <p className="text-slate-900 text-sm">{dataset.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Button size="sm" variant="outline" className="border-slate-300">
                    <Edit3 className="w-4 h-4 mr-2" />
                    編集
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-300">
                    <Download className="w-4 h-4 mr-2" />
                    DL
                  </Button>
                  {dataset.status === 'ready' && (
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      学習
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Label Classes */}
        <Card className="lg:col-span-1 p-8 border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-slate-900">ラベルクラス</h3>
          </div>

          <div className="space-y-3">
            {labelClasses.map((label, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${label.color} rounded`} />
                  <span className="text-slate-900">{label.name}</span>
                </div>
                <Badge variant="secondary">{label.count}</Badge>
              </div>
            ))}
          </div>

          <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            新規クラス追加
          </Button>
        </Card>

        {/* Training Images */}
        <Card className="lg:col-span-2 p-8 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-slate-900">トレーニン���画像</h3>
            </div>

            {selectedImages.length > 0 && (
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-100 text-blue-700">
                  {selectedImages.length}枚選択中
                </Badge>
                <Button size="sm" variant="outline" className="border-slate-300">
                  <Trash2 className="w-4 h-4 mr-2" />
                  削除
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {trainingImages.map((image) => (
              <Card
                key={image.id}
                className={`p-4 border-2 cursor-pointer transition-all ${
                  selectedImages.includes(image.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => toggleImageSelection(image.id)}
              >
                <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-900 text-sm truncate">{image.filename}</p>
                  {image.verified ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Tag className="w-3 h-3" />
                    <span>{image.labelCount}ラベル</span>
                  </div>
                  <span className="text-slate-500">{image.uploadedAt}</span>
                </div>

                {image.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {image.labels.map((label, lIndex) => (
                      <Badge key={lIndex} variant="secondary" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}

                {image.labels.length === 0 && (
                  <Badge className="mt-3 bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs">
                    ラベル未設定
                  </Badge>
                )}
              </Card>
            ))}
          </div>

          <Button className="w-full mt-6 border-2 border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-50">
            <Upload className="w-4 h-4 mr-2" />
            さらに画像をアップロード
          </Button>
        </Card>
      </div>

      {/* Label Editor Hint */}
      <Card className="p-6 border-blue-200 bg-blue-50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Edit3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-blue-900 mb-2">ラベルエディタ</h3>
            <p className="text-blue-700 mb-3">
              画像をクリックしてラベルエディタを開き、バウンディングボックスやマスクを編集できます。
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              エディタを開く
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
