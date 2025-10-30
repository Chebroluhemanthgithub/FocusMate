
// src/components/timer/usePomodoro.js
import { useEffect, useRef, useState } from 'react';
import dingSound from '../../assets/ding.mp3';

export default function usePomodoro() {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [sessionHistory, setSessionHistory] = useState({});

  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(dingSound));

  useEffect(() => {
    const stored = localStorage.getItem('sessionHistory');
    if (stored) setSessionHistory(JSON.parse(stored));
  }, [sessionsCompleted]);

  useEffect(() => {
    setTimeLeft((isBreak ? breakDuration : workDuration) * 60);
  }, [workDuration, breakDuration, isBreak]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            audioRef.current.play();

            if (!isBreak) {
              setIsBreak(true);
              setSessionsCompleted(prev => {
                const updated = prev + 1;
                const today = new Date().toISOString().split('T')[0];
                const history = JSON.parse(localStorage.getItem('sessionHistory') || '{}');
                history[today] = (history[today] || 0) + 1;
                localStorage.setItem('sessionHistory', JSON.stringify(history));
                return updated;
              });
            } else {
              setIsBreak(false);
            }

            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(prev => !prev);
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration * 60);
  };
  const resetCounter = () => setSessionsCompleted(0);
  const clearSessionHistory = () => {
    localStorage.removeItem('sessionHistory');
    setSessionHistory({});
    setSessionsCompleted(0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return {
    isRunning, toggleTimer, resetTimer,
    isBreak, timeLeft, formatTime,
    workDuration, breakDuration,
    setWorkDuration, setBreakDuration,
    sessionsCompleted, resetCounter,
    clearSessionHistory, sessionHistory
  };
}
