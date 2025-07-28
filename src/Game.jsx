import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import gatoRelajado from '../public/assets/gato_relajado.gif';
import gatoFeliz from '../public/assets/gato_feliz.gif';
import gatoSorprendido from '../public/assets/gato_sorprendido.gif';
import gatoEnojado from '../public/assets/gato_enojado.gif';
import gatoBurlon from '../public/assets/gato_burlon.gif';
import gatoDj from '../public/assets/gato_dj.gif';
import gatoSaludando from '../public/assets//gato_saludando.gif';
import gatoFurioso from '../public/assets/gato_furioso.gif';

function Game({ score, setScore, endGame }) {
  const [time, setTime] = useState(10);
  const [animarClick, setAnimarClick] = useState(false);
  const [emocionIndex, setEmocionIndex] = useState(0);

  const emociones = [
  'public/assets/gato_relajado.gif',
  'public/assets/gato_feliz.gif',
  'public/assets/gato_enojado.gif',
  'public/assets/gato_burlon.gif',
  'public/assets/gato_dj.gif',
  'public/assets/gato_sorprendido.gif',
  'public/assets/gato_saludando.gif',
  'public/assets/gato_furioso.gif',
];

  // Preload GIFs
  useEffect(() => {
    emociones.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Temporizador
  useEffect(() => {
    if (time <= 0) {
      endGame();
      return;
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, endGame]);

  const handleRascar = () => {
    setScore((prev) => prev + 1);
    setAnimarClick(true);
    setTimeout(() => setAnimarClick(false), 150);
    setEmocionIndex((prev) => (prev + 1) % emociones.length);
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
  src={emociones[emocionIndex]}
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
