

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-light/10 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <img src="/img/logo.svg" alt="Logo Carlos Dourado" className="w-6 h-6 object-contain" />
          <span className="font-sora font-medium text-brand-white tracking-wide">
            Carlos Dourado
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm font-inter text-brand-gray">
          <a href="https://www.behance.net/carlosdourado1" target="_blank" rel="noopener noreferrer" className="hover:text-brand-light transition-colors relative group">
            Behance
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-light transition-all group-hover:w-full" />
          </a>
          <a href="https://www.linkedin.com/in/carlos-willyam-dourado-480911210/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-light transition-colors relative group">
            LinkedIn
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-light transition-all group-hover:w-full" />
          </a>
          <a href="https://www.instagram.com/carlos_wdourado/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-light transition-colors relative group">
            Instagram
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-light transition-all group-hover:w-full" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
