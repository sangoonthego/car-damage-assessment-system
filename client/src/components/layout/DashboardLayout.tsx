// import { ReactNode, useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { fetchProfile, UserProfile } from '../../api/profile';
// import { 
//   Sparkles,
//   LayoutDashboard,
//   ScanSearch,
//   History,
//   Settings,
//   HelpCircle,
//   LogOut,
//   Menu,
//   X,
//   User
// } from 'lucide-react';
// import { Button } from '../ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../ui/dropdown-menu';

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

// export function DashboardLayout({ children }: DashboardLayoutProps) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     fetchProfile()
//       .then(setUser)
//       .catch(console.error);
//   }, []);

//   const firstname = user?.firstname?? "";
//   const lastname = user?.lastname ?? "";
//   const email = user?.email ?? "";

//   const menuItems = [
//     { icon: LayoutDashboard, label: 'ダッシュボード', path: '/dashboard' },
//     { icon: ScanSearch, label: '損傷評価', path: '/assessment' },
//     { icon: History, label: '評価履歴', path: '/history' },
//     { icon: Settings, label: '設定', path: '/settings' },
//     { icon: HelpCircle, label: 'ヘルプ', path: '/help' },
//   ];

//   const handleLogout = () => {
//     // Add logout logic here
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       {/* Header */}
//       <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="flex items-center justify-between px-6 py-4">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden"
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             >
//               {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </Button>
            
//             <Link to="/dashboard" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
//                 <Sparkles className="w-5 h-5 text-white" />
//               </div>
//               <span className="tracking-tight text-slate-900">Car Damage Assessment</span>
//             </Link>
//           </div>

//           {/* User Avatar Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="flex items-center gap-3 hover:opacity-80 transition-opacity bg-white border-0 hover:bg-slate-100">
//                 <div className="text-right hidden sm:block">
//                   <p className="text-slate-900">{firstname} {lastname}</p>
//                   <p className="text-slate-500">{email}</p>
//                 </div>
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white">
//                   {firstname?.[0]}{lastname?.[0]}
//                 </div>
//               </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56 bg-white">
//               <DropdownMenuLabel className="text-red-600">マイアカウント</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem 
//                 onClick={() => navigate('/profile')}
//                 className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
//               >
//                 <User className="w-4 h-4 mr-2 text-slate-600" />
//                 プロフィール設定
//               </DropdownMenuItem>
//               <DropdownMenuItem 
//                 onClick={() => navigate('/settings')}
//                 className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
//               >
//                 <Settings className="w-4 h-4 mr-2 text-slate-600" />
//                 設定
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-slate-100">
//                 <LogOut className="w-4 h-4 mr-2" />
//                 ログアウト
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside
//           className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//           }`}
//         >
//           <nav className="p-4 space-y-2 mt-4">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.path;
              
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setIsSidebarOpen(false)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:text-slate-700 ${
//                     isActive
//                       ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:text-slate-200 shadow-lg shadow-red-200'
//                       : 'text-slate-700 hover:bg-slate-100'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </aside>

//         {/* Overlay for mobile */}
//         {isSidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//             onClick={() => setIsSidebarOpen(false)}
//           />
//         )}

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Sparkles,
  LayoutDashboard,
  ScanSearch,
  History,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  User,
  Upload,
  Wrench,
  MessageCircle,
  ClipboardCheck,
  Users,
  Shield,
  Database,
  LineChart,
  FileText,
  CreditCard
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const firstname = user?.firstname ?? '';
  const lastname = user?.lastname ?? '';
  const email = user?.email ?? '';

  // Menu items for each role
  const clientMenuItems = [
    // { icon: LayoutDashboard, label: 'ダッシュボード', path: '/dashboard' },
    { icon: Upload, label: '損傷アップロード', path: '/client/assessment' },
    { icon: History, label: '評価履歴', path: '/client/history' },
    { icon: Wrench, label: '修理推奨', path: '/client/repair' },
    { icon: MessageCircle, label: 'サポート', path: '/client/support' },
  ];

  const assessorMenuItems = [
    { icon: LayoutDashboard, label: 'ダッシュボード', path: '/dashboard' },
    { icon: ClipboardCheck, label: '評価キュー', path: '/assessor/queue' },
    { icon: ScanSearch, label: 'ケースレビュー', path: '/assessor/review' },
    { icon: Database, label: 'AI評価モード', path: '/assessor/ai-review' },
    { icon: History, label: '全ケース', path: '/assessor/cases' },
    { icon: LineChart, label: '統計/KPI', path: '/assessor/stats' },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'ダッシュボード', path: '/dashboard' },
    { icon: Users, label: 'ユーザー管理', path: '/admin/users' },
    { icon: Shield, label: '権限管理', path: '/admin/roles' },
    { icon: ClipboardCheck, label: '評価概要', path: '/admin/assessments' },
    { icon: Database, label: 'AIモデル設定', path: '/admin/ai-models' },
    { icon: ScanSearch, label: 'トレーニングデータ', path: '/admin/training-data' },
    { icon: FileText, label: 'システムログ', path: '/admin/logs' },
    { icon: LineChart, label: '分析', path: '/admin/analytics' },
    { icon: CreditCard, label: '料金管理', path: '/admin/billing' },
    { icon: FileText, label: 'CMS', path: '/admin/cms' },
  ];

  // Common items for all roles
  const commonMenuItems = [
    { icon: Settings, label: '設定', path: '/settings' },
    { icon: HelpCircle, label: 'ヘルプ', path: '/help' },
  ];

  // Get menu items based on user role
  const getMenuItems = () => {
    if (!user) return [];
    
    let roleMenuItems = [];
    switch (user.role) {
      case 'Client':
        roleMenuItems = clientMenuItems;
        break;
      case 'Assessor':
        roleMenuItems = assessorMenuItems;
        break;
      case 'Admin':
        roleMenuItems = adminMenuItems;
        break;
      default:
        roleMenuItems = clientMenuItems;
    }
    
    return [...roleMenuItems, ...commonMenuItems];
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const getRoleBadge = (role: string) => {
    const roleMap = {
      client: { label: 'Client', color: 'from-blue-600 to-blue-700' },
      assessor: { label: 'Assessor', color: 'from-purple-600 to-purple-700' },
      admin: { label: 'Admin', color: 'from-red-600 to-red-700' },
    };
    return roleMap[role as keyof typeof roleMap] || roleMap.client;
  };

  const roleBadge = getRoleBadge(user.role);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="tracking-tight text-slate-900">Car Damage Assessment</span>
            </Link>

            {/* Role Badge */}
            <div className={`hidden md:block px-3 py-1 bg-gradient-to-r ${roleBadge.color} text-white text-sm rounded-full`}>
              {roleBadge.label}
            </div>
          </div>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-slate-100 flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="text-right hidden sm:block">
                  <p className="text-slate-900">{user.firstname} {user.lastname}</p>
                  <p className="text-slate-500">{user.email}</p>
                </div>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleBadge.color} flex items-center justify-center text-white`}>
                  {user.firstname.substring(0, 1)}{user.lastname.substring(0, 1)}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 text-red-600">
              <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/client/profile')} className='text-slate-700 hover:bg-slate-100'>
                <User className="w-4 h-4 mr-2 text-slate-700" />
                プロフィール設定
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className='text-slate-700 hover:bg-slate-100'>
                <Settings className="w-4 h-4 mr-2 text-slate-700" />
                設定
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-slate-100">
                <LogOut className="w-4 h-4 mr-" />
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${roleBadge.color} text-white shadow-lg`
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}