import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InterviewPage from './pages/InterviewPage';
import InterviewSetupPage from './pages/InterviewSetupPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import MyResumesPage from './pages/MyResumesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
        <Route path="/interview/setup" element={<InterviewSetupPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/my-resumes" element={<MyResumesPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
