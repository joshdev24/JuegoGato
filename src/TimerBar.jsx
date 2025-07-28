import { useEffect, useRef, useState } from 'react';

function TimerBar({ duration, onEnd }) {
  const [time, setTime] = useState(duration);
  const timeRef = useRef(duration);
  const timeoutRef = useRef(null);

  const tick = () => {
    if (timeRef.current <= 0) {
      onEnd();
      return;
    }
    timeRef.current -= 1;
    setTime(timeRef.current);
    timeoutRef.current = setTimeout(tick, 1000);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, 1000);
    return () => clearTimeout(timeoutRef.current);
  }, []);

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

