import axios from 'axios';
import { API_ENDPOINTS, QUIZ_CONFIG } from '../utils/constants.js';
import { getFallbackQuestions } from '../utils/fallbackQuestions.js';

class TriviaApiService {
  constructor() {
    this.baseURL = API_ENDPOINTS.TRIVIA_BASE;
    this.sessionToken = null;
    this.lastRequestTime = 0;
    this.minRequestInterval = 1000; // Minimum 1 second between requests
    this.usedQuestions = new Set(); // Track used questions to avoid repetition
    this.apiFailureCount = 0; // Track API failures
  }

  // Get session token to avoid duplicate questions
  async getSessionToken() {
    try {
      const response = await axios.get(API_ENDPOINTS.SESSION_TOKEN);
      this.sessionToken = response.data.token;
      return this.sessionToken;
    } catch (error) {
      console.warn('Could not get session token:', error);
      return null;
    }
  }

  // Rate limiting helper
  async waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }

  // Retry logic with exponential backoff
  async retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        const isLastAttempt = attempt === maxRetries - 1;
        const isRateLimit = error.response?.status === 429;
        
        if (isLastAttempt || !isRateLimit) {
          throw error;
        }
        
        // Exponential backoff: 1s, 2s, 4s
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Rate limited. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // Filter out already used questions
  filterUnusedQuestions(questions) {
    return questions.filter(question => {
      const questionKey = `${question.question}-${question.correctAnswer}`;
      return !this.usedQuestions.has(questionKey);
    });
  }

  // Mark questions as used
  markQuestionsAsUsed(questions) {
    questions.forEach(question => {
      const questionKey = `${question.question}-${question.correctAnswer}`;
      this.usedQuestions.add(questionKey);
    });
  }

  // Get questions with difficulty filtering
  getQuestionsByDifficulty(questions, difficulty) {
    if (difficulty === 'mixed') {
      return questions;
    }
    return questions.filter(q => q.difficulty === difficulty);
  }

  // Fetch questions from Open Trivia DB with hybrid approach
  async fetchQuestions(amount = QUIZ_CONFIG.TOTAL_QUESTIONS, difficulty = 'mixed') {
    try {
      // Try to get API questions first
      const apiQuestions = await this.retryWithBackoff(async () => {
        // Ensure rate limiting
        await this.waitForRateLimit();
        
        // Get session token for better question variety
        if (!this.sessionToken) {
          await this.getSessionToken();
        }

        const params = {
          amount: Math.min(amount * 2, 20), // Get more questions to filter from
          type: 'multiple', // only multiple choice
          encode: 'url3986' // URL encoding to handle special characters
        };

        if (difficulty !== 'mixed') {
          params.difficulty = difficulty;
        }

        if (this.sessionToken) {
          params.token = this.sessionToken;
        }

        const response = await axios.get(this.baseURL, { 
          params,
          timeout: 10000 // 10 second timeout
        });
        
        if (response.data.response_code !== 0) {
          throw new Error(`API Error: ${this.getErrorMessage(response.data.response_code)}`);
        }

        return this.normalizeQuestions(response.data.results);
      });

      // Filter out used questions and get the right difficulty
      const unusedApiQuestions = this.filterUnusedQuestions(apiQuestions);
      const filteredApiQuestions = this.getQuestionsByDifficulty(unusedApiQuestions, difficulty);
      
      // If we have enough unique API questions, use them
      if (filteredApiQuestions.length >= amount) {
        const selectedQuestions = filteredApiQuestions.slice(0, amount);
        this.markQuestionsAsUsed(selectedQuestions);
        this.apiFailureCount = 0; // Reset failure count on success
        return selectedQuestions;
      }

      // If not enough API questions, supplement with fallback questions
      const fallbackQuestions = getFallbackQuestions(amount * 2);
      const unusedFallbackQuestions = this.filterUnusedQuestions(fallbackQuestions);
      const filteredFallbackQuestions = this.getQuestionsByDifficulty(unusedFallbackQuestions, difficulty);
      
      // Combine API and fallback questions
      const combinedQuestions = [...filteredApiQuestions, ...filteredFallbackQuestions];
      const selectedQuestions = combinedQuestions.slice(0, amount);
      
      this.markQuestionsAsUsed(selectedQuestions);
      
      // Add a note if we're using fallback questions
      if (filteredFallbackQuestions.length > 0) {
        selectedQuestions[0] = { ...selectedQuestions[0], isHybrid: true };
      }
      
      return selectedQuestions;

    } catch (error) {
      // If API completely fails, use fallback questions
      this.apiFailureCount++;
      console.warn(`API failed (attempt ${this.apiFailureCount}), using fallback questions:`, error.message);
      
      const fallbackQuestions = getFallbackQuestions(amount * 2);
      const unusedFallbackQuestions = this.filterUnusedQuestions(fallbackQuestions);
      const filteredFallbackQuestions = this.getQuestionsByDifficulty(unusedFallbackQuestions, difficulty);
      const selectedQuestions = filteredFallbackQuestions.slice(0, amount);
      
      this.markQuestionsAsUsed(selectedQuestions);
      
      // Add a note that we're using fallback data
      if (selectedQuestions.length > 0) {
        selectedQuestions[0] = { ...selectedQuestions[0], isFallback: true };
      }
      
      return selectedQuestions;
    }
  }

  // Normalize API response to our internal format
  normalizeQuestions(rawQuestions) {
    return rawQuestions.map((q, index) => ({
      id: `q_${index}_${Date.now()}`,
      question: decodeURIComponent(q.question),
      correctAnswer: decodeURIComponent(q.correct_answer),
      options: this.shuffleArray([
        decodeURIComponent(q.correct_answer),
        ...q.incorrect_answers.map(ans => decodeURIComponent(ans))
      ]),
      difficulty: q.difficulty,
      category: decodeURIComponent(q.category),
      type: q.type
    }));
  }

  // Utility method to shuffle array (Fisher-Yates algorithm)
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Convert API error codes to user-friendly messages
  getErrorMessage(code) {
    const errorMessages = {
      1: 'Not enough questions available for your criteria',
      2: 'Invalid parameter in request',
      3: 'Session token not found',
      4: 'Session token has returned all possible questions',
      5: 'Rate limit exceeded'
    };
    return errorMessages[code] || 'Unknown error occurred';
  }

  // Reset used questions (call this when starting a new quiz session)
  resetUsedQuestions() {
    this.usedQuestions.clear();
    this.apiFailureCount = 0;
  }

  // Get statistics about question usage
  getQuestionStats() {
    return {
      usedQuestionsCount: this.usedQuestions.size,
      apiFailureCount: this.apiFailureCount,
      fallbackQuestionsAvailable: FALLBACK_QUESTIONS.length
    };
  }
}

export const triviaApi = new TriviaApiService();