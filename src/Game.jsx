import { useState } from 'react';
import { motion } from 'framer-motion';
import TimerBar from './TimerBar';
import Stars from './Stars';

function Game({ score, setScore, endGame }) {
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
  useState(() => {
    emociones.forEach(src => {
      const img = new Image();
      img.src = src;
    });
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

      <TimerBar duration={10} onEnd={endGame} />

      <h3>Ticks: {score}</h3>

      <motion.img
        key={emocionIndex}
        src={`${emociones[emocionIndex]}?v=${Date.now()}`}
        alt="gato"
        className="gato-img"
        onClick={handleRascar}
        animate={animarClick ? { scale: 0.9 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
    </div>
  );
}

export default Game;

