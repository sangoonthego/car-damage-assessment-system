import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle2 } from 'lucide-react';

export function Pricing() {
    return (
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
    );
}
