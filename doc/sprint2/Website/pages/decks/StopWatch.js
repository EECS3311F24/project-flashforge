import React, { useState, useEffect } from 'react';

const StopWatch = () => {
    // Initialize time variable in seconds
    const startTime = 0; 

    // React state variable  which uses the start time when initialized
    const [time, setTime] = useState(startTime);

    const [isRunning, setIsRunning] = useState(false);

    const [timerOn, setTimer] = useState(false);


    // Decrement time after component is created
    useEffect(() => {
        // Decrements time every 1000ms or 1 second
        let interval;

        if (isRunning){
            interval = setInterval(() => {
                setTime(prevTime => Math.max(prevTime + 1, 0)); // Decrement time by 1, but don't go below 0
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

    const resetTimer = () => {
        setTime(startTime);
    };
    return (
        // Display time, padStart used to print double 0's
        // Buttons for starting a quiz, and resetting added
        <div>
            {timerOn && (<div className="stopwatch">
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </div>)}
            <button onClick={() => {
                startStop(); 
                setTimer(true);}}>
                {time <= startTime  ? 'Stopwatch' : (isRunning  ? 'Pause' : 'Resume')   } 
            </button>

            {time > startTime ? <button onClick={() => {
            resetTimer();
            setIsRunning(false);
            setTimer(false);}}>
                {isRunning && time < startTime ? 'Reset' : 'Reset'}
            </button> : <div> </div>}
            
        </div>
    );
};

export default StopWatch;
