import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import ReportStep1 from './pages/ReportStep1';
import ReportStep2 from './pages/ReportStep2';
import ReportStep3 from './pages/ReportStep3';
import ReportStep4 from './pages/ReportStep4';
import Processing from './pages/Processing';
import Result from './pages/Result';
import AwarenessHub from './pages/AwarenessHub';
import AwarenessModules from './pages/AwarenessModules';
import AwarenessLearn from './pages/AwarenessLearn';
import Quiz from './pages/Quiz';
import QuizComplete from './pages/QuizComplete';
import ITLogin from './pages/ITLogin';
import ITDashboard from './pages/ITDashboard';
import ITReportDetail from './pages/ITReportDetail';

import { ReportProvider } from './context/ReportContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/health`);
      } catch (e) {}
    };
    wakeUpBackend();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <ReportProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/report/step1" element={<ReportStep1 />} />
              <Route path="/report/step2" element={<ReportStep2 />} />
              <Route path="/report/step3" element={<ReportStep3 />} />
              <Route path="/report/step4" element={<ReportStep4 />} />
              <Route path="/processing" element={<Processing />} />
              <Route path="/result" element={<Result />} />
              <Route path="/awareness" element={<AwarenessHub />} />
              <Route path="/awareness/modules" element={<AwarenessModules />} />
              <Route path="/awareness/learn" element={<AwarenessLearn />} />
              <Route path="/awareness/quiz" element={<Quiz />} />
              <Route path="/awareness/complete" element={<QuizComplete />} />
              <Route path="/it/login" element={<ITLogin />} />
              <Route path="/it/dashboard" element={<ITDashboard />} />
              <Route path="/it/report/:tokenId" element={<ITReportDetail />} />
            </Routes>
          </ReportProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
