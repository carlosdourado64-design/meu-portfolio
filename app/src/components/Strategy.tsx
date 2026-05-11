import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const floatingTags = [
  { text: '✦ Estratégia',    top: '10%',  left: '5%',   delay: 0,    anim: 'float-slow' },
  { text: '✦ Identidade',    top: '20%',  right: '2%',  delay: 0.4,  anim: 'float' },
  { text: '✦ Performance',   top: '55%',  left: '2%',   delay: 0.8,  anim: 'float-fast' },
  { text: '✦ Comunicação',   top: '70%',  right: '5%',  delay: 0.2,  anim: 'float-slow' },
  { text: '✦ Design',        top: '40%',  left: '8%',   delay: 0.6,  anim: 'float' },
];

const Strategy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bubbleLeft = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" id="sobre">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl md:text-5xl font-sora font-bold leading-tight">
              Antes de ser bonito, o design precisa{' '}
              {/* paddingRight + inline-block evita o corte do "o" itálico */}
              <span
                className="text-gradient italic"
                style={{ display: 'inline-block', paddingRight: '0.12em', overflow: 'visible' }}
              >
                fazer sentido
              </span>
            </h2>
            
            <div className="space-y-6 text-brand-gray/90 font-inter leading-relaxed">
              <p>
                Escolher um designer não é só olhar se a arte ficou bonita. É entender se aquela peça comunica bem, respeita a identidade da marca e contribui para a performance do projeto, seja em uma campanha, apresentação, landing page ou material institucional.
              </p>
              <p>
                Ao longo da minha trajetória, trabalhei em projetos como Omnivarejo 2024, Omnivarejo 2026 e Fórum Nacional do Comércio, desenvolvendo materiais para redes sociais, eventos, campanhas institucionais, peças digitais, apresentações e landing pages. Essa experiência me fez entender que design não é só criação visual: é também organização, estratégia, performance e cuidado com cada detalhe.
              </p>
            </div>
          </motion.div>

          {/* Right — Laptop Image + Floating Tags */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            {/* Palavras flutuando por cima do laptop */}
            {floatingTags.map((tag) => (
              <motion.div
                key={tag.text}
                className={`absolute z-20 pointer-events-none animate-${tag.anim}`}
                style={{ top: tag.top, left: (tag as any).left, right: (tag as any).right }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tag.delay, duration: 0.7 }}
              >
                <div
                  style={{
                    background: 'rgba(68,21,116,0.55)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(199,125,255,0.25)',
                    borderRadius: '9999px',
                    padding: '5px 14px',
                    fontSize: '12px',
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 500,
                    color: 'rgba(199,125,255,0.9)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 0 12px rgba(157,78,221,0.2)',
                  }}
                >
                  {tag.text}
                </div>
              </motion.div>
            ))}

            {/* Laptop — sem glow, sem sombra */}
            <motion.img
              src="/img/laptop.webp"
              alt="Laptop com projeto de design"
              className="w-full max-w-lg object-contain relative z-10"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            />
          </motion.div>

        </div>
        
        {/* ── Divisor com bolha reativa ao scroll ── */}
        <div className="mt-24 relative w-full h-8 flex items-center">
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(199,125,255,0.35) 20%, rgba(199,125,255,0.35) 80%, transparent 100%)',
            }}
          />
          <motion.div
            style={{ left: bubbleLeft }}
            className="absolute -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(199,125,255,0.7)',
                boxShadow: '0 0 8px rgba(157,78,221,0.6), inset 0 0 4px rgba(199,125,255,0.2)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Strategy;
