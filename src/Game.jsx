import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Stars from './Stars';
import Loader from './Loader';

function Game({ score, setScore, endGame }) {
  const [time, setTime] = useState(10);
  const timeRef = useRef(10);          // guarda el tiempo restante real
  const timerRef = useRef(null);       // referencia al interval
  const endGameRef = useRef(endGame);  // guarda referencia a la función endGame
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

  // Actualiza la referencia si endGame cambia (pero no reinicia timer)
  useEffect(() => {
    endGameRef.current = endGame;
  }, [endGame]);

  // Precarga GIFs
  useEffect(() => {
    emociones.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Timer que corre una sola vez
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (timeRef.current <= 1) {
        clearInterval(timerRef.current);
        setTime(0);
        endGameRef.current();
      } else {
        timeRef.current -= 1;
        setTime(timeRef.current);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleRascar = () => {
    setScore(prev => prev + 1);
    setAnimarClick(true);
    setTimeout(() => setAnimarClick(false), 150);
    setEmocionIndex(prev => (prev + 1) % emociones.length);
  };

  return (
    <div className="game-container">
      <Stars />
      <Loader time={time}/>
      <h3>Clicks: {score}</h3>
      <div className="barra-tiempo-container">
        <div
          className="barra-tiempo"
          style={{
            width: `${(time / 10) * 100}%`,
            backgroundColor:
              time > 6 ? '#4caf50' : time > 3 ? '#ffc107' : '#f44336',
          }}
        />
      </div>

      <div className="gato-wrapper" onClick={handleRascar}>
        {emociones.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`gato-${i}`}
            className="gato-img"
            style={{ display: emocionIndex === i ? 'block' : 'none' }}
            animate={animarClick ? { scale: 0.9 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
