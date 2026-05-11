
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Strategy from './components/Strategy';
import Projects from './components/Projects';
import Services from './components/Services';
import Process from './components/Process';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative w-full min-h-screen selection:bg-brand-neon/30 selection:text-brand-white">
      {/* Navbar fixed no topo */}
      <Navbar />

      <main>
        <Hero />
        <Strategy />
        <Projects />
        <Services />
        <Process />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
