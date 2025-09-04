// Simple localStorage test functions
// This file can be used to test localStorage functionality in the browser console

export const testLocalStorage = () => {
  console.log('🧪 Testing localStorage functionality...');
  
  // Test basic localStorage operations
  try {
    // Test setItem
    localStorage.setItem('test_key', 'test_value');
    console.log('✅ localStorage.setItem works');
    
    // Test getItem
    const value = localStorage.getItem('test_key');
    if (value === 'test_value') {
      console.log('✅ localStorage.getItem works');
    } else {
      console.log('❌ localStorage.getItem failed');
    }
    
    // Test removeItem
    localStorage.removeItem('test_key');
    const removedValue = localStorage.getItem('test_key');
    if (removedValue === null) {
      console.log('✅ localStorage.removeItem works');
    } else {
      console.log('❌ localStorage.removeItem failed');
    }
    
    // Test JSON operations
    const testData = { name: 'Test', score: 100 };
    localStorage.setItem('test_json', JSON.stringify(testData));
    const retrievedData = JSON.parse(localStorage.getItem('test_json'));
    
    if (retrievedData.name === 'Test' && retrievedData.score === 100) {
      console.log('✅ JSON serialization/deserialization works');
    } else {
      console.log('❌ JSON operations failed');
    }
    
    localStorage.removeItem('test_json');
    
    console.log('🎉 All localStorage tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ localStorage test failed:', error);
    return false;
  }
};

// Test quiz-specific localStorage functions
export const testQuizStorage = () => {
  console.log('🧪 Testing quiz localStorage functions...');
  
  try {
    // Import the storage functions
    import('./localStorage.js').then(({ quizStorage }) => {
      // Test saving a high score
      const testScore = {
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        playerName: 'Test Player'
      };
      
      const saved = quizStorage.saveHighScore(testScore);
      if (saved) {
        console.log('✅ saveHighScore works');
      } else {
        console.log('❌ saveHighScore failed');
      }
      
      // Test retrieving high scores
      const scores = quizStorage.getHighScores();
      if (Array.isArray(scores) && scores.length > 0) {
        console.log('✅ getHighScores works');
        console.log('📊 Retrieved scores:', scores);
      } else {
        console.log('❌ getHighScores failed');
      }
      
      // Test saving player preferences
      const prefs = {
        defaultDifficulty: 'medium',
        defaultQuestionCount: 15,
        lastPlayerName: 'Test Player'
      };
      
      const prefsSaved = quizStorage.savePlayerPreferences(prefs);
      if (prefsSaved) {
        console.log('✅ savePlayerPreferences works');
      } else {
        console.log('❌ savePlayerPreferences failed');
      }
      
      // Test retrieving player preferences
      const retrievedPrefs = quizStorage.getPlayerPreferences();
      if (retrievedPrefs.defaultDifficulty === 'medium') {
        console.log('✅ getPlayerPreferences works');
        console.log('⚙️ Retrieved preferences:', retrievedPrefs);
      } else {
        console.log('❌ getPlayerPreferences failed');
      }
      
      console.log('🎉 All quiz storage tests passed!');
    });
    
  } catch (error) {
    console.error('❌ Quiz storage test failed:', error);
  }
};

// Run tests when this module is imported
if (typeof window !== 'undefined') {
  console.log('💾 localStorage test functions loaded. Run testLocalStorage() or testQuizStorage() to test.');
}
