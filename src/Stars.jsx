import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Stars() {
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 5,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.6 }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []); // solo al montar

  return null;
}
