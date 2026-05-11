import { motion } from 'framer-motion';

const Process = () => {
  const steps = [
    {
      title: "Entendimento do projeto",
      desc: "Primeiro, busco entender o objetivo, o público, a mensagem e o tipo de material que precisa ser criado.",
      num: "01"
    },
    {
      title: "Criação das peças",
      desc: "Com a direção definida, começo a desenvolver os materiais com foco em clareza, estética e estratégia.",
      num: "02"
    },
    {
      title: "Ajustes e refinamento",
      desc: "Após a primeira versão, faço os ajustes necessários para melhorar a composição, a comunicação e os detalhes visuais.",
      num: "03"
    },
    {
      title: "Entrega final",
      desc: "Por fim, entrego os arquivos finalizados nos formatos combinados, prontos para uso digital, impressão ou publicação.",
      num: "04"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="processo">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-brand-white mb-6">
            Processo de <span className="text-gradient">criação</span>
          </h2>
          <p className="text-brand-gray font-inter max-w-3xl mx-auto text-lg leading-relaxed">
            Cada projeto passa por um processo simples e bem direcionado: entender o objetivo, organizar as ideias, definir o caminho visual e transformar tudo em uma entrega clara, estratégica e bem construída.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[32px] left-0 w-full h-1 bg-brand-light/10 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-brand-neon via-brand-light to-transparent w-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Number Badge */}
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-2xl font-sora font-bold text-brand-light mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(199,125,255,0.4)] transition-all duration-300 relative bg-brand-deep">
                  {/* Outer glowing border effect */}
                  <div className="absolute inset-0 border-2 border-brand-primary/50 rounded-2xl group-hover:border-brand-neon transition-colors" />
                  {step.num}
                </div>
                
                <h3 className="text-xl font-sora font-semibold text-brand-white mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-gray/80 font-inter text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
