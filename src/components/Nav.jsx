import '../styles/Nav.css';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__logo">CHRONOS</div>
      <ul className="nav__list">
        <li><a href="#story">Heritage</a></li>
        <li><a href="#features">Craft</a></li>
        <li><a href="#specs">Specifications</a></li>
        <li><a href="#">Acquire</a></li>
      </ul>
    </nav>
  );
}
