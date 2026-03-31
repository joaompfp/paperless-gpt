import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DocumentProcessor from './DocumentProcessor';
import ExperimentalOCR from './ExperimentalOCR'; // New component
import History from './History';
import Settings from './components/Settings';
import AdhocAnalysis from './AdhocAnalysis';
import './App.css';

interface VersionInfo {
  version: string;
  commit: string;
  buildDate: string;
}

const App: React.FC = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

  // Fetch version information on component mount
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('./api/version');
        if (response.ok) {
          const data = await response.json();
          setVersionInfo(data);
        }
      } catch (error) {
        console.error('Failed to fetch version information:', error);
      }
    };
    fetchVersion();
  }, []);

  // Keep the base path (path prefix from reverse-proxy) and remove the app path,
  // convert "/" to "" so Router basename is empty at root.
  const rawBasename = window.location.pathname.replace(/(\/[^/]+)$/, "/");
  const basename = rawBasename === "/" ? "" : rawBasename;
  return (
    <>
      <nav className="sos-navbar">
        <svg viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg" className="sos-navbar-logo">
          <path d="M50 5 C45 5 42 9 42 14 L42 45 C39 43 35 43 32 45 C29 47 28 51 28 55 L28 70 C28 82 38 95 50 95 C62 95 72 82 72 70 L72 55 C72 51 71 47 68 45 C65 43 61 43 58 45 L58 14 C58 9 55 5 50 5Z"/>
        </svg>
        <div className="sos-navbar-titles">
          <span className="sos-navbar-title">Arquivo SOS Racismo</span>
          <span className="sos-navbar-tagline">Paperless GPT</span>
        </div>
      </nav>
      <Router basename={basename}>
        <div className="flex h-screen flex-col">
          <div className="flex flex-1 overflow-hidden">
            <Sidebar onSelectPage={(page) => console.log(page)} />
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<DocumentProcessor />} />
                  <Route path="/adhoc-analysis" element={<AdhocAnalysis />} />
                  <Route path="/experimental-ocr" element={<ExperimentalOCR />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
              <footer className="border-t-2 border-gray-200 bg-blue-50 p-5 text-center text-base text-gray-700 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
                {versionInfo && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">arquivo-sos-ia</span> {versionInfo.version}
                    {versionInfo.commit && versionInfo.commit !== 'devCommit' && versionInfo.commit.length >= 7 && (
                      <span className="ml-2">({versionInfo.commit.slice(0, 7)})</span>
                    )}
                  </p>
                )}
              </footer>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
