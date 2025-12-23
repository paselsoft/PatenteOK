
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { HomePage } from './pages/HomePage';
import { Sidebar } from './components/ui/Sidebar';
import { BottomNav } from './components/ui/BottomNav';
import { ProfilePage } from './pages/ProfilePage';
import { DocumentsPage } from './pages/DocumentsPage';
import { OfficePage } from './pages/OfficePage';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/office" element={<OfficePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
      <BottomNav />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ToastProvider>
          <AppProvider>
            <AppLayout />
          </AppProvider>
        </ToastProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;