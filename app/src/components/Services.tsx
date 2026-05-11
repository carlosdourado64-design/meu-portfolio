import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Printer, Palette, Monitor, Megaphone, CheckCircle } from 'lucide-react';

// ── Palavras da rede ──────────────────────────────────────────────────────────
const WORDS = [
  'Designer', 'Web Designer', 'Editor de Vídeo', 'Motion Design', 'Branding',
  'Social Media', 'Identidade Visual', 'Landing Page', 'Criativo', 'Tipografia',
  'Campanha', 'Comunicação', 'Visual', 'Digital', 'Estratégia', 'Logotipo',
  'UI Design', 'Conteúdo', 'Estética', 'Vídeo', 'Edição', 'Reels', 'Stories',
  'Carrossel', 'Feed', 'Copywriting', 'Criação', 'Artes Gráficas', 'Illustrator',
  'Photoshop', 'Premiere', 'After Effects', 'Figma', 'Cor', 'Layout',
  'Composição', 'Narrativa', 'Impacto', 'Presença', 'Marca', 'Conceito',
];

const LINE_DIST = 250;

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  label: string;
  size: number;
}

// ── Canvas: teia flutuante (sem interação com mouse) ──────────────────────────
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes     = useRef<Node[]>([]);
  const raf       = useRef<number>(0);

  const initNodes = useCallback((w: number, h: number) => {
    nodes.current = WORDS.map((label) => ({
      x:    Math.random() * w,
      y:    Math.random() * h,
      vx:   (Math.random() - 0.5) * 0.28,
      vy:   (Math.random() - 0.5) * 0.28,
      label,
      size: 9 + Math.random() * 3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      initNodes(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      const ns = nodes.current;

      // Mover nós
      ns.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // Linhas entre nós próximos
      ctx.shadowBlur = 0;
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx   = ns[i].x - ns[j].x;
          const dy   = ns[i].y - ns[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= LINE_DIST) continue;

          const alpha = (1 - dist / LINE_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(ns[i].x, ns[i].y);
          ctx.lineTo(ns[j].x, ns[j].y);
          ctx.strokeStyle = `rgba(157,78,221,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }

      // Palavras e pontos
      ns.forEach((n) => {
        // Ponto central
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(157,78,221,0.35)';
        ctx.fill();

        // Texto
        ctx.font         = `300 ${n.size}px "Sora", sans-serif`;
        ctx.fillStyle    = 'rgba(199,125,255,0.2)';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf.current);
    };
  }, [initNodes]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ── Dados dos serviços ────────────────────────────────────────────────────────
const servicesList = [
  { title: 'Social Media',                desc: 'Peças para redes sociais com visual estratégico, consistência e clareza para fortalecer a presença da marca.',                                   icon: <Smartphone  size={24} /> },
  { title: 'Arquivos impressos',           desc: 'Materiais gráficos prontos para impressão, pensados para comunicar com profissionalismo também fora do digital.',                               icon: <Printer     size={24} /> },
  { title: 'Criação de identidade visual', desc: 'Construção de uma base visual para a marca ser reconhecida, lembrada e aplicada com mais consistência.',                                        icon: <Palette     size={24} /> },
  { title: 'Landing pages',                desc: 'Páginas visuais e organizadas para apresentar projetos, serviços, campanhas ou eventos com mais impacto.',                                     icon: <Monitor     size={24} /> },
  { title: 'Criação de campanhas',         desc: 'Desenvolvimento de peças e conceitos visuais para campanhas que precisam chamar atenção e comunicar uma mensagem com força.',                  icon: <Megaphone   size={24} /> },
  { title: 'Avaliação de criativos',       desc: 'Análise gratuita dos seus materiais visuais para identificar pontos de melhoria em clareza, impacto, estética e comunicação.',                icon: <CheckCircle size={24} /> },
];

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ── Componente principal ──────────────────────────────────────────────────────
const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotRef    = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current || !spotRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.background = `
      radial-gradient(500px circle at ${x}px ${y}px,
        rgba(157,78,221,0.18) 0%,
        rgba(100,30,180,0.08) 40%,
        transparent 70%)
    `;
    spotRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <section className="relative py-32 overflow-hidden" id="servicos">

        {/* Fundo escuro */}
        <div className="absolute inset-0 -z-20"
          style={{ background: 'linear-gradient(180deg, #0d0025 0%, #130030 50%, #0d0025 100%)' }} />

        {/* Canvas de teia */}
        <div className="absolute inset-0 -z-10">
          <NetworkCanvas />
        </div>

        {/* Spotlight de brilho reativo ao mouse */}
        <div
          ref={spotRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0, zIndex: 0 }}
        />

        {/* Separadores */}
        <div className="absolute top-0    left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-light/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-light/10 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-sora font-bold text-brand-white mb-6">Serviços</h2>
            <p className="text-brand-gray font-inter max-w-2xl mx-auto text-lg leading-relaxed">
              Se a sua marca precisa comunicar melhor, parecer mais profissional ou ganhar mais presença, esses são alguns caminhos em que posso ajudar.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-2xl border border-brand-light/10 hover:border-brand-light/30 hover:shadow-[0_0_25px_rgba(157,78,221,0.25)] transition-all duration-300 relative overflow-hidden group"
                style={{ background: 'rgba(16,0,43,0.72)', backdropFilter: 'blur(14px)' }}
              >
                <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/40 to-transparent border border-brand-light/20 flex items-center justify-center text-brand-neon mb-6 group-hover:text-brand-light group-hover:rotate-6 transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-sora font-semibold text-brand-white mb-3">{service.title}</h3>
                  <p className="text-brand-gray/80 font-inter text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Services;
