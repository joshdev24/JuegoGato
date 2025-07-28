
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Game from './Game.jsx';
import Result from './Result.jsx';
import gatoSaludando from '../public/assets/gato_sorprendido.gif';
import './style.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const startGame = () => {
    setScore(0);
    setFinished(false);
    setGameStarted(true);
  };

  const endGame = useCallback(() => {
    setFinished(true);
    setGameStarted(false);
  }, []);

  return (
    <div className="app">
      <div className="fondo-estrellado">
        {[...Array(90)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 5;
          const size = Math.random() * 4 + 2; // de 2px a 6px
          const colors = ['#ebc943ff', '#df5545ff', '#76f0f0ff', '#35da35ff', '#fdfd96', '#78b6ecff'];
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <div
              key={i}
              className="estrella"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                boxShadow: `0 0 6px ${color}`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!gameStarted && !finished && (
          <motion.div
            key="inicio"
            className="inicio"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <img src={gatoSaludando} alt="Gato saludando" className="gato-saludo" />
            <button className="button" onClick={startGame}>
              ¡Empezar a rascar!
            </button>
          </motion.div>
        )}

        {gameStarted && !finished && (
          <motion.div
            key="juego"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <Game score={score} setScore={setScore} endGame={endGame} />
          </motion.div>
        )}

        {finished && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Result score={score} onRestart={startGame} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;






