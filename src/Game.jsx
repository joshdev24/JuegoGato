import { useEffect, useRef, useState } from 'react';

function Game({ score, setScore, endGame }) {
  const [time, setTime] = useState(10);
  const timerRef = useRef(null);
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

  // Precarga de GIFs
  useEffect(() => {
    emociones.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Temporizador persistente
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
    <div className="game-container" style={{ textAlign: 'center' }}>
      <h3>Ticks: {score}</h3>

      <img
        src={`${emociones[emocionIndex]}?v=${Date.now()}`}
        alt="gato"
        className="gato-img"
        onClick={handleRascar}
        style={{
          cursor: 'pointer',
          transform: animarClick ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          maxWidth: '250px',
          width: '100%',
          margin: '0 auto',
          display: 'block'
        }}
      />

      {/* Barra de tiempo en div aparte y abajo */}
      <div
        className="barra-tiempo-container"
        style={{
          marginTop: '20px',
          width: '80%',
          height: '20px',
          backgroundColor: '#ddd',
          borderRadius: '10px',
          marginLeft: 'auto',
          marginRight: 'auto',
          overflow: 'hidden',
        }}
      >
        <div
          className="barra-tiempo"
          style={{
            width: `${(time / 10) * 100}%`,
            height: '100%',
            backgroundColor:
              time > 6 ? '#4caf50' : time > 3 ? '#ffc107' : '#f44336',
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* Mostrar el tiempo numérico debajo (opcional) */}
      <h2 style={{ marginTop: '10px' }}>Tiempo: {time}s</h2>
    </div>
  );
}

export default Game;
