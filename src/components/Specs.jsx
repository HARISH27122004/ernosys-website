import { useEffect, useRef } from 'react';
import '../styles/Specs.css';

const specData = [
  { number: '38', unit: 'mm', label: 'Case diameter',    desc: 'High-tech ceramic case, polished and sandblasted finish' },
  { number: '12', unit: 'mm', label: 'Case thickness',   desc: 'Ultra-thin profile for ergonomic wrist presence' },
  { number: '70', unit: 'h',  label: 'Power reserve',    desc: 'Self-winding mechanical movement, caliber 3125' },
  { number: '200',unit: 'm',  label: 'Water resistance', desc: 'Triple-seal crown, screw-locked caseback' },
  { number: '±2', unit: 's',  label: 'Daily accuracy',   desc: 'COSC chronometer certified, per-day deviation' },
  { number: '176',unit: 'y',  label: 'Maison history',   desc: 'Uninterrupted craft since 1847, Geneva Switzerland' },
];

export default function Specs() {
  const itemRefs = useRef([]);

  useEffect(() => {
    function onScroll() {
      const wh = window.innerHeight;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < wh * 0.88) {
          setTimeout(() => el.classList.add('visible'), i * 80);
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="specs" className="specs">
      <div className="specs__header">
        <span className="specs__label">Technical Excellence</span>
        <h2 className="specs__heading">Specifications</h2>
      </div>
      <div className="specs__grid">
        {specData.map((s, i) => (
          <div
            key={i}
            className="specs__item"
            ref={(el) => (itemRefs.current[i] = el)}
          >
            <div className="specs__number">
              {s.number}
              <span className="specs__unit">{s.unit}</span>
            </div>
            <div className="specs__item-label">{s.label}</div>
            <div className="specs__item-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
