import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  // ⏳ Timer: cuenta regresiva
  useEffect(() => {
    if (time <= 0) {
      endGame();
      return;
    }
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  // ✅ Precarga los GIFs
  useEffect(() => {
    emociones.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleRascar = () => {
    setScore(prev => prev + 1);
    setAnimarClick(true);
    setTimeout(() => setAnimarClick(false), 150);

    // Cambio inmediato de emoción al hacer clic
    setEmocionIndex(prev => (prev + 1) % emociones.length);
  };

  return (
    <div className="game-container">
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

