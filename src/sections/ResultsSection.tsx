import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, Clock, ArrowRight, Award, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ResultsSectionProps {
  className?: string;
}

const stats = [
  { icon: TrendingUp, value: '99.9%', label: 'Uptime' },
  { icon: Users, value: '50+', label: 'Projects' },
  { icon: Clock, value: '24h', label: 'Response' },
];

const floatingAccents = [
  { Icon: Award, position: 'top-[18%] right-[12%]', delay: 0 },
  { Icon: Target, position: 'bottom-[25%] right-[8%]', delay: 1 },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const ResultsSection = ({ className = '' }: ResultsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
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
      scrollTl.fromTo(headlineRef.current, { y: '-40vh', rotateX: 35, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(bodyRef.current, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08);
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) scrollTl.fromTo(statItems, { y: 60, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, stagger: 0.03, ease: 'none' }, 0.12);
      scrollTl.fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.22);
      accentsRef.current.forEach((accent) => {
        if (!accent) return;
        scrollTl.fromTo(accent, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.15);
      });
      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      const statItems2 = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems2) scrollTl.fromTo(statItems2, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo([bodyRef.current, ctaRef.current], { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="results" className={`section-pinned bg-primary-dark vignette ${className}`}>

      {/* ── MOBILE LAYOUT ── */}
      <div className="section-mobile-content">
        <h2 className="font-display font-bold text-[clamp(52px,14vw,80px)] leading-[0.9] tracking-[-0.03em] text-[#F4F6FA] uppercase">
          RESULTS
        </h2>
        <p className="text-sm leading-relaxed text-cool-gray">
          Systems that stay online. Interfaces that stay intuitive. We measure success by how little you have to think about the tech.
        </p>
        <div className="flex gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="stat-item flex-1 flex flex-col items-center p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center mb-2">
                <Icon className="w-5 h-5 text-mint" strokeWidth={1.5} />
              </div>
              <span className="font-display font-bold text-xl text-[#F4F6FA]">{value}</span>
              <span className="text-[10px] font-mono text-cool-gray/60 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollToSection('stack')}
          className="self-start group flex items-center gap-2 px-5 py-3 border border-white/20 text-[#F4F6FA] font-mono text-xs font-medium tracking-wider rounded hover:border-mint hover:text-mint transition-colors btn-hover"
        >
          EXPLORE OUR STACK
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
          className="absolute left-[7vw] top-[18vh] w-[55vw] font-display font-bold text-[clamp(56px,8vw,120px)] leading-[0.9] tracking-[-0.03em] text-[#F4F6FA] uppercase"
          style={{ perspective: '1000px' }}
        >
          RESULTS
        </h2>
        <p
          ref={bodyRef}
          className="absolute left-[7vw] top-[42vh] w-[36vw] lg:w-[32vw] text-sm lg:text-base leading-relaxed text-cool-gray"
        >
          Systems that stay online. Interfaces that stay intuitive. We measure success by how little you have to think about the tech.
        </p>
        <div ref={statsRef} className="absolute left-[7vw] top-[58vh] flex gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="stat-item flex flex-col items-center p-5 rounded-xl bg-white/[0.03] border border-white/5 min-w-[100px]">
              <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center mb-2">
                <Icon className="w-5 h-5 text-mint" strokeWidth={1.5} />
              </div>
              <span className="font-display font-bold text-xl text-[#F4F6FA]">{value}</span>
              <span className="text-[10px] font-mono text-cool-gray/60 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('stack')}
          className="absolute left-[7vw] top-[78vh] group flex items-center gap-2 px-5 py-3 border border-white/20 text-[#F4F6FA] font-mono text-xs font-medium tracking-wider rounded hover:border-mint hover:text-mint transition-colors btn-hover"
        >
          EXPLORE OUR STACK
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default ResultsSection;
