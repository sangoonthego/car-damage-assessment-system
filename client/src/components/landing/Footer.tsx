import { Sparkles } from 'lucide-react';

export function Footer() {
    return (
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
                    <p>© 2025 Car Damage Assessment. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
                        <a href="#" className="hover:text-white transition-colors">利用規約</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
