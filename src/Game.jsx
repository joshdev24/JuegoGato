import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Stars from './Stars';

function Game({ score, setScore, endGame }) {
  const [time, setTime] = useState(10);
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

  // ⏳ Precarga los GIFs
  useEffect(() => {
    emociones.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // ⏱ Timer - corre solo una vez, no depende de `time`
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [endGame]);

  const handleRascar = () => {
    setScore(prev => prev + 1);
    setAnimarClick(true);
    setTimeout(() => setAnimarClick(false), 150);

    setEmocionIndex(prev => (prev + 1) % emociones.length);
  };

  return (
    <div className="game-container">
      <Stars />
      <h2>Tiempo: {time}s</h2>
      <h3>Ticks: {score}</h3>
      <div className="barra-tiempo-container">
        <div
          className="barra-tiempo"
          style={{
            width: `${(time / 10) * 100}%`,
            backgroundColor:
              time > 6 ? '#4caf50' : time > 3 ? '#ffc107' : '#f44336',
          }}
        ></div>
      </div>

      {/* Contenedor de los GIFs (todos en DOM, se ocultan con display) */}
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
