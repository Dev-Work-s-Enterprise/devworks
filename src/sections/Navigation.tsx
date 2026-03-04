import { useState, useEffect } from 'react';
import { LayoutGrid, Layers, Briefcase, Mail, MessageCircle } from 'lucide-react';

declare global {
  interface Window {
    Tawk_API?: {
      maximize: () => void;
      hideWidget: () => void;
      showWidget: () => void;
    };
  }
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('explore');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Simple active state spy based on scroll
      const scrollY = window.scrollY;
      if (scrollY < 500) setActiveSection('explore');
      else if (scrollY >= 500 && scrollY < 1500) setActiveSection('collaboration');
      else if (scrollY >= 1500 && scrollY < 2500) setActiveSection('stack');
      else if (scrollY >= 2500) setActiveSection('contact');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, sectionAlias: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionAlias);
    }
  };

  const desktopNavLinks = [
    { label: 'Services', id: 'capabilities' },
    { label: 'Process', id: 'collaboration' },
    { label: 'Stack', id: 'stack' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* ── Desktop Navigation (Top Bar) ─────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 hidden md:block ${isScrolled
          ? 'bg-[#0B0C0F]/90 backdrop-blur-sm border-b border-white/5'
          : 'bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 py-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-sm tracking-wider text-[#F4F6FA] hover:text-mint transition-colors"
          >
            DEV WORK'S
          </button>

          <div className="flex items-center gap-8">
            {desktopNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id, link.id)}
                className="text-xs font-mono tracking-widest text-cool-gray hover:text-[#F4F6FA] transition-colors uppercase micro-hover"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact', 'contact')}
              className="px-5 py-2.5 bg-mint text-[#0B0C0F] text-xs font-mono font-medium tracking-wider rounded micro-hover"
            >
              START A PROJECT
            </button>
            <button
              onClick={() => window.Tawk_API?.maximize()}
              className="p-2 icon-hover text-cool-gray"
              aria-label="Live Chat"
            >
              <MessageCircle size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Navigation (Bottom Pill) ──────────────────────── */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100vw-32px)] max-w-[380px]">

        {/* Mobile Header Logo (stays top) */}
        <div className={`fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center transition-all ${isScrolled ? 'bg-[#0B0C0F]/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
          }`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-sm tracking-wider text-[#F4F6FA]"
          >
            DEV WORK'S
          </button>
        </div>

        {/* Bottom Pill Container */}
        <div className="glass-pill h-[64px] rounded-[32px] p-1.5 flex items-center justify-between transition-transform duration-300">

          {/* Active / Primary Tab */}
          <button
            onClick={() => scrollToSection('capabilities', 'explore')}
            className={`h-full w-[38%] rounded-[26px] flex items-center justify-center gap-1.5 transition-all duration-300 micro-hover ${activeSection === 'explore' ? 'bg-mint text-[#0B0C0F]' : 'bg-transparent text-cool-gray'
              }`}
          >
            <LayoutGrid size={18} strokeWidth={2.5} />
            <span className="font-display font-semibold text-[13px]">Explore</span>
          </button>

          {/* Icon Tabs Group */}
          <div className="w-[62%] flex justify-around items-center px-1">

            <button
              onClick={() => scrollToSection('collaboration', 'collaboration')}
              className={`p-2 icon-hover ${activeSection === 'collaboration' ? 'text-mint' : 'text-cool-gray'}`}
              aria-label="Process"
            >
              <Briefcase size={20} strokeWidth={2} />
            </button>

            <button
              onClick={() => scrollToSection('stack', 'stack')}
              className={`p-2 icon-hover ${activeSection === 'stack' ? 'text-mint' : 'text-cool-gray'}`}
              aria-label="Tech Stack"
            >
              <Layers size={20} strokeWidth={2} />
            </button>

            <button
              onClick={() => scrollToSection('contact', 'contact')}
              className={`p-2 icon-hover ${activeSection === 'contact' ? 'text-mint' : 'text-cool-gray'}`}
              aria-label="Contact"
            >
              <Mail size={20} strokeWidth={2} />
            </button>

            <button
              onClick={() => window.Tawk_API?.maximize()}
              className="p-2 icon-hover text-cool-gray"
              aria-label="Live Chat"
            >
              <MessageCircle size={20} strokeWidth={2} />
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
