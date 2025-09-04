import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Home/HomePage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import ResultsPage from './components/Results/ResultsPage.jsx';
import StorageStatus from './components/Common/StorageStatus.jsx';
import { ROUTES } from './components/utils/constants.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Route */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          
          {/* Quiz Route */}
          <Route path={ROUTES.QUIZ} element={<QuizPage />} />
          
          {/* Results Route */}
          <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
        
        {/* Storage Status Indicator */}
        <StorageStatus />
      </div>
    </Router>
  );
}

export default App;