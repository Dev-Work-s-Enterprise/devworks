import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Services', id: 'capabilities' },
    { label: 'Process', id: 'collaboration' },
    { label: 'Stack', id: 'stack' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Fixed Navigation */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0B0C0F]/90 backdrop-blur-sm border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 py-4">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-sm tracking-wider text-[#F4F6FA] hover:text-mint transition-colors"
          >
            DEV WORK'S
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-mono tracking-widest text-cool-gray hover:text-[#F4F6FA] transition-colors uppercase"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-mint text-[#0B0C0F] text-xs font-mono font-medium tracking-wider rounded hover:translate-y-[-2px] hover:scale-[1.02] transition-transform"
            >
              START A PROJECT
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#F4F6FA] p-2"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#0B0C0F]/98 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-display text-2xl text-[#F4F6FA] hover:text-mint transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-4 px-8 py-3 bg-mint text-[#0B0C0F] font-mono font-medium tracking-wider rounded"
            >
              START A PROJECT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
