import { useEffect, useRef } from 'react';
import '../styles/Story.css';

export default function Story() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const dialRef    = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const sy  = window.scrollY;
      const wh  = window.innerHeight;
      const top = section.offsetTop;
      const h   = section.offsetHeight;
      const prog = Math.max(0, Math.min(1, (sy - top) / (h - wh)));

      const r = Math.min(prog * 1.5, 1) * 100;
      if (bgRef.current) bgRef.current.style.clipPath = `circle(${r}% at 50% 50%)`;

      const showContent = prog > 0.15;
      if (dialRef.current) dialRef.current.classList.toggle('visible', showContent);
      if (textRef.current) textRef.current.classList.toggle('visible', showContent);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="story" className="story" ref={sectionRef}>
      <div className="story__sticky">
        <div className="story__bg-panel" ref={bgRef} />
        <div className="story__content">
          <div className="story__visual">
            <div className="story__dial-outer" ref={dialRef}>
              <div className="story__dial-inner">
                <span className="story__dial-brand">Chronos</span>
                <span className="story__dial-number">XII</span>
              </div>
            </div>
          </div>
          <div className="story__text" ref={textRef}>
            <span className="story__label">Heritage</span>
            <h2 className="story__heading">
              Born from the
              <br />
              art of time
            </h2>
            <div className="story__divider" />
            <p className="story__body">
              Every movement tells a story. Forged in the high workshops of Geneva, each piece
              carries 176 years of accumulated mastery — where the mechanical and the poetic
              converge into a single, perpetual instant.
            </p>
            <div className="story__divider" />
            <p className="story__body">The Absolue is not merely worn. It is inhabited.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
