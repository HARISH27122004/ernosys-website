import { useEffect, useRef } from 'react';
import '../styles/About.css';


export default function About() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const robotRef   = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const sy   = window.scrollY;
      const wh   = window.innerHeight;
      const top  = section.offsetTop;
      const h    = section.offsetHeight;
      const prog = Math.max(0, Math.min(1, (sy - top) / (h - wh)));

      const r = Math.min(prog * 1.5, 1) * 100;
      if (bgRef.current) bgRef.current.style.clipPath = `circle(${r}% at 50% 50%)`;

      const showContent = prog > 0.15;
      if (robotRef.current) robotRef.current.classList.toggle('visible', showContent);
      if (textRef.current)  textRef.current.classList.toggle('visible',  showContent);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__sticky">
        {/* Scroll-reveal dark panel */}
        <div className="about__bg-panel" ref={bgRef}>
          <div className="about__bg-grid" />
          <div className="about__bg-glow about__bg-glow--left" />
          <div className="about__bg-glow about__bg-glow--right" />
          <div className="about__bg-nebula" />
        </div>

        {/* Floating particles */}
        <div className="about__particles" aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <span
              key={i}
              className="about__particle"
              style={{
                left: `${Math.random() * 100}%`,
                top:  `${Math.random() * 100}%`,
                width:  Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.15,
                animationDuration: `${Math.random() * 14 + 8}s`,
                animationDelay:    `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        <div className="about__content">
          {/* Left — robot in glowing circle */}
          <div className="about__visual" ref={robotRef}>
            <div className="about__circle-wrapper">
              <div className="about__circle-glow" />
              <div className="about__circle-ring about__circle-ring--1" />
              <div className="about__circle-ring about__circle-ring--2" />
              <div className="about__circle-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80"
                  alt="Educational robotics"
                  className="about__circle-img"
                />
              </div>
              <div className="about__circle-shadow" />
            </div>
          </div>

          {/* Right — text */}
          <div className="about__text" ref={textRef}>
            <span className="about__label">Who We Are</span>

            <h2 className="about__heading">
              Inspiring the
              <br />
              <span className="about__heading--accent">next generation</span>
              <br />
              of innovators
            </h2>

            <div className="about__divider" />

            <p className="about__body">
              At <strong>Ernosys Infotech</strong>, we believe every child is a born
              engineer. We design and manufacture educational robotics toys that
              transform complex space science into hands-on, joyful discovery for
              children aged 5–14.
            </p>

            <div className="about__divider" />

            <p className="about__body">
              From rocket assembly kits to programmable lunar rovers, our products
              ignite curiosity, build problem-solving skills, and make the cosmos
              feel within reach.
            </p>

            <div className="about__stats">
              {[
                ['2018', 'Founded'],
                ['5K+',  'Happy Kids'],
                ['50+',  'Toy Models'],
              ].map(([num, label]) => (
                <div key={label} className="about__stat">
                  <span className="about__stat-num">{num}</span>
                  <span className="about__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}