import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import AnalysisResultPage from './pages/AnalysisResultPage';
import LoadingPageAnimation from './components/LoadingPageAnimation';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/analysis-result" element={<AnalysisResultPage />} />
        <Route path="/loading" element={<LoadingPageAnimation factsFile='/facts.json' />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
