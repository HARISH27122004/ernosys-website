import '../styles/Footer.css';

const FooterLinks = {
  Products: ['Lunar Rover Kit', 'Space Station Builder', 'Robot Arm Series', 'Coding Droid', 'Constellation Map'],
  Company:  ['About Us', 'Our Mission', 'Careers', 'Press Kit', 'Contact'],
  Support:  ['FAQs', 'Shipping Info', 'Returns', 'Track Order', 'Warranty'],
  Learn:    ['Blog', 'STEM Resources', 'Teacher Guide', 'Parent Tips', 'Video Tutorials'],
};

const Socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <line x1="8" y1="11" x2="8" y2="16" />
        <line x1="8" y1="8" x2="8" y2="8.5" strokeWidth="2.5" />
        <path d="M12 11v5M12 11a3 3 0 0 1 6 0v5" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      {/* Background layers */}
      <div className="footer__bg" aria-hidden="true">
        <div className="footer__bg-grid" />
        <div className="footer__bg-glow footer__bg-glow--left" />
        <div className="footer__bg-glow footer__bg-glow--right" />
        <div className="footer__bg-line" />
      </div>

      <div className="footer__inner">

        {/* ── Top: brand + newsletter ── */}
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">
              <span className="footer__logo-bracket">[</span>
              ERNOSYS
              <span className="footer__logo-bracket">]</span>
            </span>
            <p className="footer__tagline">
              Making space science <strong>simple, fun,</strong> and
              <strong> interactive</strong> for the next generation of innovators.
            </p>
            <div className="footer__socials">
              {Socials.map((s) => (
                <a key={s.label} href={s.href} className="footer__social-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__newsletter">
            <span className="footer__newsletter-label">Stay in orbit</span>
            <h3 className="footer__newsletter-heading">Get launch updates &amp; deals</h3>
            <div className="footer__newsletter-form">
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="your@email.com"
                aria-label="Email address"
              />
              <button className="footer__newsletter-btn" type="button">
                Subscribe
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="footer__newsletter-note">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer__divider" />

        {/* ── Middle: links grid ── */}
        <div className="footer__links">
          {Object.entries(FooterLinks).map(([section, links]) => (
            <div key={section} className="footer__link-col">
              <h4 className="footer__link-heading">{section}</h4>
              <ul className="footer__link-list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="footer__divider" />

        {/* ── Bottom bar ── */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Ernosys Infotech Pvt. Ltd. All rights reserved.
          </p>
          <div className="footer__legal">
            {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map((item, i, arr) => (
              <span key={item} className="footer__legal-item">
                <a href="#" className="footer__legal-link">{item}</a>
                {i < arr.length - 1 && <span className="footer__legal-dot">·</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}