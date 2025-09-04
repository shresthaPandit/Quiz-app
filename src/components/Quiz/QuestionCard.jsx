import React from 'react';
import Button from '../Common/Button.jsx';

const QuestionCard = ({ 
  question, 
  options, 
  selectedAnswer, 
  onSelectAnswer, 
  onNext, 
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
  timeRemaining,
  questionNumber,
  totalQuestions
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${timeRemaining <= 10 ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className={`text-sm font-medium ${timeRemaining <= 10 ? 'text-red-600' : 'text-gray-600'}`}>
              {timeRemaining}s
            </span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
          {question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          
          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold mr-4 ${
                  isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {optionLabel}
                </span>
                <span className="text-gray-800 font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          onClick={onPrevious}
          variant="secondary"
          disabled={!canGoPrevious}
          className="px-6"
        >
          Previous
        </Button>

        <div className="text-sm text-gray-500">
          {!selectedAnswer && "Please select an answer to continue"}
        </div>

        <Button
          onClick={onNext}
          variant="primary"
          disabled={!canGoNext}
          className="px-6"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;