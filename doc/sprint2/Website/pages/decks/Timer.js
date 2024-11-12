import React, { useState, useEffect } from 'react';

const Timer = () => {
    // Initialize time variable in seconds
    const startTime = 30 * 60; 

    // React state variable  which uses the start time when initialized
    const [time, setTime] = useState(startTime);

    const [isRunning, setIsRunning] = useState(false);


    // Decrement time after component is created
    useEffect(() => {
        // Decrements time every 1000ms or 1 second
        let interval;

        if (isRunning){
            interval = setInterval(() => {
                setTime(prevTime => Math.max(prevTime - 1, 0)); // Decrement time by 1, but don't go below 0
            }, 1000);

            // Stop timer when 0 is reached
        return () => clearInterval(interval);
        }
        
    }, [isRunning]);

    // Calculate proper time variables
    const hours = Math.floor((time / (60 * 60)) % 24);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = time % 60;


    const startStop = () => {
        // Toggle the isRunning state on button click
        setIsRunning(prev => !prev);
    };

    const resetQuiz = () => {
        setTime(startTime);
    };
    return (
        // Display time, padStart used to print double 0's
        // Buttons for starting a quiz, and resetting added
        <div>
            <div className="timer">
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </div>
            <button onClick={startStop}>
                {isRunning ? 'Pause Quiz' : 'Start Quiz'}
            </button>

            {time < startTime ? <button onClick={resetQuiz}>
                {isRunning && time < startTime ? 'Reset Quiz' : 'Reset Quiz'}
            </button> : <div> </div>}
            
        </div>
    );
};

export default Timer;
