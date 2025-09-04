import React from 'react';

const ProgressBar = ({ current, total, timeRemaining }) => {
  const percentage = Math.round((current / total) * 100);
  const timePercentage = Math.round((timeRemaining / 30) * 100);

  return (
    <div className="w-full mb-6">
      {/* Question Progress */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {percentage}% Complete
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Timer */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Time Remaining
        </span>
        <span className={`text-sm font-medium ${timeRemaining <= 10 ? 'text-red-600' : 'text-gray-600'}`}>
          {timeRemaining}s
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeRemaining <= 10 ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{ width: `${timePercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;