import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function Hero() {
    return (
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
    );
}
