export function HowItWorks() {
    return (
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
    );
}
