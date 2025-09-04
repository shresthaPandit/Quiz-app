import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button.jsx';
import { QUIZ_CONFIG } from '../utils/constants.js';
import { getHighScores, clearHighScores, cleanDuplicateScores, getPlayerPreferences, savePlayerPreferences } from '../utils/localStorage.js';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Get player preferences from localStorage
  const playerPrefs = getPlayerPreferences();
  const [selectedDifficulty, setSelectedDifficulty] = useState(playerPrefs.defaultDifficulty || 'mixed');
  const [questionCount, setQuestionCount] = useState(playerPrefs.defaultQuestionCount || QUIZ_CONFIG.TOTAL_QUESTIONS);
  const [playerName, setPlayerName] = useState(playerPrefs.lastPlayerName || '');

  // Clean duplicates on component mount
  React.useEffect(() => {
    cleanDuplicateScores();
  }, []);

  const highScores = getHighScores();

  const handleStartQuiz = () => {
    // Validate name input
    if (!playerName.trim()) {
      alert('Please enter your name to start the quiz!');
      return;
    }
    
    // Save player preferences to localStorage
    savePlayerPreferences({
      defaultDifficulty: selectedDifficulty,
      defaultQuestionCount: questionCount,
      lastPlayerName: playerName.trim()
    });
    
    navigate('/quiz', { 
      state: { 
        difficulty: selectedDifficulty,
        questionCount: questionCount,
        playerName: playerName.trim()
      } 
    });
  };

  const handleClearHighScores = () => {
    clearHighScores();
    window.location.reload(); // Simple way to refresh the component
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Quiz Master
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Challenge yourself with trivia questions from various categories. 
            Test your knowledge and track your progress!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Quiz Configuration */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Start New Quiz</h2>
            
            {/* Player Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
                maxLength={30}
              />
              <p className="text-xs text-gray-500 mt-1">
                Your name will be saved with your high scores
              </p>
            </div>
            
            {/* Difficulty Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'mixed', label: 'Mixed', icon: '🎯', desc: 'All difficulties' },
                  { value: 'easy', label: 'Easy', icon: '😊', desc: 'Beginner friendly' },
                  { value: 'medium', label: 'Medium', icon: '🤔', desc: 'Moderate challenge' },
                  { value: 'hard', label: 'Hard', icon: '😤', desc: 'Expert level' }
                ].map((difficulty) => (
                  <button
                    key={difficulty.value}
                    onClick={() => setSelectedDifficulty(difficulty.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      selectedDifficulty === difficulty.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      <span className="text-2xl mr-2">{difficulty.icon}</span>
                      <span className="font-medium text-gray-800">{difficulty.label}</span>
                    </div>
                    <p className="text-xs text-gray-600">{difficulty.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Number of Questions
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-medium min-w-[3rem] text-center">
                  {questionCount}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 questions</span>
                <span>20 questions</span>
              </div>
            </div>

            {/* Start Button */}
            <Button
              onClick={handleStartQuiz}
              variant="primary"
              size="lg"
              className="w-full text-lg"
            >
              🚀 Start Quiz
            </Button>

            {/* Quiz Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Quiz Features:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Timer for each question (30 seconds)</li>
                <li>• Multiple choice questions</li>
                <li>• Detailed results and explanations</li>
                <li>• Track your high scores</li>
                <li>• Questions from Open Trivia Database</li>
              </ul>
            </div>
          </div>

          {/* High Scores & Stats */}
          <div className="space-y-6">
            {/* High Scores */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🏆 High Scores</h2>
                {highScores.length > 0 && (
                  <button
                    onClick={handleClearHighScores}
                    className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {highScores.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-gray-500">No high scores yet!</p>
                  <p className="text-sm text-gray-400">Take a quiz to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {highScores.map((score, index) => (
                    <div 
                      key={score.id} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index === 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`text-sm font-bold w-6 ${
                          index === 0 ? 'text-yellow-600' : 'text-gray-500'
                        }`}>
                          #{index + 1}
                        </span>
                        <div className="ml-3">
                          <div className="font-medium text-gray-800">
                            {score.playerName || 'Anonymous'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {score.score}/{score.totalQuestions} • {new Date(score.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        score.percentage >= 90 ? 'text-green-600' :
                        score.percentage >= 80 ? 'text-blue-600' :
                        score.percentage >= 70 ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {score.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Your Stats</h2>
              
              {highScores.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Take your first quiz to see stats!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {highScores.length}
                    </div>
                    <div className="text-sm text-gray-600">Quizzes Taken</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(highScores.reduce((acc, score) => acc + score.percentage, 0) / highScores.length)}%
                    </div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.max(...highScores.map(s => s.percentage))}%
                    </div>
                    <div className="text-sm text-gray-600">Best Score</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {highScores.filter(s => s.percentage >= 80).length}
                    </div>
                    <div className="text-sm text-gray-600">Great Scores</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;