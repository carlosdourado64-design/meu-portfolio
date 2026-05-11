import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* Wrapper fixo que ocupa toda a largura da tela */
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 24px 0',
        pointerEvents: 'none', // o wrapper não bloqueia cliques
      }}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          pointerEvents: 'all', // a nav sim
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          padding: '10px 20px',
          borderRadius: '9999px',
          border: `1px solid rgba(199,125,255,${scrolled ? 0.25 : 0.15})`,
          background: scrolled ? 'rgba(16,0,43,0.88)' : 'rgba(16,0,43,0.65)',
          backdropFilter: 'blur(16px)',
          boxShadow: scrolled
            ? '0 0 30px rgba(157,78,221,0.25)'
            : '0 0 20px rgba(68,21,116,0.3)',
          width: 'min(700px, 90vw)',
          transition: 'background 0.4s, border 0.4s, box-shadow 0.4s',
        }}
      >
        {/* Logo */}
        <div className="hidden md:block flex-shrink-0 cursor-pointer">
          <img 
            src="/img/logo.svg" 
            alt="Logo" 
            style={{
              width: 24, 
              height: 24,
              filter: 'drop-shadow(0 0 12px rgba(157,78,221,0.6))'
            }} 
          />
        </div>

        {/* Links */}
        <ul className="flex items-center gap-4 md:gap-7 list-none m-0 p-0 flex-1 justify-center">
          {[
            { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
            { label: 'Projetos', action: () => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Serviços', action: () => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' }) }
          ].map((item) => (
            <li
              key={item.label}
              onClick={item.action}
              className="relative cursor-pointer text-xs md:text-sm font-medium text-[#D8CFEA] font-sora whitespace-nowrap transition-colors duration-200 hover:text-[#C77DFF]"
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Botão contato */}
        <button
          onClick={() => window.open('https://wa.me/61984427417?text=Olá,%20Carlos!%20Dei%20uma%20olhada%20no%20seu%20portfólio%20e%20queria%20conversar%20sobre%20um%20projeto%20que%20tenho%20em%20mente.', '_blank')}
          className="flex-shrink-0 rounded-full border border-[rgba(199,125,255,0.4)] px-3 py-1.5 md:px-5 md:py-1.5 text-xs md:text-sm font-semibold text-white bg-transparent cursor-pointer font-sora whitespace-nowrap transition-all duration-300 hover:border-[rgba(199,125,255,0.8)] hover:shadow-[0_0_20px_rgba(157,78,221,0.5)] hover:scale-105"
        >
          contato
        </button>
      </motion.nav>
    </div>
  );
};

export default Navbar;
