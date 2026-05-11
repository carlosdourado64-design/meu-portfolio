import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ProjectModalData {
  title: string;
  category: string;
  description: string;
  mainImage: string;
  scrollImage?: string;
}

interface Props {
  data: ProjectModalData | null;
  onClose: () => void;
}

const ProjectModal = ({ data, onClose }: Props) => {
  const [panelIndex, setPanelIndex] = useState(0);

  // Reseta painel ao abrir novo projeto
  useEffect(() => { setPanelIndex(0); }, [data]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, data]);

  useEffect(() => {
    document.body.style.overflow = data ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [data]);

  if (!data) return null;

  const panels = [
    { key: 'main', src: data.mainImage, label: 'Social Media', scrollable: false },
    ...(data.scrollImage
      ? [{ key: 'lp', src: data.scrollImage, label: 'Landing Page', scrollable: true }]
      : []),
  ];

  const total = panels.length;
  const current = panels[panelIndex];

  const prev = () => setPanelIndex((i) => (i - 1 + total) % total);
  const next = () => setPanelIndex((i) => (i + 1) % total);

  return (
    <AnimatePresence>
      {data && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={onClose}
          >
            <div
              className="relative w-full max-w-5xl rounded-3xl overflow-y-auto overflow-x-hidden flex flex-col md:flex-row"
              style={{
                background: 'linear-gradient(135deg, #180035 0%, #0a001e 100%)',
                border: '1px solid rgba(199,125,255,0.22)',
                boxShadow: '0 0 70px rgba(157,78,221,0.28)',
                maxHeight: '88vh',
              }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── Coluna esquerda: Texto ── */}
              <div className="flex flex-col justify-between p-8 md:p-10 md:w-[42%] flex-shrink-0">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-sora font-medium mb-5"
                    style={{
                      background: 'rgba(157,78,221,0.15)',
                      border: '1px solid rgba(199,125,255,0.25)',
                      color: 'rgba(199,125,255,0.9)',
                    }}
                  >
                    {data.category}
                  </span>

                  <h2 className="text-2xl md:text-3xl font-sora font-bold text-white leading-snug mb-4">
                    {data.title}
                  </h2>

                  <div
                    className="w-16 h-px mb-5"
                    style={{ background: 'linear-gradient(to right, #9D4EDD, transparent)' }}
                  />

                  <p className="text-sm text-brand-gray/80 font-inter leading-relaxed">
                    {data.description}
                  </p>
                </div>

                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(199,125,255,0.1)' }}>
                  <p className="text-xs text-brand-gray/50 font-inter">
                    Material gráfico · Identidade Visual · Eventos
                  </p>
                </div>
              </div>

              {/* ── Coluna direita: Painel com setas ── */}
              <div className="flex-1 relative p-4 flex flex-col min-h-[300px] md:min-h-0">

                {/* Área da imagem */}
                <div
                  className="flex-1 rounded-2xl overflow-hidden relative"
                  style={{
                    border: '1px solid rgba(199,125,255,0.12)',
                    background: '#080014',
                    minHeight: 0,
                  }}
                >
                  {/* Label do painel atual e Dots */}
                  {total > 1 && (
                    <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                      <span className="text-xs font-sora text-brand-light/80 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                        {current.label}
                      </span>
                      {/* Dots */}
                      <div className="flex gap-2 bg-black/40 px-3 py-2 rounded-full backdrop-blur-md border border-white/5 pointer-events-auto">
                        {panels.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setPanelIndex(i)}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                              background: i === panelIndex
                                ? 'rgba(199,125,255,0.9)'
                                : 'rgba(199,125,255,0.25)',
                              transform: i === panelIndex ? 'scale(1.3)' : 'scale(1)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.key}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {current.scrollable ? (
                        // Painel scrollável verticalmente
                        <div
                          className="w-full h-full overflow-y-auto"
                          style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#441574 transparent',
                          }}
                        >
                          <img
                            src={current.src}
                            alt={current.label}
                            className="w-full block"
                            style={{ display: 'block' }}
                          />
                        </div>
                      ) : (
                        // Imagem completa sem corte
                        <img
                          src={current.src}
                          alt={current.label}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Setas de navegação — só aparecem se tiver mais de 1 painel */}
                  {total > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{
                          background: 'rgba(16,0,43,0.8)',
                          border: '1px solid rgba(199,125,255,0.3)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <ChevronLeft size={18} className="text-brand-light" />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{
                          background: 'rgba(16,0,43,0.8)',
                          border: '1px solid rgba(199,125,255,0.3)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <ChevronRight size={18} className="text-brand-light" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Botão fechar */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 z-20"
                style={{ border: '1px solid rgba(199,125,255,0.2)' }}
              >
                <X size={14} className="text-brand-gray" />
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
