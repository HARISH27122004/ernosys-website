import { useEffect, useRef } from 'react';
import '../styles/Hero.css';
import image from '../images/Robot.png';
import { useNavigate, useNavigation } from 'react-router-dom';

/* ── Floating particles ── */
const Particles = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 14 + 8,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.5 + 0.15,
  }));

  return (
    <div className="hero__particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="hero__particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ── Hero ── */
const Hero = () => {
  const robotRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let frame;
    let angle = 0;
    const animate = () => {
      angle += 0.012;
      if (robotRef.current) {
        robotRef.current.style.transform = `translateY(${Math.sin(angle) * 12}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Background layer */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid" />
        <div className="hero__bg-glow hero__bg-glow--left" />
        <div className="hero__bg-glow hero__bg-glow--right" />
        <div className="hero__bg-nebula" />
      </div>

      <Particles />

      <div className="hero__container">
        {/* Left — text */}
        <div className="hero__text">
          {/* <div className="hero__badge">
            <span className="hero__badge-dot" />
            Space Science · Robotics · Innovation
          </div> */}

          <h1 className="hero__heading">
            <span className="hero__heading-line">Innovation</span>
            <span className="hero__heading-line hero__heading-line--accent">Space Science</span>
            <span className="hero__heading-line">Learning through</span>
            <span className="hero__heading-line hero__heading-line--glow">Robotics Toys.</span>
          </h1>

          <p className="hero__subtext">
            We design and manufacture educational robotics toys that make space science
            <strong> simple, fun, and interactive</strong> for children age 5–14.
          </p>

          <div className="hero__cta">
            <button className="hero__cta-btn hero__cta-btn--primary" onClick={()=>navigate('/products')}>
              <span>Explore Products</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <button className="hero__cta-btn hero__cta-btn--ghost">Watch Demo</button>
          </div>

          <div className="hero__stats">
            {[['5K+', 'Happy Kids'], ['50+', 'Toy Models'], ['4.9★', 'Rating']].map(([num, label]) => (
              <div key={label} className="hero__stat">
                <span className="hero__stat-num">{num}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — robot */}
        <div className="hero__visual">
          <div className="hero__robot-wrapper">
            <div className="hero__robot-glow" />
            <div className="hero__robot-ring hero__robot-ring--1" />
            <div className="hero__robot-ring hero__robot-ring--2" />
<div className="hero__robot-float" ref={robotRef}>
  <img src={image} alt="Space Robot" className="hero__robot-img" />
</div>
            <div className="hero__robot-shadow" />
          </div>
        </div>
      </div>

      {/* scroll hint */}
      {/* <div className="hero__scroll-hint" aria-label="Scroll down">
        <span />
      </div> */}
    </section>
  );
};

export default Hero;