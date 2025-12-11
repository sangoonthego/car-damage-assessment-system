import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CheckCircle2 } from 'lucide-react';

export function Showcase() {
    return (
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
    );
}
