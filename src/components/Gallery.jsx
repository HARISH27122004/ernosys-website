import { useState, useRef, useEffect } from 'react';
import '../styles/Gallery.css';

/* ─────────────────────────────────────────
   Gallery data
───────────────────────────────────────── */
const ITEMS = [
  {
    id: 1,
    label: 'UNIT-01',
    title: 'First Contact',
    caption: 'A child reaches out to a learning robot for the first time.',
    src:   'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    hover: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    span: 'tall',
  },
  {
    id: 2,
    label: 'UNIT-02',
    title: 'Kids Support',
    caption: 'Engineer and robot collaborate on a circuit design.',
    src:   'https://plus.unsplash.com/premium_photo-1683121439823-8ea4aeaf9196?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpbGQlMjBjYXJlJTIwcm9ib3R8ZW58MHx8MHx8fDA%3D',
    hover: 'https://plus.unsplash.com/premium_photo-1683121437372-1ee095002e67?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    span: 'wide',
  },
  {
    id: 3,
    label: 'UNIT-03',
    title: 'Robot Cares',
    caption: 'A teacher guides students through an orbital simulation.',
    src:   'https://images.unsplash.com/photo-1767966773527-43fa6ae611c9?q=80&w=1034&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hover: 'https://images.unsplash.com/photo-1767954561407-7014cb8fb16c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    span: 'normal',
  },
  {
    id: 4,
    label: 'UNIT-04',
    title: 'Digital Hands',
    caption: 'Robotic arms assemble micro-components alongside humans.',
    src:   'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hover: 'https://images.unsplash.com/photo-1652127691413-6cb8c0304aba?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    span: 'normal',
  },
  {
    id: 5,
    label: 'UNIT-05',
    title: 'Future Play',
    caption: 'Children explore robotic toys in a futuristic classroom.',
    src:   'https://plus.unsplash.com/premium_photo-1663126673686-9a3e5522f224?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hover: 'https://plus.unsplash.com/premium_photo-1663091699742-70ca6f835197?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    span: 'wide-bottom',
  },
];

/* ─────────────────────────────────────────
   True touch-only device detection.
   (hover: none) + (pointer: coarse) only
   matches real touch screens — Chrome desktop
   with touchpoints enabled still has hover:hover.
───────────────────────────────────────── */
const isTouchOnly = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

/* ─────────────────────────────────────────
   GlitchCard
   activeId / setActiveId passed from Gallery
   so only one card is active at a time on mobile
───────────────────────────────────────── */
const GlitchCard = ({ item, index, activeId, setActiveId }) => {
  const hovered = activeId === item.id;          // desktop hover OR mobile active
  const [glitching, setGlitching] = useState(false);
  const [visible, setVisible]     = useState(false);
  const cardRef    = useRef(null);
  const glitchTimer = useRef(null);

  /* Intersection observer — entrance animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  /* Trigger glitch burst */
  const startGlitch = () => {
    setGlitching(true);
    clearTimeout(glitchTimer.current);
    glitchTimer.current = setTimeout(() => setGlitching(false), 700);
  };

  useEffect(() => () => clearTimeout(glitchTimer.current), []);

  /* ── Desktop: mouse enter/leave ── */
  const handleMouseEnter = () => {
    if (isTouchOnly()) return;
    setActiveId(item.id);
    startGlitch();
  };
  const handleMouseLeave = () => {
    if (isTouchOnly()) return;
    setActiveId(null);
    startGlitch();
  };

  /* ── Mobile: tap ──
     Tapping this card activates it (and Gallery
     deactivates any previously active card).
     Tapping the same card again deactivates it.  */
  const handleTap = (e) => {
    if (!isTouchOnly()) return;
    e.preventDefault();
    const next = activeId === item.id ? null : item.id;
    setActiveId(next);
    startGlitch();
  };

  return (
    <div
      ref={cardRef}
      className={`gallery__card gallery__card--${item.span} ${visible ? 'gallery__card--visible' : ''}`}
      style={{ '--delay': `${index * 0.1}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTap}
    >
      {/* Base image */}
      <img
        src={item.src}
        alt={item.title}
        className={`gallery__img gallery__img--base ${hovered ? 'gallery__img--hidden' : ''}`}
        loading="lazy"
      />

      {/* Hover / active image */}
      <img
        src={item.hover}
        alt={`${item.title} — alternate`}
        className={`gallery__img gallery__img--hover ${hovered ? 'gallery__img--shown' : ''}`}
        loading="lazy"
      />

      {/* Glitch slices */}
      {glitching && (
        <div className="gallery__glitch" aria-hidden="true">
          <div className="gallery__glitch-slice gallery__glitch-slice--1" style={{ backgroundImage: `url(${hovered ? item.hover : item.src})` }} />
          <div className="gallery__glitch-slice gallery__glitch-slice--2" style={{ backgroundImage: `url(${hovered ? item.hover : item.src})` }} />
          <div className="gallery__glitch-slice gallery__glitch-slice--3" style={{ backgroundImage: `url(${hovered ? item.hover : item.src})` }} />
          <div className="gallery__glitch-rgb gallery__glitch-rgb--r"    style={{ backgroundImage: `url(${hovered ? item.hover : item.src})` }} />
          <div className="gallery__glitch-rgb gallery__glitch-rgb--b"    style={{ backgroundImage: `url(${hovered ? item.hover : item.src})` }} />
        </div>
      )}

      {/* Scanlines */}
      <div className="gallery__scanlines" aria-hidden="true" />

      {/* Corner brackets */}
      <span className="gallery__corner gallery__corner--tl" />
      <span className="gallery__corner gallery__corner--tr" />
      <span className="gallery__corner gallery__corner--bl" />
      <span className="gallery__corner gallery__corner--br" />

      {/* Info overlay */}
      <div className={`gallery__info ${hovered ? 'gallery__info--visible' : ''}`}>
        <span className="gallery__info-label">{item.label}</span>
        <h3 className="gallery__info-title">{item.title}</h3>
        <p className="gallery__info-caption">{item.caption}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Gallery Section
   activeId lives here — shared across all cards
───────────────────────────────────────── */
const Gallery = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="gallery" id="gallery">
      <div className="gallery__grid">
        {ITEMS.map((item, i) => (
          <GlitchCard
            key={item.id}
            item={item}
            index={i}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;