import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Stars from './Stars';

function Game({ score, setScore, endGame }) {
  const [time, setTime] = useState(10);
  const [animarClick, setAnimarClick] = useState(false);
  const [emocionIndex, setEmocionIndex] = useState(0);
  const raf = useRef(null);

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

  // ⏱ Timer continuo
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [endGame]);

  // ✅ Precarga de GIFs
  useEffect(() => {
    emociones.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 🎯 Click handler optimizado
  const handleRascar = () => {
    // Evita que se solapen animaciones
    if (raf.current) cancelAnimationFrame(raf.current);

    setScore(prev => prev + 1);
    setAnimarClick(true);

    raf.current = requestAnimationFrame(() => {
      setAnimarClick(false);
    });

    // Solo cambia el índice, no forzamos recarga con Date.now()
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

      <motion.img
        src={emociones[emocionIndex]} // ❌ sin ?v=Date.now() para que no recargue
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
