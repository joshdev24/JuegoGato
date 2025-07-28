import { useEffect, useRef, useState } from 'react';

function Game({ score, setScore, endGame }) {
  const [time, setTime] = useState(10);
  const timerRef = useRef(null); // 🟡 Referencia persistente
  const [animarClick, setAnimarClick] = useState(false);
  const [emocionIndex, setEmocionIndex] = useState(0);

  const emociones = [
    '/assets/gato_relajado.gif',
    '/assets/gato_feliz.gif',
    '/assets/gato_enojado.gif',
    '/assets/gato_burlon.gif',
    '/assets/gato_dj.gif',
    '/assets/gato_sorprendido.gif',
    '/assets/gato_saludando.gif',
    '/assets/gato_furioso.gif',
  ];

  // Preload GIFs
  useEffect(() => {
    emociones.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // ⏳ Temporizador persistente
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [endGame]);

  const handleRascar = () => {
    setScore(prev => prev + 1);
    setAnimarClick(true);
    setTimeout(() => setAnimarClick(false), 150);
    setEmocionIndex(prev => (prev + 1) % emociones.length);
  };

  return (
    <div className="game-container">
      <h2>Tiempo: {time}s</h2>
      <h3>Ticks: {score}</h3>

      <TimerBar duration={10} onEnd={endGame} />

      <img
        src={`${emociones[emocionIndex]}?v=${Date.now()}`}
        alt="gato"
        className="gato-img"
        onClick={handleRascar}
        style={{ transform: animarClick ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.2s ease' }}
      />
    </div>
  );
}

export default Game;
