# Quiz Master - React Quiz Application

A modern, responsive quiz application built with React, featuring trivia questions from the Open Trivia Database API. Test your knowledge across various categories with customizable difficulty levels and question counts.

## 🚀 Features

### Core Features
- **Interactive Quiz Interface**: Clean, one-question-at-a-time display with multiple choice options
- **Timer System**: 30-second countdown timer for each question with visual indicators
- **Progress Tracking**: Real-time progress bar and question counter
- **Score Calculation**: Automatic scoring with detailed results breakdown
- **Results Page**: Comprehensive results with correct/incorrect answer analysis
- **Restart Functionality**: Easy quiz restart with score history tracking

### Advanced Features
- **Difficulty Levels**: Choose from Easy, Medium, Hard, or Mixed difficulty
- **Customizable Question Count**: Select 5-20 questions per quiz
- **High Score System**: Persistent high score tracking using localStorage
- **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile
- **Error Handling**: Robust error handling for API failures and network issues
- **Loading States**: Smooth loading animations and user feedback
- **Accessibility**: ARIA labels, keyboard navigation, and focus management

### Technical Features
- **Modern React**: Functional components with hooks (useState, useEffect, custom hooks)
- **React Router**: Client-side routing for seamless navigation
- **API Integration**: Open Trivia DB API with session token management
- **State Management**: Custom hooks for quiz logic and API interactions
- **Responsive UI**: Tailwind CSS for modern, responsive styling
- **Error Boundaries**: Application-level error handling and recovery

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Common/
│   │   ├── Button.jsx              # Reusable button component
│   │   ├── LoadingSpinner.jsx      # Loading animation component
│   │   └── ErrorMessage.jsx       # Error display component
│   ├── Home/
│   │   └── HomePage.jsx            # Home page with quiz configuration
│   ├── Quiz/
│   │   ├── QuestionCard.jsx        # Individual question display
│   │   ├── ProgressBar.jsx         # Progress and timer display
│   │   └── QuizContainer.jsx       # Main quiz logic container
│   └── Results/
│       ├── ResultsPage.jsx         # Quiz results and analysis
│       └── ScoreCard.jsx           # Score display component
├── hooks/
│   ├── useApi.js                   # API integration hook
│   └── useQuiz.js                  # Quiz state management hook
├── pages/
│   └── QuizPage.jsx                # Quiz page wrapper
├── services/
│   └── triviaApi.js                # API service layer
├── utils/
│   ├── constants.js                # Application constants
│   └── helpers.js                  # Utility functions
├── types/
│   └── quiz.js                     # Type definitions and schemas
├── App.jsx                         # Main app component with routing
├── main.jsx                        # Application entry point
└── index.css                       # Global styles and Tailwind imports
```

## 🎮 How to Use

### Starting a Quiz
1. **Configure Your Quiz**:
   - Select difficulty level (Easy, Medium, Hard, or Mixed)
   - Choose number of questions (5-20)
   - Click "Start Quiz"

2. **Taking the Quiz**:
   - Read each question carefully
   - Select one of the four multiple-choice options
   - Watch the 30-second timer countdown
   - Use "Previous" and "Next" buttons to navigate
   - Click "Finish Quiz" on the last question

3. **Viewing Results**:
   - See your overall score and percentage
   - Review each question with correct/incorrect indicators
   - View detailed explanations and categories
   - Check your performance statistics

4. **Track Progress**:
   - View high scores on the home page
   - See your quiz statistics and averages
   - Track improvement over time

## 🚀 Live Demo

[View Live Demo](https://quickquiztest.netlify.app/) 

## 📱 Screenshots

### Home Page
- Quiz configuration options
- High score leaderboard
- Personal statistics dashboard

### Quiz Interface
- Clean question display
- Multiple choice options
- Progress bar and timer
- Navigation controls

### Results Page
- Score breakdown
- Question-by-question analysis
- Performance metrics
- Restart options

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally

# Linting and Formatting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically

# Testing
npm run test         # Run tests (if configured)
```

## 🌐 API Integration

This app integrates with the [Open Trivia Database](https://opentdb.com/) API:

- **Endpoint**: `https://opentdb.com/api.php`
- **Features Used**:
  - Multiple choice questions
  - Difficulty filtering
  - Category diversity
  - Session tokens (prevents duplicate questions)
  - URL encoding handling

### API Error Handling
- Network connectivity issues
- Rate limiting
- Invalid responses
- Session token expiration
- Fallback mechanisms

## 🎨 Design Decisions

### Architecture
- **Component-based**: Modular, reusable React components
- **Custom Hooks**: Separation of logic and presentation
- **Service Layer**: Centralized API management
- **State Management**: Local state with React hooks
- **Error Boundaries**: Graceful error handling

### UI/UX Choices
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Mobile-first**: Responsive design starting from mobile
- **Accessibility**: WCAG compliance with ARIA labels
- **Performance**: Lazy loading and optimized rendering
- **Visual Feedback**: Loading states, hover effects, transitions

### Technical Choices
- **Vite over CRA**: Faster development and build times
- **Tailwind CSS**: Utility-first styling for rapid development
- **Axios over Fetch**: Better error handling and request/response interceptors
- **React Router**: Client-side routing for SPA experience

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   - Drag and drop `dist` folder to Netlify
   - Or connect GitHub repository for automatic deployments

### Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### GitHub Pages
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/quiz-app",
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run build && npm run deploy
   ```

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Quiz loads with questions from API
- [ ] Timer counts down correctly
- [ ] Navigation between questions works
- [ ] Score calculation is accurate
- [ ] Results display correctly
- [ ] High scores persist in localStorage
- [ ] Responsive design works on all devices
- [ ] Error handling works when offline
- [ ] Restart functionality resets state

### Edge Cases Handled
- No internet connection
- API rate limiting
- Empty or invalid API responses
- Browser refresh during quiz
- localStorage unavailable
- Rapid clicking/navigation
- Mobile device orientation changes

## 🔮 Future Enhancements

### Features
- [ ] User authentication and profiles
- [ ] Multiplayer quiz rooms
- [ ] Custom question creation
- [ ] Social sharing of results
- [ ] Audio/video questions
- [ ] Timed quiz modes
- [ ] Achievement system
- [ ] Category-specific quizzes

### Technical Improvements
- [ ] Unit and integration tests
- [ ] TypeScript migration
- [ ] PWA capabilities
- [ ] Offline functionality
- [ ] Performance optimization
- [ ] Analytics integration
- [ ] A/B testing framework

## 🐛 Known Issues

- API occasionally returns duplicate questions (mitigated with session tokens)
- Timer may drift slightly on slow devices (acceptable for this use case)
- High score sorting may not handle edge cases perfectly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Your Name**
- GitHub: [ShresthaPandit](https://github.com/shresthaPandit)
- LinkedIn:(https://www.linkedin.com/in/shrestha-pandit-24bba8263/)
- Email: shresthapandit8@gmail.com

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the quiz questions
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool

---

**Built with ❤️ for the coding assignment**
