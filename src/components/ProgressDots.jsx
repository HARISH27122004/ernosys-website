import { useEffect, useState } from 'react';
import '../styles/ProgressDots.css';

const sections = ['hero', 'story', 'features', 'parallax', 'specs'];

export default function ProgressDots() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    function onScroll() {
      const sy = window.scrollY;
      const wh = window.innerHeight;
      let idx  = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && sy >= el.offsetTop - wh * 0.5) idx = i;
      });
      setActiveIdx(idx);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="progress-dots">
      {sections.map((id, i) => (
        <button
          key={id}
          className={`progress-dots__dot${i === activeIdx ? ' active' : ''}`}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={`Go to ${id}`}
        />
      ))}
    </div>
  );
}
