export const QUIZ_CONFIG = {
    TOTAL_QUESTIONS: 10,
    TIME_PER_QUESTION: 30, // seconds
    DIFFICULTY_LEVELS: {
      EASY: 'easy',
      MEDIUM: 'medium',
      HARD: 'hard'
    }
  };
  
  export const API_ENDPOINTS = {
    TRIVIA_BASE: 'https://opentdb.com/api.php',
    SESSION_TOKEN: 'https://opentdb.com/api_token.php?command=request'
  };
  
  export const ROUTES = {
    HOME: '/',
    QUIZ: '/quiz',
    RESULTS: '/results'
  };