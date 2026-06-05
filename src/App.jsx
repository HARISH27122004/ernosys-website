import './index.css';
import Nav            from './components/Nav';
import Hero           from './components/Hero';
import Footer         from './components/Footer';
import About          from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Gallery from './components/Gallery';
import AboutUs from './components/AboutUs';
import ProductsSection from './components/ProductsSection';


export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      {/* <AboutUs/> */}
      <Gallery/>
      <About/>
      <Features/>
      <Services/>
      <ProductsSection/>
      <Footer />
    </>
  );
}
