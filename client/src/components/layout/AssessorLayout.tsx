import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ClipboardList,
    BarChart3,
    Bell,
    LogOut,
    Sparkles,
    User
} from 'lucide-react';
import { Button } from '../ui/button';

interface AssessorLayoutProps {
    children: ReactNode;
}

export function AssessorLayout({ children }: AssessorLayoutProps) {
    const location = useLocation();

    const navigation = [
        { name: '評価キュー', href: '/assessor/queue', icon: ClipboardList },
        { name: '統計', href: '/assessor/stats', icon: BarChart3 },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Navigation */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="h-16 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-slate-900">評価者</span>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center gap-2">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active
                                                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : ''}`} />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* User Menu */}
                            <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    評
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-slate-900">評価者</p>
                                    <p className="text-xs text-slate-500">assessor@example.com</p>
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-6">
                {children}
            </main>
        </div>
    );
}
