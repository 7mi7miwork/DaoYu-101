import React from 'react';
import { Link } from 'react-router-dom';
import { useGamification } from '../hooks/useGamification';

const Quiz = ({ lesson }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);
  const { addQuizResult } = useGamification();

  const currentQuestion = lesson.quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === lesson.quiz.questions.length - 1;

  const calculateScore = React.useCallback(() => {
    let correct = 0;
    lesson.quiz.questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  }, [answers, lesson.quiz.questions]);

  // Award XP when quiz is completed
  React.useEffect(() => {
    if (showResults && Object.keys(answers).length > 0) {
      const score = calculateScore();
      addQuizResult(lesson.id, score, lesson.quiz.questions.length);
    }
  }, [showResults, answers, lesson.id, lesson.quiz.questions.length, addQuizResult, calculateScore]);

  const submitAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / lesson.quiz.questions.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-8 rounded-lg border text-center" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
            Quiz Complete!
          </h2>
          
          <div className="text-6xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            {score}/{lesson.quiz.questions.length}
          </div>
          
          <div className="text-xl mb-6" style={{ color: 'var(--color-text)' }}>
            {percentage}% Correct
          </div>
          
          <div className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
            You earned {percentage >= 80 ? lesson.xp : Math.round(lesson.xp * percentage / 100)} XP!
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 rounded text-white"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              Retry Quiz
            </button>
            
            <Link
              to="/courses"
              className="px-6 py-3 rounded text-white inline-block"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Question {currentIndex + 1} of {lesson.quiz.questions.length}
          </span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {Math.round(((currentIndex) / lesson.quiz.questions.length) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((currentIndex) / lesson.quiz.questions.length) * 100}%`,
              backgroundColor: 'var(--color-primary)'
            }}
          ></div>
        </div>
      </div>

      <div className="p-8 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
          {currentQuestion.question}
        </h3>

        {currentQuestion.type === 'multiple_choice' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => submitAnswer(index)}
                className="w-full text-left p-4 rounded-lg border transition-colors hover:bg-opacity-10"
                style={{ 
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-primary)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--color-text)';
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'true_false' && (
          <div className="space-y-3">
            <button
              onClick={() => submitAnswer(true)}
              className="w-full text-left p-4 rounded-lg border transition-colors"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              True
            </button>
            <button
              onClick={() => submitAnswer(false)}
              className="w-full text-left p-4 rounded-lg border transition-colors"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              False
            </button>
          </div>
        )}

        {currentQuestion.type === 'fill_blank' && (
          <div>
            <input
              type="text"
              placeholder="Type your answer..."
              className="w-full p-4 rounded-lg border"
              style={{ 
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  submitAnswer(e.target.value);
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input');
                submitAnswer(input.value);
              }}
              className="mt-4 px-6 py-3 rounded text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
