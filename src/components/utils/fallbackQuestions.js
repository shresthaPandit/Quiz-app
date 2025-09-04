// Expanded fallback questions to reduce repetition
export const FALLBACK_QUESTIONS = [
  // Geography Questions
  {
    id: 'fallback_1',
    question: 'What is the capital of France?',
    correctAnswer: 'Paris',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    difficulty: 'easy',
    category: 'Geography',
    type: 'multiple'
  },
  {
    id: 'fallback_2',
    question: 'Which country is known as the Land of the Rising Sun?',
    correctAnswer: 'Japan',
    options: ['China', 'Japan', 'South Korea', 'Thailand'],
    difficulty: 'easy',
    category: 'Geography',
    type: 'multiple'
  },
  {
    id: 'fallback_3',
    question: 'What is the largest country in the world by area?',
    correctAnswer: 'Russia',
    options: ['China', 'Russia', 'Canada', 'United States'],
    difficulty: 'medium',
    category: 'Geography',
    type: 'multiple'
  },
  {
    id: 'fallback_4',
    question: 'Which river is the longest in the world?',
    correctAnswer: 'Nile',
    options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'],
    difficulty: 'medium',
    category: 'Geography',
    type: 'multiple'
  },
  {
    id: 'fallback_5',
    question: 'What is the smallest country in the world?',
    correctAnswer: 'Vatican City',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    difficulty: 'hard',
    category: 'Geography',
    type: 'multiple'
  },

  // Science Questions
  {
    id: 'fallback_6',
    question: 'Which planet is known as the Red Planet?',
    correctAnswer: 'Mars',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    difficulty: 'easy',
    category: 'Science',
    type: 'multiple'
  },
  {
    id: 'fallback_7',
    question: 'What is the largest mammal in the world?',
    correctAnswer: 'Blue whale',
    options: ['African elephant', 'Blue whale', 'Giraffe', 'Hippopotamus'],
    difficulty: 'easy',
    category: 'Science',
    type: 'multiple'
  },
  {
    id: 'fallback_8',
    question: 'What is the chemical symbol for gold?',
    correctAnswer: 'Au',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    difficulty: 'medium',
    category: 'Science',
    type: 'multiple'
  },
  {
    id: 'fallback_9',
    question: 'What is the speed of light in vacuum?',
    correctAnswer: '299,792,458 m/s',
    options: ['299,792,458 m/s', '300,000,000 m/s', '299,000,000 m/s', '300,792,458 m/s'],
    difficulty: 'hard',
    category: 'Science',
    type: 'multiple'
  },
  {
    id: 'fallback_10',
    question: 'Which gas makes up most of Earth\'s atmosphere?',
    correctAnswer: 'Nitrogen',
    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Argon'],
    difficulty: 'medium',
    category: 'Science',
    type: 'multiple'
  },

  // Mathematics Questions
  {
    id: 'fallback_11',
    question: 'What is 2 + 2?',
    correctAnswer: '4',
    options: ['3', '4', '5', '6'],
    difficulty: 'easy',
    category: 'Mathematics',
    type: 'multiple'
  },
  {
    id: 'fallback_12',
    question: 'What is the smallest prime number?',
    correctAnswer: '2',
    options: ['1', '2', '3', '5'],
    difficulty: 'medium',
    category: 'Mathematics',
    type: 'multiple'
  },
  {
    id: 'fallback_13',
    question: 'What is the value of π (pi) to 2 decimal places?',
    correctAnswer: '3.14',
    options: ['3.14', '3.15', '3.13', '3.16'],
    difficulty: 'easy',
    category: 'Mathematics',
    type: 'multiple'
  },
  {
    id: 'fallback_14',
    question: 'What is 15 × 8?',
    correctAnswer: '120',
    options: ['100', '120', '140', '160'],
    difficulty: 'medium',
    category: 'Mathematics',
    type: 'multiple'
  },
  {
    id: 'fallback_15',
    question: 'What is the square root of 144?',
    correctAnswer: '12',
    options: ['10', '11', '12', '13'],
    difficulty: 'medium',
    category: 'Mathematics',
    type: 'multiple'
  },

  // History Questions
  {
    id: 'fallback_16',
    question: 'In which year did World War II end?',
    correctAnswer: '1945',
    options: ['1943', '1944', '1945', '1946'],
    difficulty: 'medium',
    category: 'History',
    type: 'multiple'
  },
  {
    id: 'fallback_17',
    question: 'Who was the first President of the United States?',
    correctAnswer: 'George Washington',
    options: ['John Adams', 'George Washington', 'Thomas Jefferson', 'Benjamin Franklin'],
    difficulty: 'easy',
    category: 'History',
    type: 'multiple'
  },
  {
    id: 'fallback_18',
    question: 'In which year did the Berlin Wall fall?',
    correctAnswer: '1989',
    options: ['1987', '1988', '1989', '1990'],
    difficulty: 'hard',
    category: 'History',
    type: 'multiple'
  },
  {
    id: 'fallback_19',
    question: 'Which ancient wonder of the world was located in Egypt?',
    correctAnswer: 'Great Pyramid of Giza',
    options: ['Hanging Gardens', 'Great Pyramid of Giza', 'Colossus of Rhodes', 'Lighthouse of Alexandria'],
    difficulty: 'medium',
    category: 'History',
    type: 'multiple'
  },
  {
    id: 'fallback_20',
    question: 'Who wrote the Declaration of Independence?',
    correctAnswer: 'Thomas Jefferson',
    options: ['George Washington', 'Benjamin Franklin', 'Thomas Jefferson', 'John Adams'],
    difficulty: 'medium',
    category: 'History',
    type: 'multiple'
  },

  // Art & Culture Questions
  {
    id: 'fallback_21',
    question: 'Who painted the Mona Lisa?',
    correctAnswer: 'Leonardo da Vinci',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    difficulty: 'medium',
    category: 'Art',
    type: 'multiple'
  },
  {
    id: 'fallback_22',
    question: 'Which composer wrote "The Four Seasons"?',
    correctAnswer: 'Antonio Vivaldi',
    options: ['Johann Sebastian Bach', 'Antonio Vivaldi', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven'],
    difficulty: 'hard',
    category: 'Art',
    type: 'multiple'
  },
  {
    id: 'fallback_23',
    question: 'In which city is the Louvre Museum located?',
    correctAnswer: 'Paris',
    options: ['London', 'Paris', 'Rome', 'Madrid'],
    difficulty: 'easy',
    category: 'Art',
    type: 'multiple'
  },
  {
    id: 'fallback_24',
    question: 'Who wrote "Romeo and Juliet"?',
    correctAnswer: 'William Shakespeare',
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
    difficulty: 'easy',
    category: 'Literature',
    type: 'multiple'
  },
  {
    id: 'fallback_25',
    question: 'Which art movement is Pablo Picasso associated with?',
    correctAnswer: 'Cubism',
    options: ['Impressionism', 'Cubism', 'Surrealism', 'Expressionism'],
    difficulty: 'hard',
    category: 'Art',
    type: 'multiple'
  },

  // Technology Questions
  {
    id: 'fallback_26',
    question: 'Which programming language was created by Brendan Eich?',
    correctAnswer: 'JavaScript',
    options: ['Python', 'Java', 'JavaScript', 'C++'],
    difficulty: 'hard',
    category: 'Technology',
    type: 'multiple'
  },
  {
    id: 'fallback_27',
    question: 'What does CPU stand for?',
    correctAnswer: 'Central Processing Unit',
    options: ['Computer Processing Unit', 'Central Processing Unit', 'Core Processing Unit', 'Central Program Unit'],
    difficulty: 'medium',
    category: 'Technology',
    type: 'multiple'
  },
  {
    id: 'fallback_28',
    question: 'Which company created the iPhone?',
    correctAnswer: 'Apple',
    options: ['Samsung', 'Apple', 'Google', 'Microsoft'],
    difficulty: 'easy',
    category: 'Technology',
    type: 'multiple'
  },
  {
    id: 'fallback_29',
    question: 'What does HTML stand for?',
    correctAnswer: 'HyperText Markup Language',
    options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'],
    difficulty: 'medium',
    category: 'Technology',
    type: 'multiple'
  },
  {
    id: 'fallback_30',
    question: 'Which year was the first iPhone released?',
    correctAnswer: '2007',
    options: ['2005', '2006', '2007', '2008'],
    difficulty: 'hard',
    category: 'Technology',
    type: 'multiple'
  },

  // Sports Questions
  {
    id: 'fallback_31',
    question: 'How many players are on a basketball team on the court at one time?',
    correctAnswer: '5',
    options: ['4', '5', '6', '7'],
    difficulty: 'easy',
    category: 'Sports',
    type: 'multiple'
  },
  {
    id: 'fallback_32',
    question: 'Which country won the FIFA World Cup in 2018?',
    correctAnswer: 'France',
    options: ['Germany', 'Brazil', 'France', 'Argentina'],
    difficulty: 'medium',
    category: 'Sports',
    type: 'multiple'
  },
  {
    id: 'fallback_33',
    question: 'In which sport would you perform a slam dunk?',
    correctAnswer: 'Basketball',
    options: ['Volleyball', 'Basketball', 'Tennis', 'Badminton'],
    difficulty: 'easy',
    category: 'Sports',
    type: 'multiple'
  },
  {
    id: 'fallback_34',
    question: 'How many players are on a soccer team on the field at one time?',
    correctAnswer: '11',
    options: ['10', '11', '12', '13'],
    difficulty: 'easy',
    category: 'Sports',
    type: 'multiple'
  },
  {
    id: 'fallback_35',
    question: 'Which sport is played at Wimbledon?',
    correctAnswer: 'Tennis',
    options: ['Golf', 'Tennis', 'Cricket', 'Rugby'],
    difficulty: 'easy',
    category: 'Sports',
    type: 'multiple'
  },

  // Entertainment Questions
  {
    id: 'fallback_36',
    question: 'Which movie won the Academy Award for Best Picture in 2020?',
    correctAnswer: 'Parasite',
    options: ['1917', 'Parasite', 'Joker', 'Once Upon a Time in Hollywood'],
    difficulty: 'hard',
    category: 'Entertainment',
    type: 'multiple'
  },
  {
    id: 'fallback_37',
    question: 'Who directed the movie "Inception"?',
    correctAnswer: 'Christopher Nolan',
    options: ['Steven Spielberg', 'Christopher Nolan', 'Martin Scorsese', 'Quentin Tarantino'],
    difficulty: 'medium',
    category: 'Entertainment',
    type: 'multiple'
  },
  {
    id: 'fallback_38',
    question: 'Which streaming service created "Stranger Things"?',
    correctAnswer: 'Netflix',
    options: ['Hulu', 'Netflix', 'Amazon Prime', 'Disney+'],
    difficulty: 'easy',
    category: 'Entertainment',
    type: 'multiple'
  },
  {
    id: 'fallback_39',
    question: 'Who played Jack in the movie "Titanic"?',
    correctAnswer: 'Leonardo DiCaprio',
    options: ['Brad Pitt', 'Leonardo DiCaprio', 'Tom Cruise', 'Johnny Depp'],
    difficulty: 'easy',
    category: 'Entertainment',
    type: 'multiple'
  },
  {
    id: 'fallback_40',
    question: 'Which band sang "Bohemian Rhapsody"?',
    correctAnswer: 'Queen',
    options: ['The Beatles', 'Queen', 'Led Zeppelin', 'Pink Floyd'],
    difficulty: 'medium',
    category: 'Entertainment',
    type: 'multiple'
  }
];

// Function to get a random subset of fallback questions
export const getFallbackQuestions = (count = 10) => {
  const shuffled = [...FALLBACK_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, FALLBACK_QUESTIONS.length));
};
