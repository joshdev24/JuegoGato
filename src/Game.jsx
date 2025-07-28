import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Stars from './Stars';

function Game({ score, setScore, endGame }) {
  const [time, setTime] = useState(10);
  const [animarClick, setAnimarClick] = useState(false);
  const [emocionIndex, setEmocionIndex] = useState(0);
  const videoRef = useRef(null);

  const emociones = [
    '/assets/gato_relajado.mp4',
    '/assets/gato_feliz.mp4',
    '/assets/gato_enojado.mp4',
    '/assets/gato_burlon.mp4',
    '/assets/gato_dj.mp4',
    '/assets/gato_sorprendido.mp4',
    '/assets/gato_saludando.mp4',
    '/assets/gato_furioso.mp4',
  ];

  // Precarga videos
  useEffect(() => {
    emociones.forEach(src => {
      const video = document.createElement('video');
      video.src = src;
    });
  }, []);

  // Timer
  useEffect(() => {
    if (time <= 0) {
      endGame();
      return;
    }
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time, endGame]);

  const handleRascar = () => {
    setScore(prev => prev + 1);
    setAnimarClick(true);
    setTimeout(() => setAnimarClick(false), 150);

    // Cambiar emoción y reiniciar video
    setEmocionIndex(prev => {
      const next = (prev + 1) % emociones.length;
      return next;
    });

    // Reiniciar reproducción
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
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

      <motion.video
        ref={videoRef}
        src={emociones[emocionIndex]}
        className="gato-img"
        onClick={handleRascar}
        autoPlay
        muted
        loop
        playsInline
        animate={animarClick ? { scale: 0.9 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
    </div>
  );
}

export default Game;
