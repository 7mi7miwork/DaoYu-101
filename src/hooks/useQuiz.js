import { useState } from 'react';

const useQuiz = (quiz) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const submitAnswer = (answer) => {
    const newAnswers = { ...answers, [quiz.questions[currentIndex].id]: answer };
    setAnswers(newAnswers);
    
    // Check if answer is correct
    const isCorrect = answer === quiz.questions[currentIndex].correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Move to next question or complete
    if (currentIndex === quiz.questions.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    
    return isCorrect;
  };

  const nextQuestion = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setIsComplete(false);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getPercentage = () => {
    return Math.round((calculateScore() / quiz.questions.length) * 100);
  };

  return {
    currentIndex,
    answers,
    score,
    isComplete,
    currentQuestion: quiz.questions[currentIndex],
    isLastQuestion: currentIndex === quiz.questions.length - 1,
    submitAnswer,
    nextQuestion,
    reset,
    calculateScore,
    getPercentage
  };
};

export default useQuiz;
