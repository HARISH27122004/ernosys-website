import { useEffect, useRef, useState } from "react";
import '../styles/FlipProductCard.css'

export default function FlipProductCard({ product, index }) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [ready, setReady] = useState(false);
  const hasFlipped = useRef(false); // never un-flip mid-session

  useEffect(() => {
    // Paint guard: wait 2 frames before enabling transitions AND observing.
    // On mobile card #1 is in the viewport on load — without this guard the
    // observer fires before the CSS transition is live and the card snaps.
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const el = cardRef.current;
    if (!el) return;

    // ── Scroll-progress flip ──────────────────────────────────────────
    // Instead of IntersectionObserver we track the card's position on
    // every scroll tick. The flip triggers when the card's vertical
    // centre crosses 75% of the viewport height — so it *feels* like
    // the scroll gesture is physically turning the card over.
    const checkFlip = () => {
      if (hasFlipped.current) return; // already flipped, nothing to do
      const rect = el.getBoundingClientRect();
      const cardCentre = rect.top + rect.height / 2;
      const triggerLine = window.innerHeight * 0.75;

      if (cardCentre < triggerLine) {
        hasFlipped.current = true;
        setFlipped(true);
      }
    };

    // Run once immediately (handles card #1 on mobile which is already
    // past the trigger line on load)
    checkFlip();

    window.addEventListener("scroll", checkFlip, { passive: true });

    // Reset on scroll-to-top so the animation can replay
    const handleReset = () => {
      if (window.scrollY <= 5) {
        hasFlipped.current = false;
        setFlipped(false);
      }
    };
    window.addEventListener("scroll", handleReset, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkFlip);
      window.removeEventListener("scroll", handleReset);
    };
  }, [ready]);

  return (
    <div
      ref={cardRef}
      className="fc-card"
      style={{
        "--tag-color": product.tagColor,
        // No stagger delay on mobile — it makes early cards look broken.
        // On desktop the grid layout means all cards enter together so a
        // small delay looks intentional; on mobile they stack vertically
        // and each one should flip individually as it scrolls into view.
        "--delay": `${typeof window !== "undefined" && window.innerWidth < 768 ? 0 : index * 0.08}s`,
      }}
    >
      <div className={`fc-inner${ready ? " fc-ready" : ""}${flipped ? " flipped" : ""}`}>

        {/* ── FRONT ── */}
        <div className="fc-face fc-front">
          <img src={product.image} alt={product.title} className="fc-image" />
          <div className="fc-img-overlay" />
          {/* <span className="fc-tag">{product.tag}</span> */}
          <div className="fc-front-footer">
            <h3 className="fc-front-title">{product.title}</h3>
            <p className="fc-front-hint">
              <span className="fc-hint-arrow">↓</span>
              Scroll to reveal
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="fc-face fc-back">
          <div className="fc-corner-tl" />
          <div className="fc-corner-br" />

          <div className="fc-back-header">
            <div className="fc-back-header-left">
              <span className="fc-back-label">Product</span>
              <h3 className="fc-title">{product.title}</h3>
            </div>
            <div className="fc-back-header-right">
              <span className="fc-back-label">Price</span>
              <span className="fc-price">{product.price}</span>
            </div>
          </div>

          <p className="fc-desc">{product.description}</p>

          <div className="fc-divider" />

          <ul className="fc-features">
            {product.features.map((feature, i) => (
              <li key={i}>
                <span className="feat-dot" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="fc-meta">
            <span className="fc-meta-badge">{product.ageRange}</span>
            <span className="fc-meta-badge fc-meta-level">{product.level}</span>
          </div>

          <button className="buy-btn">
            <span>Buy Now</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}