import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

// Client pages
import { UploadDamagePage } from './pages/client/UploadDamagePage';
import { ClientHistoryPage } from './pages/client/ClientHistoryPage';
import { RepairRecommendationPage } from './pages/client/RepairRecommendationPage';
import { SupportPage } from './pages/client/SupportPage';

// Assessor pages
import { AssessmentQueuePage } from './pages/assessor/AssessmentQueuePage';

// Admin pages
import { UserManagementPage } from './pages/admin/UserManagementPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Common dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/assessment" element={<DashboardLayout><AssessmentPage /></DashboardLayout>} />
          <Route path="/history" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
          <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
          <Route path="/help" element={<DashboardLayout><HelpPage /></DashboardLayout>} />
          
          {/* Client routes */}
          <Route path="/client/upload" element={<DashboardLayout><UploadDamagePage /></DashboardLayout>} />
          <Route path="/client/history" element={<DashboardLayout><ClientHistoryPage /></DashboardLayout>} />
          <Route path="/client/repair" element={<DashboardLayout><RepairRecommendationPage /></DashboardLayout>} />
          <Route path="/client/support" element={<DashboardLayout><SupportPage /></DashboardLayout>} />
          
          {/* Assessor routes */}
          <Route path="/assessor/queue" element={<DashboardLayout><AssessmentQueuePage /></DashboardLayout>} />
          <Route path="/assessor/review" element={<DashboardLayout><AssessmentPage /></DashboardLayout>} />
          <Route path="/assessor/cases" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
          <Route path="/assessor/stats" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          
          {/* Admin routes */}
          <Route path="/admin/users" element={<DashboardLayout><UserManagementPage /></DashboardLayout>} />
          <Route path="/admin/roles" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
          <Route path="/admin/assessments" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
          <Route path="/admin/ai-models" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
          <Route path="/admin/logs" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
          <Route path="/admin/analytics" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/admin/billing" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
          
          {/* Catch all */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
