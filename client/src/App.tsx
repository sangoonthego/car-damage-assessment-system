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
import { CaseReviewPage } from './pages/assessor/review/CaseReviewPage';
import { AIReviewModePage } from './pages/assessor/review/AIReviewModePage';
import { AssessorStatsPage } from './pages/assessor/AssessorStatsPage';

// Admin pages
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { RoleManagementPage } from './pages/admin/management/RoleManagementPage';
import { AIModelSettingsPage } from './pages/admin/ai/AIModelSettingsPage';
import { SystemLogsPage } from './pages/admin/management/SystemLogsPage';
import { AnalyticsDashboardPage } from './pages/admin/statistic/AnalyticsDashboardPage';
import { BillingPage } from './pages/admin/statistic/BillingPage';
import { CMSPage } from './pages/admin/management/CMSPage';
import { TrainingDataPage } from './pages/admin/ai/TrainingDataPage';

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
          {/* <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} /> */}
          <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
          <Route path="/help" element={<DashboardLayout><HelpPage /></DashboardLayout>} />
          
          {/* Client routes */}
          <Route path="/client/assessment" element={<DashboardLayout><AssessmentPage /></DashboardLayout>} />
          <Route path="/client/history" element={<DashboardLayout><ClientHistoryPage /></DashboardLayout>} />
          <Route path="/client/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
          <Route path="/client/repair" element={<DashboardLayout><RepairRecommendationPage /></DashboardLayout>} />
          <Route path="/client/support" element={<DashboardLayout><SupportPage /></DashboardLayout>} />
          
          {/* Assessor routes */}
          <Route path="/assessor/queue" element={<DashboardLayout><AssessmentQueuePage /></DashboardLayout>} />
          <Route path="/assessor/review" element={<DashboardLayout><CaseReviewPage /></DashboardLayout>} />
          <Route path="/assessor/ai-review" element={<DashboardLayout><AIReviewModePage /></DashboardLayout>} />
          <Route path="/assessor/cases" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
          <Route path="/assessor/stats" element={<DashboardLayout><AssessorStatsPage /></DashboardLayout>} />
          
          {/* Admin routes */}
          <Route path="/admin/users" element={<DashboardLayout><UserManagementPage /></DashboardLayout>} />
          <Route path="/admin/roles" element={<DashboardLayout><RoleManagementPage /></DashboardLayout>} />
          <Route path="/admin/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/admin/assessments" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
          <Route path="/admin/ai-models" element={<DashboardLayout><AIModelSettingsPage /></DashboardLayout>} />
          <Route path="/admin/training-data" element={<DashboardLayout><TrainingDataPage /></DashboardLayout>} />
          <Route path="/admin/logs" element={<DashboardLayout><SystemLogsPage /></DashboardLayout>} />
          <Route path="/admin/analytics" element={<DashboardLayout><AnalyticsDashboardPage /></DashboardLayout>} />
          <Route path="/admin/billing" element={<DashboardLayout><BillingPage /></DashboardLayout>} />
          <Route path="/admin/cms" element={<DashboardLayout><CMSPage /></DashboardLayout>} />
          
          {/* Catch all */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}