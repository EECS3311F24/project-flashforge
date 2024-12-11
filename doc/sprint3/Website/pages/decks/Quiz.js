import React, { useState, useEffect } from 'react';

const Quiz = ({ startTimer, setStartTimer, setQuizMode, setCurrentCard, setScore, quizEnded, resetTimer }) => {
  const startTime = 30 * 60; // 30 minutes in seconds
  const [time, setTime] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started

  // Start the timer when startTimer is true
  useEffect(() => {
    if (resetTimer) {
        setTime(startTime); // Reset the timer
        setIsRunning(false); // Stop the timer
      }
    if (startTimer && !quizEnded) {
        setIsRunning(true); // Start the timer when quiz starts
      } else{
        setIsRunning(false); // Stop the timer when the quiz ends
      }
    }, [startTimer, quizEnded]);


  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => Math.max(prevTime - 1, 0)); // Decrease time by 1 second
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isRunning]);

  const hours = Math.floor(time / (60 * 60)) % 24;
  const minutes = Math.floor((time / 60) % 60);
  const seconds = time % 60;

  const startQuizAndTimer = () => {
    setQuizMode(true); // Start the quiz
    setCurrentCard(0); // Reset the card counter
    setScore(0); // Reset the score
    setStartTimer(true); // Start the timer
    setQuizStarted(true); // Mark the quiz as started
  };

  return (
    <div>
      <div className="timer">
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>

      {/* Hide the Quiz Mode button once the quiz has started */}
      {!quizStarted && (
        <button onClick={startQuizAndTimer}>
          Quiz Mode
        </button>
      )}
    </div>
  );
};

export default Quiz;