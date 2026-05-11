import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 px-6 relative" id="contato">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden group"
      >
        {/* Animated Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-neon/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Subtle noise/particles simulation (via CSS) */}
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-brand-white mb-6">
            Pronto para o <span className="text-gradient">próximo nível?</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-gray font-inter max-w-2xl mx-auto mb-10">
            Vamos conversar sobre o seu próximo grande projeto e construir algo que realmente impacta.
          </p>

          <button 
            onClick={() => window.open('https://wa.me/61984427417?text=Olá,%20Carlos!%20Dei%20uma%20olhada%20no%20seu%20portfólio%20e%20queria%20conversar%20sobre%20um%20projeto%20que%20tenho%20em%20mente.', '_blank')}
            className="group/btn relative overflow-hidden rounded-full bg-brand-primary px-6 py-4 md:px-10 md:py-5 text-sm md:text-lg font-sora font-semibold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(157,78,221,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              Solicitar orçamento <ArrowRight size={18} className="md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-light/40 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] -skew-x-12" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
