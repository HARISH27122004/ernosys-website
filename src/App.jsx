import './index.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Gallery from './components/Gallery';
import AboutUs from './components/Services';
import ProductsSection from './components/ProductsSection';
import Marquee from './components/Marquee';
import FAQ from './components/FAQ';


export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Gallery />
      <About />
      <Features />
      {/* <Services /> */}
      <AboutUs />
      <ProductsSection />
      <Marquee />
      <FAQ />
      <Footer />
    </>
  );
}
