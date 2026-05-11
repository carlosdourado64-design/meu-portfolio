import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import ProjectModal, { type ProjectModalData } from './ProjectModal';

// ── Dados dos projetos ──────────────────────────────────────────────
const projects = [
  {
    id: 'omni26',
    category: 'Identidade & Eventos',
    title: 'Omnivarejo — 58ª Convenção Nacional do Comércio Lojista',
    cardDescription:
      'Um projeto completo de comunicação visual para um grande evento do varejo nacional, envolvendo peças gráficas, landing page, book de patrocínio e apoio na construção da experiência visual do espaço.',
    modalDescription:
      'O Omnivarejo – 58ª Convenção Nacional do Comércio Lojista é um dos principais eventos promovidos pela CNDL, reunindo lideranças, empresários e especialistas do setor para discutir tendências, inovação e estratégias para o varejo nacional. Atualmente, sou responsável por todo o material gráfico impresso e visual estático do evento, incluindo peças para redes sociais, e-mails e grupos institucionais. Também fui o criador do book de patrocínio e responsável pelo desenvolvimento da landing page oficial do evento, além de ter auxiliado na criação do projeto 3D do espaço do evento. O evento será realizado em agosto de 2026.',
    bg: '/img/banner-omni26.webp',
    thumb: '/img/banner-mini-omni26.webp',
    modal: {
      mainImage: '/img/social-omni26.webp',
      scrollImage: '/img/lp-omni26.webp',
    },
  },
  {
    id: 'forum',
    category: 'Identidade & Eventos',
    title: 'VII Fórum Nacional do Comércio',
    cardDescription:
      'Projeto visual desenvolvido para um dos principais encontros estratégicos do comércio, reunindo peças digitais, materiais impressos e animações em Motion Design para fortalecer a presença do evento.',
    modalDescription:
      'O VII Fórum Nacional do Comércio é um evento promovido pela CNDL que reúne lideranças e profissionais do setor para debates estratégicos e troca de experiências. Neste projeto, fui responsável por todo o material gráfico impresso e visual estático do evento, incluindo peças para redes sociais, e-mails, grupos de comunicação e materiais institucionais. Também desenvolvi animações em Motion Design utilizadas durante o evento. Evento realizado em 2025.',
    bg: '/img/banner-forum.webp',
    thumb: '/img/banner-mini-forum.webp',
    modal: {
      mainImage: '/img/social-forum.webp',
      scrollImage: undefined,
    },
  },
];

const DURATION = 9000;

const Projects = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalData, setModalData] = useState<ProjectModalData | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = (_startIndex: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let elapsed = 0;
    const tick = 50;

    progressRef.current = setInterval(() => {
      elapsed += tick;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, tick);

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % projects.length);
      elapsed = 0;
      setProgress(0);
    }, DURATION);
  };

  useEffect(() => {
    startCycle(0);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const handleThumbClick = (idx: number) => {
    setActive(idx);
    startCycle(idx);
  };

  const handleVerDetalhes = () => {
    const p = projects[active];
    setModalData({
      title: p.title,
      category: p.category,
      description: p.modalDescription,
      mainImage: p.modal.mainImage,
      scrollImage: p.modal.scrollImage,
    });
  };

  const current = projects[active];

  return (
    <>
      <ProjectModal data={modalData} onClose={() => setModalData(null)} />

      <section className="relative py-32" id="projetos">
        <div className="max-w-6xl mx-auto px-6">

          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-sora font-bold text-brand-white mb-4">
                Projetos em <span className="text-gradient">Destaque</span>
              </h2>
              <p className="text-brand-gray font-inter max-w-2xl">
                Uma seleção dos trabalhos onde a estética premium encontra a performance e estratégia.
              </p>
            </div>

            {/* Botão Solicitar Orçamento */}
            <a
              href="https://wa.me/61984427417?text=Olá,%20Carlos!%20Dei%20uma%20olhada%20no%20seu%20portfólio%20e%20queria%20conversar%20sobre%20um%20projeto%20que%20tenho%20em%20mente."
              target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl font-sora font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:scale-105 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #441574, #9D4EDD)',
                border: '1px solid rgba(199,125,255,0.3)',
                boxShadow: '0 0 20px rgba(157,78,221,0.25)',
                color: '#fff',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(157,78,221,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(157,78,221,0.25)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Solicitar Orçamento
            </a>
          </motion.div>

          {/* ── Card principal ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative w-full rounded-3xl overflow-hidden min-h-[400px] border border-brand-light/20 hover:border-brand-neon/40 hover:shadow-[0_0_40px_rgba(157,78,221,0.35)] transition-all duration-500"
          >
            {/* Imagem de fundo com cross-fade */}
            <AnimatePresence mode="sync">
              <motion.img
                key={current.bg}
                src={current.bg}
                alt={current.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
            </AnimatePresence>

            {/* Gradiente Mobile (mais escuro e ocupa mais espaço para leitura) */}
            <div
              className="absolute inset-0 pointer-events-none md:hidden z-10"
              style={{
                background:
                  'linear-gradient(to right, transparent 0%, rgba(10,0,30,0.85) 15%, rgba(10,0,30,0.98) 40%, #0a001e 100%)',
              }}
            />
            {/* Gradiente Desktop */}
            <div
              className="absolute inset-0 pointer-events-none hidden md:block z-10"
              style={{
                background:
                  'linear-gradient(to right, transparent 30%, rgba(10,0,30,0.75) 52%, rgba(10,0,30,0.98) 68%, #0a001e 100%)',
              }}
            />
            {/* Gradiente inferior (para dar contraste aos thumbnails) */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to top, rgba(10,0,30,0.7) 0%, transparent 40%)',
              }}
            />

            {/* ── Thumbnails — canto inferior esquerdo ── */}
            <div className="absolute left-4 md:left-6 bottom-4 md:bottom-6 flex flex-row gap-2 md:gap-3 z-20">
              {projects.map((p, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleThumbClick(idx)}
                    className="relative rounded-xl overflow-hidden transition-all duration-500 focus:outline-none"
                    style={{
                      width: typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 110,
                      height: typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 70,
                      filter: isActive ? 'none' : 'blur(2px) brightness(0.45)',
                      border: isActive
                        ? '2px solid rgba(199,125,255,0.8)'
                        : '2px solid rgba(199,125,255,0.15)',
                      transform: isActive ? 'scale(1.06)' : 'scale(1)',
                      boxShadow: isActive ? '0 0 16px rgba(157,78,221,0.55)' : 'none',
                    }}
                  >
                    <img
                      src={p.thumb}
                      alt={p.title}
                      className="w-full h-full object-cover object-center"
                    />
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF]"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.05, ease: 'linear' }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Conteúdo à direita ── */}
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="w-full max-w-xs md:max-w-md px-6 md:px-12 py-8 md:py-10 flex flex-col justify-center pointer-events-auto"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-light/10 border border-brand-light/20 text-brand-light text-[10px] md:text-xs font-sora font-medium w-max mb-3 md:mb-4">
                    {current.category}
                  </div>
                  <h3 className="text-xl md:text-3xl font-sora font-bold mb-2 md:mb-4 text-white leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-brand-gray/85 font-inter text-xs md:text-base mb-4 md:mb-6 leading-relaxed line-clamp-4 md:line-clamp-none">
                    {current.cardDescription}
                  </p>
                  <button
                    onClick={handleVerDetalhes}
                    className="flex items-center gap-2 text-brand-neon font-sora font-medium text-xs md:text-sm group/btn hover:text-brand-light transition-colors w-max"
                  >
                    Ver detalhes{' '}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Borda glow no hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-neon/30 rounded-3xl transition-colors duration-500 pointer-events-none" />
          </motion.div>

          {/* ── Card Social Media — Carrossel infinito ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative glass-card rounded-3xl overflow-hidden mt-8 border border-brand-light/10 hover:border-brand-neon/30 hover:shadow-[0_10px_40px_rgba(157,78,221,0.2)] transition-all duration-500"
          >
            {/* Cabeçalho do card */}
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-center md:items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-primary/20 flex items-center justify-center flex-shrink-0 border border-brand-light/20 group-hover:bg-brand-primary/40 transition-colors">
                <Smartphone className="text-brand-light w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg md:text-xl font-sora font-semibold md:mb-1 group-hover:text-brand-light transition-colors">
                  Social media
                </h4>
                <p className="hidden md:block text-brand-gray/80 font-inter text-sm leading-relaxed max-w-2xl">
                  Algumas das peças criadas ao longo de 2025 e 2026, com foco em fortalecer a presença digital, manter consistência visual e comunicar campanhas, eventos e conteúdos institucionais com mais impacto.
                </p>
              </div>

              {/* Ícones de redes sociais */}
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 mt-0 md:mt-1">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/carlos-willyam-dourado-480911210/"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_14px_rgba(10,102,194,0.6)]"
                  style={{ background: 'rgba(10,102,194,0.12)', border: '1px solid rgba(10,102,194,0.3)' }}
                >
                  <svg className="w-4 h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="#0A66C2"/>
                    <rect x="2" y="9" width="4" height="12" fill="#0A66C2"/>
                    <circle cx="4" cy="4" r="2" fill="#0A66C2"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/carlos_wdourado/"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_14px_rgba(225,48,108,0.5)]"
                  style={{ background: 'rgba(225,48,108,0.10)', border: '1px solid rgba(225,48,108,0.28)' }}
                >
                  <svg className="w-4 h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig)" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C"/>
                    <defs>
                      <linearGradient id="ig" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F58529"/>
                        <stop offset="0.5" stopColor="#E1306C"/>
                        <stop offset="1" stopColor="#833AB4"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </a>

                {/* Behance */}
                <a
                  href="https://www.behance.net/carlosdourado1"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Behance"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_14px_rgba(23,104,207,0.55)]"
                  style={{ background: 'rgba(23,104,207,0.12)', border: '1px solid rgba(23,104,207,0.3)' }}
                >
                  <svg className="w-4 h-4 md:w-[20px] md:h-[14px]" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h16c4.4 0 8 3.1 8 7s-3.6 7-8 7H0V0zm0 14h17c5 0 9 3.1 9 7s-4 7-9 7H0V14zm4 3v7h12.5c2.5 0 4.5-1.6 4.5-3.5S19 17 16.5 17H4zM4 3v8h11.5c2.5 0 4.5-1.8 4.5-4S18 3 15.5 3H4z" fill="#1768CF"/>
                    <path d="M24 8h14M26 12c0-4.4 3.1-8 8-8s8 3.6 8 8v1H29c.5 2 2.2 3 4 3 1.5 0 2.8-.6 3.6-1.5L39 15c-1.3 1.3-3.1 2-5 2-4.4 0-8-3.6-8-7zm5.5-2h9c-.5-2-2.2-3-4.5-3s-4 1-4.5 3z" fill="#1768CF"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Carrossel infinito — 1 faixa, loop contínuo sem flickering */}
            <div className="relative overflow-hidden pb-8 pt-2">
              {/* Fade esquerda */}
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #12002e, transparent)' }} />
              {/* Fade direita */}
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #12002e, transparent)' }} />

              {/* Faixa única: 2 cópias idênticas → anima -50% = loop perfeito */}
              <div
                className="flex gap-4"
                style={{ animation: 'smScroll1 28s linear infinite', width: 'max-content' }}
              >
                {[...Array(2)].flatMap((_, copyIdx) =>
                  [1,2,3,4,5,6,7,8].map((n) => (
                    <div
                      key={`sm-${copyIdx}-${n}`}
                      className="flex-shrink-0 rounded-xl overflow-hidden"
                      style={{ width: 150, height: 150, border: '1px solid rgba(199,125,255,0.12)' }}
                    >
                      <img
                        src={`/img/social/sm-${n}.webp`}
                        alt={`Social ${n}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Projects;
