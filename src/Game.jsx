import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import gatoRelajado from '../assets/gato_relajado.gif';
import gatoFeliz from '../assets/gato_feliz.gif';
import gatoSorprendido from '../assets/gato_sorprendido.gif';
import gatoEnojado from '../assets/gato_enojado.gif';
import gatoBurlon from '../assets/gato_burlon.gif';
import gatoDj from '../assets/gato_dj.gif';
import gatoSaludando from '../assets/gato_saludando.gif';
import gatoFurioso from '../assets/gato_furioso.gif';

function Game({ score, setScore, endGame }) {
  const [time, setTime] = useState(10);
  const [animarClick, setAnimarClick] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      endGame();
      return;
    }
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const emociones = [
  gatoRelajado,
  gatoFeliz,
  gatoEnojado,
  gatoBurlon,
  gatoDj,
  gatoSorprendido,
  gatoSaludando,
  gatoFurioso,
];

const [emocionIndex, setEmocionIndex] = useState(0);

  const handleRascar = () => {
  setScore(prev => prev + 1);
  setAnimarClick(true);
  setTimeout(() => setAnimarClick(false), 150);
  // Avanza al siguiente gif (ciclo)
  setEmocionIndex(prev => (prev + 1) % emociones.length);
};

  return (

    <div className="game-container">
      <h2>Tiempo: {time}s</h2>
      <h3>Ticks: {score}</h3>
      <div className="barra-tiempo-container">
  <div
    className="barra-tiempo"
    style={{ width: `${(time / 10) * 100}%`,
    backgroundColor:
      time > 6 ? '#4caf50' : time > 3 ? '#ffc107' : '#f44336' // verde, amarillo, rojo
  }}
  ></div>
</div>
      <motion.img
  key={emocionIndex}
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
