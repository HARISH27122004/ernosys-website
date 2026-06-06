import React, { useEffect, useRef } from "react";
import { useNavigate} from "react-router-dom";
import "../styles/ProductsSection.css";

/* ─────────────────────────────────────────────────────
   Canvas particle hook — matching hero particles (#4fc3f7)
───────────────────────────────────────────────────── */
const useParticles = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;
    let W, H;
    const TOTAL = 28;
    const particles = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < TOTAL; i++) {
        particles.push({
          x:        Math.random() * W,
          y:        Math.random() * H,
          size:     Math.random() * 3 + 1,
          duration: Math.random() * 14 + 8,
          delay:    Math.random() * 8,
          opacity:  Math.random() * 0.5 + 0.15,
          phase:    Math.random() * Math.PI * 2,
          speed:    Math.random() * 0.007 + 0.003,
        });
      }
    };

    let tick = 0;
    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        const a = p.opacity * (0.5 + 0.5 * Math.sin(p.phase + tick * p.speed));

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        g.addColorStop(0,   `rgba(79,195,247,${a})`);
        g.addColorStop(1,   `rgba(79,195,247,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,195,247,${a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [canvasRef]);
};

/* ─────────────────────────────────────────────────────
   Product data
───────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    title: "Educational Robotics Toy",
    description:
      "Interactive and fun products that make learning about space simple and exciting.",
    animationDelay: "0s",
    icon: (
      <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="27" cy="19" r="9" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="27" cy="19" r="4" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1" />
        <line x1="27" y1="28" x2="27" y2="36" stroke="#00d4ff" strokeWidth="1.5" />
        <line x1="19" y1="33" x2="35" y2="33" stroke="#00d4ff" strokeWidth="1.5" />
        <line x1="19" y1="33" x2="15" y2="43" stroke="#00d4ff" strokeWidth="1.5" />
        <line x1="35" y1="33" x2="39" y2="43" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="15" cy="13" r="2" fill="#00d4ff" opacity="0.45" />
        <circle cx="39" cy="11" r="2" fill="#00d4ff" opacity="0.45" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Space Rover Kit",
    description:
      "Hands-on kits that allow students to simulate real space exploration missions.",
    animationDelay: "1.5s",
    icon: (
      <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="28" width="34" height="13" rx="4" stroke="#00d4ff" strokeWidth="1.5" />
        <ellipse cx="27" cy="22" rx="11" ry="6" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="18" cy="35" r="3.5" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1" />
        <circle cx="36" cy="35" r="3.5" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1" />
        <line x1="27" y1="16" x2="27" y2="11" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="27" cy="9" r="2" fill="#00d4ff" />
        <line x1="10" y1="35" x2="6" y2="42" stroke="#00d4ff" strokeWidth="1.5" />
        <line x1="44" y1="35" x2="48" y2="42" stroke="#00d4ff" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Planetary Model Kit",
    description:
      "Fun way to understand planets, orbiting systems, and space science concepts visually.",
    animationDelay: "3s",
    icon: (
      <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="27" cy="27" r="13" stroke="#00d4ff" strokeWidth="1.5" />
        <ellipse cx="27" cy="27" rx="13" ry="5" stroke="#00d4ff" strokeWidth="1" opacity="0.45" />
        <circle cx="27" cy="27" r="5" fill="rgba(0,212,255,0.18)" stroke="#00d4ff" strokeWidth="1" />
        <circle cx="40" cy="27" r="3" fill="rgba(0,212,255,0.25)" stroke="#00d4ff" strokeWidth="1" />
        <circle cx="15" cy="19" r="2" fill="rgba(0,212,255,0.22)" stroke="#00d4ff" strokeWidth="0.8" />
        <line x1="27" y1="14" x2="27" y2="9" stroke="#00d4ff" strokeWidth="1" />
        <line x1="27" y1="40" x2="27" y2="45" stroke="#00d4ff" strokeWidth="1" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────── */
const LogoChip = () => (
  <div className="ps-card-logo">
    <div className="ps-logo-icon">E</div>
    <span>Ernosys Infotech</span>
  </div>
);

const ProductCard = ({ title, description, icon, animationDelay }) => (
  <div className="ps-card">
    <div className="ps-scan-line" style={{ animationDelay }} />
    <span className="ps-corner-br" />
    <LogoChip />
    <div className="ps-card-icon">{icon}</div>
    <h3 className="ps-card-title">{title}</h3>
    <p className="ps-card-desc">{description}</p>
  </div>
);

/* ─────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────────── */
const ProductsSection = () => {

  const canvasRef = useRef(null);
  const navigate = useNavigate();
  useParticles(canvasRef);

  return (
    <section className="ps-section" id="products">
      {/* Hero-style background layers */}
      <div className="ps-bg" aria-hidden="true">
        <div className="ps-bg-grid" />
        <div className="ps-bg-glow ps-bg-glow--left" />
        <div className="ps-bg-glow ps-bg-glow--right" />
        <div className="ps-bg-nebula" />
      </div>

      {/* Animated particles */}
      <canvas ref={canvasRef} className="ps-particles" />

      {/* Content */}
      <div className="SectionOuter">
        <div className="ps-header">
          <h2 className="ps-heading">
            Explore Our <span className="ps-heading-accent">Robotics Toys</span>
          </h2>
          <p className="ps-subheading">
            Engaging hands-on products designed to teach students aged 5–14 about
            space science through interactive play and learning.
          </p>
        </div>

        <div className="ps-cards-wrapper">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="ps-cta">
          <button  className="ps-btn" onClick={()=> navigate("/products")}>
            <span>View All Products</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;