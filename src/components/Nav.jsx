import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import '../styles/Nav.css';
import logo from '../images/ernosys.png'

gsap.registerPlugin(CustomEase);
CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
gsap.defaults({ ease: 'main', duration: 0.7 });

const NAV_LINKS = ['Home', 'About', 'Service', 'Products', 'Contact'];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const tlRef = useRef(null);

  /* ── DOM refs ── */
  const navWrapRef = useRef(null);
  const overlayRef = useRef(null);
  const menuPanelRef = useRef(null);
  const bgPanel1Ref = useRef(null);
  const bgPanel2Ref = useRef(null);
  const bgPanel3Ref = useRef(null);
  const menuLinksRef = useRef([]);
  const fadeTargetsRef = useRef([]);
  const btnTextWrapRef = useRef(null);   // hamburger scrolling text (navbar)
  const btnIconRef = useRef(null);   // hamburger + icon (navbar)
  const closeBtnRef = useRef(null);   // ✕ button INSIDE the panel

  /* ── Scroll hide/show ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(!(y > lastScrollY.current && y > 80));
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Initial GSAP states ── */
  useEffect(() => {
    gsap.set(navWrapRef.current, { display: 'none' });
    gsap.set(overlayRef.current, { autoAlpha: 0 });
    gsap.set(bgPanel1Ref.current, { xPercent: 101 });
    gsap.set(bgPanel2Ref.current, { xPercent: 101 });
    gsap.set(bgPanel3Ref.current, { xPercent: 101 });
    gsap.set(menuLinksRef.current, { yPercent: 140, rotation: 10 });
    gsap.set(fadeTargetsRef.current, { autoAlpha: 0, yPercent: 50 });
    gsap.set(btnTextWrapRef.current, { yPercent: 0 });
    gsap.set(btnIconRef.current, { rotation: 0 });
    /* Close button starts invisible, flies in during open */
    gsap.set(closeBtnRef.current, { autoAlpha: 0, rotation: 0, scale: 0.5 });
  }, []);

  /* ── OPEN ── */
  const openMenu = () => {
    setMenuOpen(true);
    navWrapRef.current.setAttribute('data-nav', 'open');

    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl
      /* Hamburger text: "Menu" → "Close" */
      .fromTo(btnTextWrapRef.current,
        { yPercent: 0 }, { yPercent: -50, duration: 0.55 })
      /* Hamburger icon: + → × (315°) */
      .fromTo(btnIconRef.current,
        { rotation: 0 }, { rotation: 315, duration: 0.55 }, '<')
      /* Show wrapper */
      .set(navWrapRef.current, { display: 'block' }, '<')
      /* Overlay fade in */
      .fromTo(overlayRef.current,
        { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55 }, '<')
      /* ── 3 bg panels wipe from right (Osmo signature) ── */
      .fromTo(bgPanel1Ref.current,
        { xPercent: 101 }, { xPercent: 0, duration: 0.55 }, '<')
      .fromTo(bgPanel2Ref.current,
        { xPercent: 101 }, { xPercent: 0, duration: 0.55 }, '<+=0.10')
      .fromTo(bgPanel3Ref.current,
        { xPercent: 101 }, { xPercent: 0, duration: 0.55 }, '<+=0.10')
      /* ── Close ✕ button pops in ── */
      .fromTo(closeBtnRef.current,
        { autoAlpha: 0, rotation: -90, scale: 0.5 },
        { autoAlpha: 1, rotation: 0, scale: 1, duration: 0.35, ease: 'back.out(1.7)' },
        '<+=0.20')
      /* ── Menu links reveal upward — FASTER ── */
      .fromTo(menuLinksRef.current,
        { yPercent: 140, rotation: 10 },
        { yPercent: 0, rotation: 0, stagger: 0.045, duration: 0.4, ease: 'power3.out' },
        '<+=0.05')
      /* ── Footer fade up ── */
      .fromTo(fadeTargetsRef.current,
        { autoAlpha: 0, yPercent: 50 },
        { autoAlpha: 1, yPercent: 0, stagger: 0.04, duration: 0.35 }, '<+=0.15');
  };

  /* ── CLOSE ── */
  const closeMenu = () => {
    navWrapRef.current.setAttribute('data-nav', 'closed');

    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline({ onComplete: () => setMenuOpen(false) });
    tlRef.current = tl;

    tl
      /* Close ✕ button spins out */
      .to(closeBtnRef.current,
        { autoAlpha: 0, rotation: 90, scale: 0.5, duration: 0.25, ease: 'power2.in' })
      /* Overlay fades */
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.5 }, '<')
      /* Panel slides right */
      .to(menuPanelRef.current, { xPercent: 120, duration: 0.5 }, '<')
      /* Hamburger resets */
      .to(btnTextWrapRef.current, { yPercent: 0, duration: 0.5 }, '<')
      .to(btnIconRef.current, { rotation: 0, duration: 0.5 }, '<')
      /* Hide + full reset for next open */
      .set(navWrapRef.current, { display: 'none' })
      .set(menuPanelRef.current, { xPercent: 0 })
      .set(bgPanel1Ref.current, { xPercent: 101 })
      .set(bgPanel2Ref.current, { xPercent: 101 })
      .set(bgPanel3Ref.current, { xPercent: 101 })
      .set(menuLinksRef.current, { yPercent: 140, rotation: 10 })
      .set(fadeTargetsRef.current, { autoAlpha: 0, yPercent: 50 })
      .set(closeBtnRef.current, { autoAlpha: 0, rotation: 0, scale: 0.5 });
  };

  /* ── Escape key ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && navWrapRef.current?.getAttribute('data-nav') === 'open')
        closeMenu();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* ── Scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar
        ${visible ? 'navbar--visible' : 'navbar--hidden'}
        ${scrolled ? 'navbar--scrolled' : ''}`}
      >
        <div className="navbar__logo">
          <img
            src={logo}
            alt="Ernosys Infotech Logo"
            className="navbar__logo-img"
          />
        </div>

        <ul className="navbar__links">
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="navbar__link">{item}</a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions--desktop">
          <button className="navbar__btn navbar__btn--outline">Call Us</button>
          <button className="navbar__btn navbar__btn--filled">Chat Us</button>
        </div>

        {/* Osmo hamburger — text scrolls, icon rotates */}
        <button
          className="menu-button"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <div ref={btnTextWrapRef} className="menu-button-text">
            <p className="menu-btn-label">Menu</p>
            <p className="menu-btn-label">Close</p>
          </div>
          <div className="icon-wrap">
            <svg
              ref={btnIconRef}
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="menu-button-icon"
            >
              <path d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16L7.33333 16Z" fill="currentColor" />
              <path d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
              <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
              <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
              <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
              <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
            </svg>
          </div>
        </button>
      </nav>

      {/* ══════════════════ MOBILE MENU ══════════════════ */}
      <div
        ref={navWrapRef}
        data-nav="closed"
        className="mobile-nav"
        aria-hidden={!menuOpen}
      >
        {/* Dark overlay — click to close */}
        <div ref={overlayRef} className="m-overlay" onClick={closeMenu} />

        {/* Sliding panel */}
        <nav ref={menuPanelRef} className="m-menu">

          {/* Three bg panels — wipe in staggered */}
          <div className="m-menu-bg">
            <div ref={bgPanel1Ref} className="m-bg-panel m-bg-panel--first" />
            <div ref={bgPanel2Ref} className="m-bg-panel m-bg-panel--second" />
            <div ref={bgPanel3Ref} className="m-bg-panel m-bg-panel--base" />
          </div>

          {/* ✕ Close button — lives INSIDE the panel, above all layers */}
          <button
            ref={closeBtnRef}
            className="m-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 2L18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M18 2L2 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Content */}
          <div className="m-menu-inner">
            <ul className="m-list">
              {NAV_LINKS.map((item, i) => (
                <li key={item} className="m-list__item">
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="m-list__link"
                    ref={(el) => { if (el) menuLinksRef.current[i] = el; }}
                    onClick={closeMenu}
                  >
                    <p className="m-list__heading">{item}</p>
                    {/* <p className="m-list__num">0{i + 1}</p> */}
                    <div className="m-link-bg" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="m-footer">
              <p
                className="m-footer__label"
                ref={(el) => { if (el) fadeTargetsRef.current[0] = el; }}
              >
                Actions
              </p>
              <div
                className="m-actions"
                ref={(el) => { if (el) fadeTargetsRef.current[1] = el; }}
              >
                <button className="navbar__btn navbar__btn--outline" onClick={closeMenu}>Call Us</button>
                <button className="navbar__btn navbar__btn--filled" onClick={closeMenu}>Chat Us</button>
              </div>
            </div>
          </div>

        </nav>
      </div>
    </>
  );
};

export default Nav;