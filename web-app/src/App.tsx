import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DocumentProcessor from './DocumentProcessor';
import ExperimentalOCR from './ExperimentalOCR';
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

  const rawBasename = window.location.pathname.replace(/(\/[^/]+)$/, "/");
  const basename = rawBasename === "/" ? "" : rawBasename;

  return (
    <>
      <nav className="sos-navbar">
        <a className="sos-navbar-brand" href="/sos-arquivo/">
          <img src="/sos-arquivo/logo/SOSRacismo_hand_logo.svg" alt="SOS Racismo" height="32" />
          <div className="sos-navbar-brand-text">
            <span className="sos-navbar-title">Arquivo SOS Racismo</span>
            <span className="sos-navbar-byline">Paperless GPT</span>
          </div>
        </a>
        <div className="sos-navbar-links">
          <a className="sos-navbar-link" href="/sos-arquivo/">Arquivo</a>
          <a className="sos-navbar-link" href="/sos-arquivo/ajuda/">Ajuda</a>
          <a className="sos-navbar-link active" href="/sos-arquivo/ia/">IA</a>
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
              <footer className="border-t border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500">
                <a
                  href="https://github.com/icereed/paperless-gpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-700"
                >
                  paperless-gpt
                </a>
                {' — adaptado para SOS Racismo'}
                {versionInfo && versionInfo.commit && versionInfo.commit !== 'devCommit' && versionInfo.commit.length >= 7 && (
                  <span className="ml-2 text-gray-400">({versionInfo.commit.slice(0, 7)})</span>
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
