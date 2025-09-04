import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard.jsx';
import ProgressBar from './ProgressBar.jsx';
import LoadingSpinner from '../Common/LoadingSpinner.jsx';
import ErrorMessage from '../Common/ErrorMessage.jsx';
import { useQuiz } from '../../hooks/useQuiz.js';

const QuizContainer = ({ questions, loading, error, onRetry, retryCount = 0, playerName = 'Player' }) => {
  const navigate = useNavigate();
  
  const {
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    timeRemaining,
    isCompleted,
    score,
    progress,
    selectAnswer,
    handleNextQuestion,
    handlePreviousQuestion,
    canGoNext,
    canGoPrevious,
    isLastQuestion
  } = useQuiz(questions);

  // Handle quiz completion
  React.useEffect(() => {
    if (isCompleted) {
      // Pass results to the results page
      navigate('/results', {
        state: {
          score,
          totalQuestions: questions.length,
          userAnswers,
          questions,
          percentage: Math.round((score / questions.length) * 100),
          playerName
        }
      });
    }
  }, [isCompleted, score, questions, userAnswers, navigate]);

  if (loading) {
    return <LoadingSpinner size="lg" message="Loading quiz questions..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={onRetry}
        retryCount={retryCount}
      />
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <ErrorMessage 
        message="No questions available. Please try again."
        onRetry={onRetry}
        retryCount={retryCount}
      />
    );
  }

  if (!currentQuestion) {
    return <LoadingSpinner message="Preparing question..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <ProgressBar 
          current={progress.current}
          total={progress.total}
          timeRemaining={timeRemaining}
        />

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          onSelectAnswer={selectAnswer}
          onNext={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          isLastQuestion={isLastQuestion}
          timeRemaining={timeRemaining}
          questionNumber={progress.current}
          totalQuestions={progress.total}
        />

        {/* Quiz Stats */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-6 bg-white/70 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-sm">
              <span className="font-medium text-gray-600">Category:</span>
              <span className="ml-2 text-gray-800">{currentQuestion.category}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-600">Difficulty:</span>
              <span className={`ml-2 capitalize font-medium ${
                currentQuestion.difficulty === 'easy' ? 'text-green-600' :
                currentQuestion.difficulty === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;