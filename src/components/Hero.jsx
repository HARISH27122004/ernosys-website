import { useEffect, useRef } from 'react';
import '../styles/Hero.css';

function buildMarkers() {
  const markers = [];
  const r = 135;
  for (let i = 0; i < 60; i++) {
    const isBig = i % 5 === 0;
    const angle = (i / 60) * 360;
    const rad = (angle * Math.PI) / 180;
    const cx = 50 + r * Math.cos(rad - Math.PI / 2);
    const cy = 50 + r * Math.sin(rad - Math.PI / 2);
    markers.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${cx}%`,
          top: `${cy}%`,
          width: isBig ? '2px' : '1px',
          height: isBig ? '12px' : '6px',
          background: `rgba(184,151,90,${isBig ? 0.8 : 0.4})`,
          transform: `translate(-50%,-50%) rotate(${angle}deg)`,
          transformOrigin: '50% 50%',
        }}
      />
    );
  }
  return markers;
}

export default function Hero() {
  const hourRef = useRef(null);
  const minRef  = useRef(null);
  const secRef  = useRef(null);

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const h = now.getHours() % 12;
      const m = now.getMinutes();
      const s = now.getSeconds();
      if (hourRef.current) hourRef.current.style.transform = `rotate(${h * 30 + m * 0.5}deg)`;
      if (minRef.current)  minRef.current.style.transform  = `rotate(${m * 6 + s * 0.1}deg)`;
      if (secRef.current)  secRef.current.style.transform  = `rotate(${s * 6}deg)`;
    }
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero__bg" />
      <div className="hero__ring" />
      <div className="hero__ring" />
      <div className="hero__ring" />

      <div className="hero__watch">
        <div className="hero__watch-face">
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}>
            {buildMarkers()}
          </div>
          <div ref={hourRef} className="hero__hand hero__hand--hour" />
          <div ref={minRef}  className="hero__hand hero__hand--min" />
          <div ref={secRef}  className="hero__hand hero__hand--sec" />
          <div className="hero__watch-center" />
        </div>
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">Chronos — Maison de Horlogerie</p>
        <h1 className="hero__title">
          The <em>Absolue</em>
          <br />
          Timepiece
        </h1>
        <p className="hero__sub">Since 1847 · Geneva, Switzerland</p>
      </div>

      <div className="hero__scroll-cue">
        <span>Discover</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
