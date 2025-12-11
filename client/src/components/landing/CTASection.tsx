import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
    return (
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
    );
}
