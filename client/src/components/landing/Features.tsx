import { Card } from '../ui/card';
import { Camera, BarChart3, Clock, Shield, Zap, Sparkles } from 'lucide-react';

export function Features() {
    return (
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
    );
}
