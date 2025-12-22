
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Future routes: /profile, /documents/:id */}
      </Routes>
      <Footer />
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