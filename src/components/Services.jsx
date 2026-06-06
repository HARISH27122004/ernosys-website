import { useRef, useState, useEffect } from "react";
import "../styles/Services.css";

// ── Services content plugged into the AboutUs card structure ──
const products = [
  {
    id: "01",
    name: "STARTER KITS",
    subtitle: "ROBOTICS FOR BEGINNERS",
    image: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=800&q=80",
    desc: "Beginner-friendly kits that introduce children to robotics with step-by-step guided assembly and fun challenges.",
  },
  {
    id: "02",
    name: "SPACE EXPLORER",
    subtitle: "SPACE SCIENCE SERIES",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    desc: "Interactive models of the solar system, planetary motion, and space exploration concepts built to spark curiosity.",
  },
  {
    id: "03",
    name: "CODE & PLAY",
    subtitle: "CODING & PROGRAMMING",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    desc: "Block-based and text-based programming kits that teach logic, loops, and problem-solving through robotics play.",
  },
  {
    id: "04",
    name: "ROVER SERIES",
    subtitle: "ADVANCED ROVER BUILDS",
    image: "https://images.unsplash.com/photo-1614315517650-3771cf72d18a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm92ZXIlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    desc: "Programmable lunar and Mars rover models with sensors, motors, and obstacle avoidance for advanced learners.",
  },
];

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
    <div className="au__particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="au__particle"
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

function ProductCard({ product, isActive, onClick }) {
  return (
    <div
      className={`au-card ${isActive ? "au-card--active" : ""}`}
      onClick={() => onClick(product.id)}
    >
      <div className="au-card__top-bar" />
      <div className="au-card__num">/{product.id}</div>

      <div className="au-card__label">
        <h3 className="au-card__name">{product.name}</h3>
        <p className="au-card__subtitle">{product.subtitle}</p>
      </div>

      <div className="au-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="au-card__img"
          loading="lazy"
        />
        <div className="au-card__overlay">
          <div className="au-card__overlay-inner">
            <span className="au-card__overlay-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <span>View {product.name}</span>
          </div>
          <p className="au-card__desc">{product.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const scrollRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section className="au" id="service">
      {/* Background */}
      <div className="au__bg">
        <div className="au__bg-grid" />
        <div className="au__bg-glow au__bg-glow--left" />
        <div className="au__bg-glow au__bg-glow--right" />
        <div className="au__bg-nebula" />
      </div>

      <Particles />

      {/* Corner brackets */}
      <span className="au__corner au__corner--tl" />
      <span className="au__corner au__corner--tr" />
      <span className="au__corner au__corner--bl" />
      <span className="au__corner au__corner--br" />

      <div className="au__inner">
        {/* ── LEFT PANEL ── */}
        <div className="au__left">
          <p className="au__body">
            RoboSpark delivers <strong>hands-on robotics kits &amp; STEM programs</strong> built
            for young learners aged 5–14. Our curriculum-aligned products ensure
            creative exploration, logical thinking, and a genuine passion for
            science and technology from an early age.
          </p>

          <div className="au__tag">
            Hands-On Learning &nbsp;·&nbsp; Ages 5–14
          </div>

          <h2 className="au__heading">
            EXPLORE OUR
            <span className="au__heading--accent">SERVICES</span>
          </h2>
        </div>

        {/* ── SCROLL TRACK ── */}
        <div className="au__scroll-track" ref={scrollRef}>
          <div className="au__cards">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isActive={activeId === p.id}
                onClick={(id) => setActiveId(activeId === id ? null : id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}