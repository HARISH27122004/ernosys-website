import { useState, useEffect } from 'react';
import '../styles/Nav.css';
import logo from '../images/ernosys.png'

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${visible ? 'navbar--visible' : 'navbar--hidden'} ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__logo">
        <img
          src={logo}
          alt="Ernosys Infotech Logo"
          className="navbar__logo-img"
        />
      </div>

      <ul className="navbar__links">
        {['Home', 'About', 'Service', 'Products', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="navbar__link">
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <button className="navbar__btn navbar__btn--outline">Call Us</button>
        <button className="navbar__btn navbar__btn--filled">Chat Us</button>
      </div>
    </nav>
  );
};

export default Navbar;