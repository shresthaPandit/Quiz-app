// localStorage utility functions with error handling and fallbacks

class LocalStorageManager {
  constructor() {
    this.isAvailable = this.checkAvailability();
  }

  // Check if localStorage is available
  checkAvailability() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage is not available:', e);
      return false;
    }
  }

  // Safe setItem with error handling
  setItem(key, value) {
    if (!this.isAvailable) {
      console.warn('localStorage is not available, data will not be persisted');
      return false;
    }

    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
      return false;
    }
  }

  // Safe getItem with error handling
  getItem(key, defaultValue = null) {
    if (!this.isAvailable) {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  }

  // Safe removeItem with error handling
  removeItem(key) {
    if (!this.isAvailable) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  // Clear all localStorage data
  clear() {
    if (!this.isAvailable) {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Get storage usage information
  getStorageInfo() {
    if (!this.isAvailable) {
      return { available: false, used: 0, total: 0 };
    }

    try {
      let used = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length;
        }
      }
      
      // Most browsers have 5-10MB limit
      const total = 5 * 1024 * 1024; // 5MB estimate
      
      return {
        available: true,
        used: used,
        total: total,
        percentage: Math.round((used / total) * 100)
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { available: false, used: 0, total: 0 };
    }
  }
}

// Quiz-specific localStorage functions
export const quizStorage = {
  // High scores management
  saveHighScore: (scoreData) => {
    const storage = new LocalStorageManager();
    const existingScores = storage.getItem('quizHighScores', []);
    
    // Add new score
    existingScores.push({
      ...scoreData,
      id: Date.now(),
      date: new Date().toISOString()
    });
    
    // Sort by percentage (descending) and keep only top 10
    existingScores.sort((a, b) => b.percentage - a.percentage);
    const topScores = existingScores.slice(0, 10);
    
    return storage.setItem('quizHighScores', topScores);
  },

  getHighScores: (limit = 5) => {
    const storage = new LocalStorageManager();
    const scores = storage.getItem('quizHighScores', []);
    return scores.slice(0, limit);
  },

  clearHighScores: () => {
    const storage = new LocalStorageManager();
    return storage.removeItem('quizHighScores');
  },

  // Player preferences
  savePlayerPreferences: (preferences) => {
    const storage = new LocalStorageManager();
    return storage.setItem('quizPlayerPreferences', preferences);
  },

  getPlayerPreferences: () => {
    const storage = new LocalStorageManager();
    return storage.getItem('quizPlayerPreferences', {
      defaultDifficulty: 'mixed',
      defaultQuestionCount: 10,
      lastPlayerName: ''
    });
  },

  // Quiz statistics
  saveQuizStats: (stats) => {
    const storage = new LocalStorageManager();
    const existingStats = storage.getItem('quizStats', {
      totalQuizzes: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      averageScore: 0,
      bestScore: 0
    });

    const updatedStats = {
      totalQuizzes: existingStats.totalQuizzes + 1,
      totalQuestions: existingStats.totalQuestions + stats.totalQuestions,
      totalCorrect: existingStats.totalCorrect + stats.correctAnswers,
      averageScore: Math.round((existingStats.totalCorrect + stats.correctAnswers) / (existingStats.totalQuestions + stats.totalQuestions) * 100),
      bestScore: Math.max(existingStats.bestScore, stats.percentage)
    };

    return storage.setItem('quizStats', updatedStats);
  },

  getQuizStats: () => {
    const storage = new LocalStorageManager();
    return storage.getItem('quizStats', {
      totalQuizzes: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      averageScore: 0,
      bestScore: 0
    });
  },

  // Clean up duplicate scores
  cleanDuplicateScores: () => {
    const storage = new LocalStorageManager();
    const scores = storage.getItem('quizHighScores', []);
    const uniqueScores = [];
    const seen = new Set();
    
    scores.forEach(score => {
      const key = `${score.playerName}-${score.score}-${score.totalQuestions}-${score.date}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueScores.push(score);
      }
    });
    
    // Sort by percentage and keep only top 10
    uniqueScores.sort((a, b) => b.percentage - a.percentage);
    const topScores = uniqueScores.slice(0, 10);
    
    return storage.setItem('quizHighScores', topScores);
  }
};

// Export the main storage manager
export const storageManager = new LocalStorageManager();

// Export individual functions for backward compatibility
export const {
  saveHighScore,
  getHighScores,
  clearHighScores,
  savePlayerPreferences,
  getPlayerPreferences,
  saveQuizStats,
  getQuizStats,
  cleanDuplicateScores
} = quizStorage;
