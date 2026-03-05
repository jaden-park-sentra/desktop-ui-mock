import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import AppLayout from './components/app-layout';
import HomePage from './pages/home';
import MeetingNotesPage from './pages/meeting-notes';
import MeetingDetailPage from './pages/meeting-detail';
import MeetingDetailTranscriptPage from './pages/meeting-detail-transcript';
import MeetingDetailVideoPage from './pages/meeting-detail-video';
import DeepResearchPage from './pages/deep-research';
import CommitmentsPage from './pages/commitments';
import WeeklyReportsPage from './pages/weekly-reports';
import ReportsExpandedPage from './pages/reports-expanded';
import ReportDetailPage from './pages/report-detail';
import RadarPage from './pages/radar';
import IntegrationsPage from './pages/integrations';
import ConnectionsPage from './pages/connections';
import ConnectionDetailPage from './pages/connection-detail';
import SettingsPage from './pages/settings';

const App = () => {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/meeting-notes" element={<MeetingNotesPage />} />
          <Route path="/meeting-detail" element={<MeetingDetailPage />} />
          <Route path="/meeting-detail-transcript" element={<MeetingDetailTranscriptPage />} />
          <Route path="/meeting-detail-video" element={<MeetingDetailVideoPage />} />
          <Route path="/deep-research" element={<DeepResearchPage />} />
          <Route path="/commitments" element={<CommitmentsPage />} />
          <Route path="/weekly-reports" element={<WeeklyReportsPage />} />
          <Route path="/reports-expanded" element={<ReportsExpandedPage />} />
          <Route path="/report-detail" element={<ReportDetailPage />} />
          <Route path="/radar" element={<RadarPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/connection-detail" element={<ConnectionDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
