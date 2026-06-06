import { useEffect, useRef } from 'react';
import '../styles/Services.css';

const services = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Robotics Starter Kits',
    body: 'Beginner-friendly kits that introduce children to robotics with step-by-step guided assembly and fun challenges.',
    tag: 'Ages 5–8',
    accent: '#00e5ff',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="22" />
        <line x1="2" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: 'Space Science Explorer',
    body: 'Interactive models of the solar system, planetary motion, and space exploration concepts built to spark curiosity.',
    tag: 'Ages 8–11',
    accent: '#4fc3f7',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h.01M11 8h6M7 12h3M14 12h3" />
      </svg>
    ),
    title: 'Coding & Programming',
    body: 'Block-based and text-based programming kits that teach logic, loops, and problem-solving through robotics play.',
    tag: 'Ages 10–14',
    accent: '#00e5ff',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'STEM Workshop Kits',
    body: 'Classroom-ready kits with teacher guides, group activities, and curriculum-aligned experiments for schools.',
    tag: 'Schools',
    accent: '#4fc3f7',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Advanced Rover Series',
    body: 'Programmable lunar and Mars rover models with sensors, motors, and obstacle avoidance for advanced learners.',
    tag: 'Ages 12–14',
    accent: '#00e5ff',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Parent & Teacher Training',
    body: 'Guided training sessions and resource packs helping parents and educators get the most out of every kit.',
    tag: 'Educators',
    accent: '#4fc3f7',
  },
];

export default function Services() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('svc__card--visible');
      }),
      { threshold: 0.12 }
    );
    cardsRef.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="svc" id="service">
      {/* Background */}
      <div className="svc__bg" aria-hidden="true">
        <div className="svc__bg-grid" />
        <div className="svc__bg-glow svc__bg-glow--left" />
        <div className="svc__bg-glow svc__bg-glow--right" />
        <div className="svc__bg-nebula" />
      </div>

      <div className="svc__container">

        {/* Header */}
        <div className="svc__header">
          <span className="svc__label">What We Offer</span>
          <h2 className="svc__heading">
            Our <span className="svc__heading--accent">Services</span>
          </h2>
          <p className="svc__subtext">
            Explore our hands-on robotics kits and training programs designed to
            empower young learners and educators alike.
          </p>
        </div>

        {/* Cards */}
        <div className="svc__grid">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="svc__card"
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ '--delay': `${i * 0.07}s`, '--accent': s.accent }}
            >
              <div className="svc__card-glow" />
              <div className="svc__icon">{s.icon}</div>
              <span className="svc__tag">{s.tag}</span>
              <h3 className="svc__card-title">{s.title}</h3>
              <p className="svc__card-body">{s.body}</p>
              <div className="svc__card-footer">
                <span className="svc__learn">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="svc__cta-wrap">
          <button className="svc__cta">
            <span>View All Services</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}