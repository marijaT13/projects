import { useState, useEffect, useRef } from "react";
import "./App.css";

const Timer = () => {
  const [timer, setTimer] = useState<string>("00:00:00");
  const [seconds, setSeconds] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && seconds !== null) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setIsRunning(false);
            playSound();
            return null;
          }
          return prev! - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  useEffect(() => {
    if (seconds !== null) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      setTimer(
        `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    }
  }, [seconds]);

  const playSound = () => {
    const audio = new Audio("/sounds/ring.wav"); 
    audio.play();
  };

  const handleStart = () => {
    if (!isRunning && seconds !== null) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(null);
    setTimer("00:00:00");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimer(e.target.value);
  };

  const handleSetTime = () => {
    const [hrs, mins, secs] = timer.split(":").map(Number);
    if (!isNaN(hrs) && !isNaN(mins) && !isNaN(secs)) {
      setSeconds(hrs * 3600 + mins * 60 + secs);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    const [hrs, mins, secs] = timer.split(":").map(Number);
    if (!isNaN(hrs) && !isNaN(mins) && !isNaN(secs)) {
      setTimer(
        `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return (
    <div className="timer-container">
      <div className="circle">
        <div className="handelCircle"></div>
        <div className="timer-wrapper" onClick={handleEditClick}>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={timer}
              onChange={handleChange}
              onBlur={handleBlur}
              className="timer-input"
              autoFocus
            />
          ) : (
            <span className="timer-display">{timer}</span>
          )}
        </div>
      </div>

      <div className="bottom-buttons">
        <button onClick={handleSetTime}>Set</button>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handlePause} disabled={!isRunning}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
