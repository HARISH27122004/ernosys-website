import { useEffect, useRef } from 'react';
import '../styles/Features.css';

const panels = [
  {
    num: '01',
    roman: 'I',
    title: 'The Ceramic\nArchitecture',
    body: (
      <>
        High-tech ceramic, harder than steel and lighter than titanium.{' '}
        <strong>Scratch-resistant</strong> by nature, forged under 1400°C of pressure — the same
        process used in aerospace engineering.
      </>
    ),
    mod: 1,
  },
  {
    num: '02',
    roman: 'II',
    title: 'In-House\nMovement',
    body: (
      <>
        The caliber 3125 oscillates at <strong>21,600 vibrations per hour</strong>. Hand-finished
        bridges, bevelled and polished by artisans who dedicate years to perfecting a single
        gesture.
      </>
    ),
    mod: 2,
  },
  {
    num: '03',
    roman: 'III',
    title: 'Sapphire Crystal\nClarity',
    body: (
      <>
        A dome of sapphire crystal, <strong>anti-reflective on both surfaces</strong>, framing the
        dial like museum glass. Refractive index of 1.77 — vision undistorted by angle or light.
      </>
    ),
    mod: 3,
  },
  {
    num: '04',
    roman: 'IV',
    title: 'Water Resistance\nat Depth',
    body: (
      <>
        Rated to <strong>200 metres</strong>. Each crown threaded to a triple gasket seal. The case
        breathing under pressure — yet hermetically composed on the surface.
      </>
    ),
    mod: 4,
  },
  {
    num: '05',
    roman: 'V',
    title: 'Power Reserve\n& Precision',
    body: (
      <>
        A <strong>70-hour power reserve</strong>, maintained by a bidirectional rotor in 18k rose
        gold. Certified chronometric accuracy: ±2 seconds per day.
      </>
    ),
    mod: 5,
  },
];

export default function Features() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      const track   = trackRef.current;
      if (!section || !track) return;
      const sy   = window.scrollY;
      const wh   = window.innerHeight;
      const top  = section.offsetTop;
      const prog = Math.max(0, Math.min(1, (sy - top) / (section.offsetHeight - wh)));
      track.style.transform = `translateX(-${prog * 400}vw)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="features" className="features" ref={sectionRef}>
      <div className="features__sticky">
        <div className="features__track" ref={trackRef}>
          {panels.map((p) => (
            <div key={p.num} className={`features__panel features__panel--${p.mod}`}>
              <div className="features__panel-inner">
                <div className="features__panel-img">
                  <div className="features__circle">
                    <div className="features__circle-inner">
                      <span className="features__panel-icon">{p.roman}</span>
                    </div>
                  </div>
                </div>
                <div className="features__panel-text">
                  <div className="features__panel-num">{p.num}</div>
                  <div className="features__panel-rule" />
                  <h3 className="features__panel-title">
                    {p.title.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className="features__panel-body">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
