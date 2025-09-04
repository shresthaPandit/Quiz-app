import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Common/Button.jsx';
import ScoreCard from './ScoreCard.jsx';
import { saveHighScore, saveQuizStats } from '../utils/localStorage.js';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scoreSaved, setScoreSaved] = React.useState(false);
  
  // Get results from navigation state
  const results = location.state;

  // Redirect if no results data
  React.useEffect(() => {
    if (!results) {
      navigate('/');
    }
  }, [results, navigate]);

  if (!results) {
    return null; // Will redirect
  }

  const { score, totalQuestions, userAnswers, questions, percentage, playerName = 'Player' } = results;

  const handleRestartQuiz = () => {
    navigate('/quiz');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Save high score and stats to localStorage (only once)
  React.useEffect(() => {
    if (!scoreSaved && results) {
      // Save high score
      const scoreData = {
        score,
        totalQuestions,
        percentage,
        playerName
      };
      
      saveHighScore(scoreData);
      
      // Save quiz statistics
      const statsData = {
        totalQuestions,
        correctAnswers: score,
        percentage
      };
      
      saveQuizStats(statsData);
      
      setScoreSaved(true);
    }
  }, [score, totalQuestions, percentage, playerName, scoreSaved, results]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Score Card */}
        <ScoreCard 
          score={score}
          totalQuestions={totalQuestions}
          percentage={percentage}
          playerName={playerName}
        />

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Results</h2>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div 
                  key={question.id} 
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800 flex-1 mr-4">
                      {index + 1}. {question.question}
                    </h3>
                    <div className={`flex items-center ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600 w-24">Your answer:</span>
                      <span className={`${
                        isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {userAnswer || 'No answer selected'}
                      </span>
                    </div>
                    
                    {!isCorrect && (
                      <div className="flex items-center">
                        <span className="font-medium text-gray-600 w-24">Correct answer:</span>
                        <span className="text-green-700">{question.correctAnswer}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600 w-24">Category:</span>
                      <span className="text-gray-700">{question.category}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600 w-24">Difficulty:</span>
                      <span className={`capitalize ${
                        question.difficulty === 'easy' ? 'text-green-600' :
                        question.difficulty === 'medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleRestartQuiz}
            variant="primary"
            size="lg"
            className="px-8"
          >
            Take Quiz Again
          </Button>
          
          <Button 
            onClick={handleGoHome}
            variant="secondary"
            size="lg"
            className="px-8"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;