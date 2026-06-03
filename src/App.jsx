import './index.css';
import Nav            from './components/Nav';
import Hero           from './components/Hero';
import Story          from './components/Story';
import Features       from './components/Features';
import ParallaxQuote  from './components/ParallaxQuote';
import Specs          from './components/Specs';
import Footer         from './components/Footer';
import ProgressDots   from './components/ProgressDots';

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Story />
      <Features />
      <ParallaxQuote />
      <Specs />
      <Footer />
      <ProgressDots />
    </>
  );
}
