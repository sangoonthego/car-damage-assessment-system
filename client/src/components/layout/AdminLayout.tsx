import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    BarChart3,
    Settings,
    Bell,
    LogOut,
    Menu,
    X,
    Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigation = [
        { name: 'ダッシュボード', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'ユーザー管理', href: '/admin/users', icon: Users },
        { name: '評価管理', href: '/admin/assessments', icon: ClipboardList },
        { name: '分析', href: '/admin/analytics', icon: BarChart3 },
        { name: '設定', href: '/admin/settings', icon: Settings },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-slate-900">管理者</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-slate-500 hover:text-slate-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                                        ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${active ? 'text-red-600' : ''}`} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="border-t border-slate-200 p-4">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            管
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">管理者</p>
                            <p className="text-xs text-slate-500 truncate">admin@example.com</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full mt-2 text-slate-600 hover:text-red-600 hover:bg-red-50 justify-start"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        ログアウト
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : ''}`}>
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40">
                    <div className="h-full px-6 flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-slate-500 hover:text-slate-700 lg:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            {/* Notifications */}
                            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
