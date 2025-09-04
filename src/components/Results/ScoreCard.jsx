import React from 'react';

const ScoreCard = ({ score, totalQuestions, percentage, playerName = 'Player' }) => {
  // Determine performance level and styling
  const getPerformanceData = (percentage) => {
    if (percentage >= 90) {
      return {
        level: 'Excellent!',
        message: 'Outstanding performance! You nailed it!',
        color: 'text-green-600',
        bgColor: 'bg-green-500',
        icon: '🏆'
      };
    } else if (percentage >= 80) {
      return {
        level: 'Very Good!',
        message: 'Great job! You did really well!',
        color: 'text-blue-600',
        bgColor: 'bg-blue-500',
        icon: '🎉'
      };
    } else if (percentage >= 70) {
      return {
        level: 'Good!',
        message: 'Nice work! Keep it up!',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-500',
        icon: '👍'
      };
    } else if (percentage >= 50) {
      return {
        level: 'Not Bad!',
        message: 'You can do better with some practice!',
        color: 'text-orange-600',
        bgColor: 'bg-orange-500',
        icon: '📚'
      };
    } else {
      return {
        level: 'Keep Trying!',
        message: 'Practice makes perfect! Try again!',
        color: 'text-red-600',
        bgColor: 'bg-red-500',
        icon: '💪'
      };
    }
  };

  const performanceData = getPerformanceData(percentage);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
      {/* Congratulations Header */}
      <div className="mb-6">
        <div className="text-6xl mb-4">{performanceData.icon}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Quiz Complete, {playerName}!
        </h1>
        <p className={`text-xl font-semibold ${performanceData.color}`}>
          {performanceData.level}
        </p>
        <p className="text-gray-600 mt-2">
          {performanceData.message}
        </p>
      </div>

      {/* Score Display */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Circular Progress */}
          <div className="w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center relative">
            <div 
              className={`absolute inset-0 rounded-full border-8 border-transparent`}
              style={{
                transform: `rotate(${(percentage / 100) * 360 - 90}deg)`,
                borderTopColor: performanceData.bgColor === 'bg-green-500' ? '#10b981' :
                              performanceData.bgColor === 'bg-blue-500' ? '#3b82f6' :
                              performanceData.bgColor === 'bg-yellow-500' ? '#f59e0b' :
                              performanceData.bgColor === 'bg-orange-500' ? '#f97316' :
                              '#ef4444'
              }}
            ></div>
            <div className="text-center z-10">
              <div className="text-3xl font-bold text-gray-800">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">
                {score}/{totalQuestions}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {score}
          </div>
          <div className="text-sm text-gray-600">
            Correct Answers
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {totalQuestions - score}
          </div>
          <div className="text-sm text-gray-600">
            Incorrect Answers
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round((score / totalQuestions) * 100)}%
          </div>
          <div className="text-sm text-gray-600">
            Accuracy
          </div>
        </div>
      </div>

      {/* High Score Achievement */}
      {percentage >= 80 && (
        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <div className="flex items-center justify-center text-yellow-700">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-semibold">
              New High Score! Well done!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;