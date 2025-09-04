import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizContainer from '../components/Quiz/QuizContainer.jsx';
import { triviaApi } from '../components/services/triviaApi.js';
import { QUIZ_CONFIG } from '../components/utils/constants.js';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get quiz configuration from navigation state or use defaults
  const quizConfig = location.state || {
    difficulty: 'mixed',
    questionCount: QUIZ_CONFIG.TOTAL_QUESTIONS,
    playerName: 'Player'
  };

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch questions when component mounts
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Reset used questions for a fresh start
      triviaApi.resetUsedQuestions();
      
      const fetchedQuestions = await triviaApi.fetchQuestions(
        quizConfig.questionCount,
        quizConfig.difficulty === 'mixed' ? 'mixed' : quizConfig.difficulty
      );
      
      setQuestions(fetchedQuestions);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      let errorMessage = err.message;
      
      // Provide more user-friendly error messages
      if (err.message.includes('429') || err.message.includes('Rate limit')) {
        errorMessage = 'The quiz service is temporarily busy. Please wait a moment and try again.';
      } else if (err.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (err.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      setError(errorMessage);
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizConfig.questionCount, quizConfig.difficulty]);

  // Handle retry functionality
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchQuestions();
  };

  // Handle navigation back to home if no config provided
  useEffect(() => {
    if (!location.state) {
      // If no quiz configuration, redirect to home
      // This happens when user directly visits /quiz URL
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <>
      {/* Quiz Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to leave? Your progress will be lost.')) {
                  navigate('/');
                }
              }}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">Quiz Master</h1>
              <p className="text-sm text-gray-600">
                Welcome, <span className="font-semibold text-blue-600">{quizConfig.playerName}</span>!
              </p>
              <p className="text-xs text-gray-500">
                {quizConfig.difficulty === 'mixed' ? 'Mixed Difficulty' : `${quizConfig.difficulty} Level`} • 
                {quizConfig.questionCount} Questions
              </p>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <QuizContainer
        questions={questions}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        retryCount={retryCount}
        playerName={quizConfig.playerName}
      />
    </>
  );
};

export default QuizPage;