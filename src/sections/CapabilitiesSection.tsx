import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Smartphone,
  Globe,
  Pickaxe,
  Database,
  Brain,
  Shield,
  Terminal,
  Server,
  Cloud,
  Gamepad2,
  ArrowRight,
  Code2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesSectionProps {
  className?: string;
}

const services = [
  { icon: Bot, title: 'Telegram Bots', description: 'AI-powered, database-integrated' },
  { icon: Smartphone, title: 'Mini Apps', description: 'Web apps with Bot API' },
  { icon: Globe, title: 'Full-Stack', description: 'Frontend + Backend + APIs' },
  { icon: Pickaxe, title: 'Crypto Tools', description: 'Miners, trackers, Web3' },
  { icon: Database, title: 'Data Scrapers', description: 'Python, Node.js, Selenium' },
  { icon: Brain, title: 'AI/ML Tools', description: 'NLP, computer vision, GPT' },
  { icon: Shield, title: 'Secure APIs', description: 'REST, GraphQL, OAuth, JWT' },
  { icon: Terminal, title: 'DevOps', description: 'CI/CD, Docker, automation' },
  { icon: Server, title: 'Databases', description: 'SQL, NoSQL, Firebase' },
  { icon: Cloud, title: 'Cloud Setup', description: 'Linux, VPS, Nginx' },
  { icon: Gamepad2, title: 'Game Bots', description: 'Ethical hacking sims' },
];

const floatingAccents = [
  { Icon: Code2, position: 'top-[15%] right-[10%]', delay: 0 },
  { Icon: Terminal, position: 'bottom-[20%] right-[5%]', delay: 1 },
  { Icon: Database, position: 'top-[60%] right-[15%]', delay: 0.5 },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const CapabilitiesSection = ({ className = '' }: CapabilitiesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const accentsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (isMobile()) return;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: '+=80%', pin: true, scrub: 0.6 }
      });
      scrollTl.fromTo(headlineRef.current, { x: '-60vw', rotateY: 18, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(bodyRef.current, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      const cards = gridRef.current?.querySelectorAll('.service-card-dark');
      if (cards) scrollTl.fromTo(cards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.01, ease: 'none' }, 0.1);
      scrollTl.fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.25);
      accentsRef.current.forEach((accent) => {
        if (!accent) return;
        scrollTl.fromTo(accent, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.15);
      });
      scrollTl.fromTo(headlineRef.current, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
      if (cards) scrollTl.fromTo(cards, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, stagger: 0.005, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo([bodyRef.current, ctaRef.current], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="capabilities" className={`section-pinned bg-primary-dark vignette ${className}`}>

      {/* ── MOBILE LAYOUT ── */}
      <div className="section-mobile-content">
        <h2 className="font-display font-bold text-[clamp(48px,13vw,72px)] leading-[0.9] tracking-[-0.02em] text-[#F4F6FA] uppercase">
          WE BUILD
        </h2>
        <p className="text-sm leading-relaxed text-cool-gray">
          Advanced Telegram bots, mini apps, full-stack platforms, crypto tools, scrapers, and AI integrations—built to run reliably at scale.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="service-card-dark group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-2 group-hover:bg-mint/10 transition-colors">
                <Icon className="w-4 h-4 text-mint/70" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-medium text-xs text-[#F4F6FA] mb-0.5">{title}</h3>
              <p className="text-[10px] text-cool-gray/70 leading-tight">{description}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollToSection('collaboration')}
          className="self-start group flex items-center gap-2 px-5 py-3 border border-white/20 text-[#F4F6FA] font-mono text-xs font-medium tracking-wider rounded hover:border-mint hover:text-mint transition-colors btn-hover"
        >
          SEE OUR PROCESS
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="section-desktop-content">
        <div className="hidden lg:block">
          {floatingAccents.map(({ Icon, position, delay }, i) => (
            <div key={i} ref={(el) => { accentsRef.current[i] = el; }}
              className={`absolute ${position} w-10 h-10 icon-orb opacity-20 animate-float`}
              style={{ animationDelay: `${delay}s` }}
            >
              <Icon className="w-5 h-5 text-mint/50" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <h2
          ref={headlineRef}
          className="absolute left-[7vw] top-[15vh] w-[55vw] font-display font-bold text-[clamp(48px,7vw,120px)] leading-[0.9] tracking-[-0.02em] text-[#F4F6FA] uppercase"
          style={{ perspective: '1000px' }}
        >
          WE BUILD
        </h2>
        <p
          ref={bodyRef}
          className="absolute left-[7vw] top-[38vh] w-[36vw] lg:w-[32vw] text-sm lg:text-base leading-relaxed text-cool-gray"
        >
          Advanced Telegram bots, mini apps, full-stack platforms, crypto tools, scrapers, and AI integrations—built to run reliably at scale.
        </p>
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('collaboration')}
          className="absolute left-[7vw] top-[50vh] group flex items-center gap-2 px-5 py-3 border border-white/20 text-[#F4F6FA] font-mono text-xs font-medium tracking-wider rounded hover:border-mint hover:text-mint transition-colors btn-hover"
        >
          SEE OUR PROCESS
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <div
          ref={gridRef}
          className="absolute left-[7vw] bottom-[8vh] right-[7vw] grid grid-cols-6 gap-3"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="service-card-dark group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-2 group-hover:bg-mint/10 transition-colors">
                <Icon className="w-4 h-4 text-mint/70" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-medium text-xs text-[#F4F6FA] mb-0.5">{title}</h3>
              <p className="text-[10px] text-cool-gray/70 leading-tight">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
