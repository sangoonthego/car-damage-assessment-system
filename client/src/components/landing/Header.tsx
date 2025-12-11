import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';

export function Header() {
    return (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="tracking-tight text-slate-600">Car Damage Assessment</span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
                        機能
                    </a>
                    <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
                        使い方
                    </a>
                    <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                        料金
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <Button variant="ghost" className="text-slate-700 bg-white hover:bg-slate-100 border-0">
                            ログイン
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-200 border-0">
                            無料で始める
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
