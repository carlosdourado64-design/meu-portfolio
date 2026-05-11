import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const tools = [
  { src: '/img/figma-01.svg',    name: 'Figma' },
  { src: '/img/Chatgpt-01.svg',  name: 'ChatGPT' },
  { src: '/img/blender.svg',     name: 'Blender' },
  { src: '/img/ID-01.svg',       name: 'InDesign' },
  { src: '/img/Ai-01.svg',       name: 'Illustrator' },
  { src: '/img/pr-01.svg',       name: 'Premiere' },
  { src: '/img/AE-01.svg',       name: 'After Effects' },
  { src: '/img/ps-01.svg',       name: 'Photoshop' },
  { src: '/img/Gemini-01.svg',   name: 'Gemini' },
  { src: '/img/mid-01.svg',      name: 'Midjourney' },
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Reactive cursor glow
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(157,78,221,0.15), transparent 50%)`;
      }
    };
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouse);
    return () => { if (el) el.removeEventListener('mousemove', handleMouse); };
  }, []);

  // Floating tags
  const tags = [
    { label: '✦ Estratégia', top: '22%', left: '7%', delay: 1.0, anim: 'animate-float-slow' },
    { label: '✦ Impacto',    top: '28%', right: '7%', delay: 1.2, anim: 'animate-float' },
    { label: '✦ Clareza',    top: '72%', left: '5%',  delay: 1.4, anim: 'animate-float-fast' },
    { label: '✦ Resultado',  top: '72%', right: '5%', delay: 1.6, anim: 'animate-float-slow' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* ── Imagem de fundo ── */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/fundo-hero.webp')" }}
      />
      {/* Overlay dark para manter legibilidade */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#10002B]/70 via-[#10002B]/40 to-[#10002B]/90" />

      {/* Glow interativo ao mouse */}
      <div ref={glowRef} className="absolute inset-0 -z-10 pointer-events-none transition-all duration-100" />

      {/* Glow estático central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#441574]/30 blur-[120px] -z-10 pointer-events-none" />

      {/* ── Tags flutuantes ── */}
      {tags.map((t) => (
        <motion.div
          key={t.label}
          className={`absolute hidden lg:flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg text-xs font-sora text-[#C77DFF]/90 border-[#C77DFF]/20 pointer-events-none ${t.anim}`}
          style={{ top: t.top, left: t.left, right: (t as any).right }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: t.delay, duration: 0.8 }}
        >
          {t.label}
        </motion.div>
      ))}

      {/* ── Conteúdo central ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex flex-col items-center text-center px-6 max-w-5xl mx-auto relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C77DFF]/15 border border-[#C77DFF]/30 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(199,125,255,0.2)]"
        >
          <Sparkles size={14} className="text-[#9D4EDD]" />
          <span className="text-sm font-sora font-medium text-[#F4F4F4] tracking-wide">Creative Visionary</span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-5xl md:text-7xl font-sora font-bold leading-tight mb-6 text-white"
        >
          Design que{' '}
          <span
            className="relative inline-block"
            style={{ paddingBottom: '8px', marginBottom: '-8px', overflow: 'visible' }}
          >
            {/* Gradiente + itálico */}
            <span
              className="italic font-extrabold"
              style={{
                background: 'linear-gradient(90deg, #9D4EDD, #C77DFF, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 12px rgba(157,78,221,0.7))',
                display: 'inline-block',
                paddingRight: '0.15em',  /* espaço para o "a" itálico não ser cortado */
                overflow: 'visible',
              }}
            >
              transforma
            </span>
            {/* Linha brilhante embaixo */}
            <span className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] shadow-[0_0_8px_#9D4EDD]" />
          </span>
          ,{' '}
          <br className="hidden md:block" />
          Impacta e permanece
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-[#D8CFEA] max-w-2xl mb-12 font-inter font-light leading-relaxed"
        >
          Elevando marcas com soluções visuais modernas, interfaces intuitivas e estéticas memoráveis.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button 
            onClick={() => window.open('https://wa.me/61984427417?text=Olá,%20Carlos!%20Dei%20uma%20olhada%20no%20seu%20portfólio%20e%20queria%20conversar%20sobre%20um%20projeto%20que%20tenho%20em%20mente.', '_blank')}
            className="group relative overflow-hidden rounded-full px-9 py-4 text-base font-sora font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(157,78,221,0.65)]"
            style={{ background: 'linear-gradient(135deg, #441574, #9D4EDD)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Solicitar orçamento <Sparkles size={16} />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </motion.div>
      </motion.div>

      {/* ── Cápsula de ferramentas ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="relative z-10 mt-16 w-full max-w-3xl mx-auto"
      >
        {/* "plataforma" curva abaixo da cápsula */}
        <div
          className="relative mx-6 rounded-2xl border border-[#441574]/60 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(68,21,116,0.5) 0%, rgba(16,0,43,0.7) 100%)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 30px rgba(68,21,116,0.4), inset 0 1px 0 rgba(199,125,255,0.1)',
          }}
        >
          {/* faixa de brilho interna */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C77DFF]/40 to-transparent" />

          {/* scroll infinito */}
          <div className="flex overflow-hidden py-4 px-4">
            <div className="flex items-center gap-8 animate-[toolScroll_25s_linear_infinite] whitespace-nowrap">
              {[...tools, ...tools].map((t, i) => (
                <div
                  key={i}
                  title={t.name}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center transition-all duration-300"
                  style={{ opacity: 0.25, cursor: 'default' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0.25')}
                >
                  <img src={t.src} alt={t.name} className="w-8 h-8 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Desfoque suave na transição inferior ── */}
      {/* Camada 1: blur real no conteúdo do fundo */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '220px',
          zIndex: 6,
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)',
        }}
      />
      {/* Camada 2: fade de cor por cima do blur para fundir com a seção seguinte */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '220px',
          zIndex: 7,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(16,0,43,0.5) 50%, #10002B 100%)',
        }}
      />
    </section>
  );
};

export default Hero;
