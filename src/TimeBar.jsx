import { useEffect, useRef, useState } from 'react';

function TimerBar({ duration, onEnd }) {
  const [time, setTime] = useState(duration);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [onEnd]);

  const progress = (time / duration) * 100;

  return (
    <>
      <h2>Tiempo: {time}s</h2>
      <div className="barra-tiempo-container">
        <div
          className="barra-tiempo"
          style={{
            width: `${progress}%`,
            backgroundColor:
              time > 6 ? '#4caf50' : time > 3 ? '#ffc107' : '#f44336',
            transition: 'width 1s linear',
          }}
        />
      </div>
    </>
  );
}

export default TimerBar;
