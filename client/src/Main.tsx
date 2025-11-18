import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/login/LoginPage';
import { SignupPage } from './pages/signup/SignupPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}