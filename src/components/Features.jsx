import { useEffect, useRef } from 'react';
import '../styles/Features.css';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Age-Appropriate Design',
    body: 'Specially designed for children aged 5–14 with simple logic, intuitive assembly, and child-safe components at every step.',
    tag: 'Safety First',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Interactive Learning',
    body: 'Encourages hands-on exploration instead of passive memorization — children learn by doing, building, and discovering.',
    tag: 'STEM Focused',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Concept Simplification',
    body: 'Complex space science topics — planets, solar systems, orbital mechanics — made easy through activity-based methods.',
    tag: 'Space Science',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Safe & Eco-Friendly',
    body: 'Built using child-safe, non-toxic, and environmentally friendly materials — because the planet matters as much as the kids.',
    tag: 'Certified Safe',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h.01M12 8h5M7 11h5M15 11h2" />
      </svg>
    ),
    title: 'Curriculum Aligned',
    body: 'Each toy maps directly to school science syllabi, making it a perfect complement to classroom learning for ages 5–14.',
    tag: 'School Ready',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Parent & Teacher Guides',
    body: 'Every kit ships with detailed parent and educator guides to make guided discovery easy, fun, and truly educational.',
    tag: 'Co-Learning',
  },
];

/* ── Particles ── */
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
    <div className="features__particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="features__particle"
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

export default function Features() {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('features__card--visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="features" id="features" ref={sectionRef}>
      {/* Background */}
      <div className="features__bg" aria-hidden="true">
        <div className="features__bg-grid" />
        <div className="features__bg-glow features__bg-glow--left" />
        <div className="features__bg-glow features__bg-glow--right" />
        <div className="features__bg-nebula" />
      </div>

      <Particles />

      <div className="features__container">

        {/* ── Header ── */}
        <div className="features__header">
          <span className="features__label">Why Choose Us</span>
          <h2 className="features__heading">
            What Are Our
            <span className="features__heading--accent"> Robotics Toys?</span>
          </h2>
          <p className="features__subtext">
            Our robotics toys are educational products designed to teach space science
            concepts such as planets, solar systems, and space exploration using
            <strong> interactive and activity-based methods.</strong>
          </p>
          <button className="features__cta">
            <span>View All Features</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── Cards grid ── */}
        <div className="features__grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="features__card"
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ '--delay': `${i * 0.08}s` }}
            >
              <div className="features__card-top">
                <div className="features__icon">{f.icon}</div>
                <span className="features__tag">{f.tag}</span>
              </div>
              <h3 className="features__card-title">{f.title}</h3>
              <p className="features__card-body">{f.body}</p>
              <div className="features__card-line" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}