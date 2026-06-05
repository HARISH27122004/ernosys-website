import { useRef, useState, useEffect } from "react";
import "../styles/AboutUs.css";

const products = [
  {
    id: "01",
    name: "SYNAPSE AI",
    subtitle: "INTELLIGENT AUTOMATION CORE",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    desc: "Our flagship AI engine powering real-time decision automation across enterprise systems.",
  },
  {
    id: "02",
    name: "NEXUS BOT",
    subtitle: "ENTERPRISE PROCESS ROBOT",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
    desc: "End-to-end robotic process automation that scales seamlessly with your business operations.",
  },
  {
    id: "03",
    name: "AUTONOMY",
    subtitle: "SELF-LEARNING SYSTEMS",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    desc: "Adaptive machine-learning platforms that evolve with data, delivering precision insights.",
  },
  {
    id: "04",
    name: "CORTEX",
    subtitle: "COGNITIVE COMPUTING UNIT",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    desc: "Deep neural architectures designed for complex pattern recognition and prediction at scale.",
  },
];

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
              {/* Eye / view icon */}
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

export default function AboutUs() {
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
    <section className="au">
      {/* Background */}
      <div className="au__bg">
        <div className="au__bg-grid" />
        <div className="au__bg-glow au__bg-glow--left" />
        <div className="au__bg-glow au__bg-glow--right" />
        <div className="au__bg-nebula" />
      </div>

      {/* Corner brackets */}
      <span className="au__corner au__corner--tl" />
      <span className="au__corner au__corner--tr" />
      <span className="au__corner au__corner--bl" />
      <span className="au__corner au__corner--br" />

      <div className="au__inner">
        {/* ── LEFT PANEL ── */}
        <div className="au__left">
          <p className="au__body">
            Ernosys Infotech delivers <strong>intelligent AI &amp; automation solutions</strong> built
            for enterprise scale. Our platforms ensure operational precision, strategic
            advantage, and reduced overhead — empowering organisations to outpace
            evolving digital complexity.
          </p>

          <div className="au__tag">
            Innovation Ready &nbsp;·&nbsp; Anytime, Anywhere
          </div>

          <h2 className="au__heading">
            MEET OUR
            <span className="au__heading--accent">INTELLIGENT TECH</span>
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