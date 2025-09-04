// Question structure after normalization
export const QuestionSchema = {
    id: '', // unique identifier
    question: '', // decoded question text
    options: [], // array of 4 options (shuffled)
    correctAnswer: '', // correct option text
    difficulty: '', // easy/medium/hard
    category: '', // question category
    type: 'multiple' // question type
  };
  
  // Quiz state structure
  export const QuizStateSchema = {
    questions: [], // array of QuestionSchema
    currentQuestionIndex: 0,
    userAnswers: [], // array of selected answers
    score: 0,
    isLoading: false,
    error: null,
    isCompleted: false,
    timeRemaining: 30
  };