import { useEffect, useRef } from 'react';
import '../styles/ParallaxQuote.css';

export default function ParallaxQuote() {
  const sectionRef = useRef(null);
  const layerRef   = useRef(null);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      const layer   = layerRef.current;
      if (!section || !layer) return;
      const paraRel = window.scrollY - section.offsetTop;
      layer.style.transform = `translateY(${paraRel * 0.35}px)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="parallax" className="parallax-quote" ref={sectionRef}>
      <div className="parallax-quote__layer" ref={layerRef}>
        <svg
          viewBox="0 0 1400 900"
          className="parallax-quote__svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="radG" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a1610" />
              <stop offset="100%" stopColor="#0a0908" />
            </radialGradient>
          </defs>
          <rect width="1400" height="900" fill="url(#radG)" />
          <circle cx="700" cy="450" r="350" fill="none" stroke="rgba(184,151,90,0.06)" strokeWidth="1" />
          <circle cx="700" cy="450" r="280" fill="none" stroke="rgba(184,151,90,0.08)" strokeWidth="0.5" />
          <circle cx="700" cy="450" r="200" fill="none" stroke="rgba(184,151,90,0.12)" strokeWidth="0.5" />
          <circle cx="700" cy="450" r="120" fill="none" stroke="rgba(184,151,90,0.18)" strokeWidth="0.5" />
          <line x1="0" y1="450" x2="1400" y2="450" stroke="rgba(184,151,90,0.04)" strokeWidth="0.5" />
          <line x1="700" y1="0" x2="700" y2="900" stroke="rgba(184,151,90,0.04)" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="parallax-quote__text">
        <p className="parallax-quote__quote">
          "Time is the substance I am made of.
          <br />
          Time is a river which sweeps me along."
        </p>
        <span className="parallax-quote__attr">Jorge Luis Borges — Labyrinths</span>
      </div>
    </section>
  );
}
