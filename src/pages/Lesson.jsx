import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import lessonData from '../data/lessons/programming/python-basics/lesson-01-variables.js';

const Lesson = () => {
  const { lessonId } = useParams();
  const [showQuiz, setShowQuiz] = useState(false);
  
  // For now, we only have one lesson
  const lesson = lessonId === 'programming-python-basics' ? lessonData : null;

  if (!lesson) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
            Lesson not found
          </h1>
          <Link to="/courses" className="text-blue-500 hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container mx-auto px-4 py-8">
          <Link to={`/lesson/${lessonId}`} className="text-blue-500 hover:underline mb-6 inline-block">
            ← Back to Lesson
          </Link>
          
          <Quiz lesson={lesson} onBack={() => setShowQuiz(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <Link to="/courses/programming" className="text-blue-500 hover:underline mb-6 inline-block">
          ← Back to Islands
        </Link>
        
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          {lesson.title}
        </h1>
        
        <div className="mb-8">
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div 
              className="prose prose-lg max-w-none"
              style={{ 
                color: 'var(--color-text)',
                '--prose-headings-color': 'var(--color-text)',
                '--prose-text-color': 'var(--color-text)',
                '--prose-code-color': 'var(--color-text)',
                '--prose-pre-color': 'var(--color-text)',
                '--prose-pre-bg': 'var(--color-bg)',
                '--prose-blockquote-color': 'var(--color-text-muted)',
                '--prose-border-color': 'var(--color-border)'
              }}
            >
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {lesson.xp} XP available
          </div>
          
          <button
            onClick={() => setShowQuiz(true)}
            className="px-6 py-3 rounded text-white font-semibold"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

// Quiz component (will be moved to separate file)
const Quiz = ({ lesson }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = lesson.quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === lesson.quiz.questions.length - 1;

  const submitAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    lesson.quiz.questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
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

export default Lesson;
