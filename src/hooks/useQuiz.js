import { useState, useEffect, useCallback } from 'react';
import { QUIZ_CONFIG } from '../components/utils/constants.js';

export const useQuiz = (questions = []) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_CONFIG.TIME_PER_QUESTION);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      // Auto-submit when time runs out
      handleNextQuestion();
    }
  }, [timeRemaining, isCompleted]);

  // Calculate score whenever userAnswers change
  useEffect(() => {
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === questions[index]?.correctAnswer
    ).length;
    setScore(correctAnswers);
  }, [userAnswers, questions]);

  const selectAnswer = useCallback((selectedOption) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newAnswers);
  }, [currentQuestionIndex, userAnswers]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(QUIZ_CONFIG.TIME_PER_QUESTION);
    } else {
      setIsCompleted(true);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setTimeRemaining(QUIZ_CONFIG.TIME_PER_QUESTION);
    }
  }, [currentQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimeRemaining(QUIZ_CONFIG.TIME_PER_QUESTION);
    setIsCompleted(false);
    setScore(0);
  }, []);

  const getCurrentQuestion = useCallback(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  const getProgress = useCallback(() => {
    return {
      current: currentQuestionIndex + 1,
      total: questions.length,
      percentage: Math.round(((currentQuestionIndex + 1) / questions.length) * 100)
    };
  }, [currentQuestionIndex, questions.length]);

  return {
    // State
    currentQuestionIndex,
    userAnswers,
    timeRemaining,
    isCompleted,
    score,
    
    // Computed values
    currentQuestion: getCurrentQuestion(),
    progress: getProgress(),
    
    // Actions
    selectAnswer,
    handleNextQuestion,
    handlePreviousQuestion,
    resetQuiz,
    
    // Helpers
    canGoNext: userAnswers[currentQuestionIndex] !== undefined,
    canGoPrevious: currentQuestionIndex > 0,
    isLastQuestion: currentQuestionIndex === questions.length - 1
  };
};