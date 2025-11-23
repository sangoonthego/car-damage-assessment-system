import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/login/LoginPage';
import { SignupPage } from './pages/signup/SignupPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { HistoryPage } from './pages/util/HistoryPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/util/SettingsPage';
import { HelpPage } from './pages/util/HelpPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Dashboard routes with layout */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/assessment" element={<DashboardLayout><AssessmentPage /></DashboardLayout>} />
        <Route path="/history" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
        <Route path="/help" element={<DashboardLayout><HelpPage /></DashboardLayout>} />
        
        {/* Catch all */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}