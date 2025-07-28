
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

function Result({ score, onRestart }) {
  const gatos = [
    '/assets/gato_relajado.gif',
    '/assets/gato_feliz.gif',
    '/assets/gato_sorprendido.gif',
    '/assets/gato_enojado.gif',
    '/assets/gato_burlon.gif',
    '/assets/gato_dj.gif',
    '/assets/gato_saludando.gif',
    '/assets/gato_furioso.gif'
  ];

  const [record, setRecord] = useState(() => {
    const saved = localStorage.getItem('gatoRecord');
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });

    if (score > record) {
      setRecord(score);
      localStorage.setItem('gatoRecord', score);
    }
  }, [score, record]);

  return (
    <div className="result-container">
      <h2>Hiciste {score} clicks!</h2>
      <p>Tu récord: {record} clicks</p>

      <div className="gatos-finales">
        {gatos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gato ${i + 1}`}
            className="gato-aparece"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>

      <button className="button" onClick={onRestart}>¡Jugar otra vez!</button>
    </div>
  );
}

export default Result;
