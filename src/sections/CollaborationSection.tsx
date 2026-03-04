import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Rocket, RefreshCw, ArrowRight, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CollaborationSectionProps {
  className?: string;
}

const processSteps = [
  { icon: MessageSquare, title: 'Discovery', description: 'We scope fast and understand your needs' },
  { icon: Rocket, title: 'Prototype', description: 'Early prototypes to validate direction' },
  { icon: RefreshCw, title: 'Iterate', description: 'Tight communication, continuous updates' },
];

const floatingAccents = [
  { Icon: Users, position: 'top-[15%] right-[12%]', delay: 0 },
  { Icon: Zap, position: 'bottom-[20%] right-[8%]', delay: 1 },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const CollaborationSection = ({ className = '' }: CollaborationSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
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
      scrollTl.fromTo(headlineRef.current, { x: '60vw', rotateY: -18, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(subheadRef.current, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08);
      const steps = stepsRef.current?.querySelectorAll('.process-step');
      if (steps) scrollTl.fromTo(steps, { y: 80, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.03, ease: 'none' }, 0.1);
      scrollTl.fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.25);
      accentsRef.current.forEach((accent) => {
        if (!accent) return;
        scrollTl.fromTo(accent, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.15);
      });
      scrollTl.fromTo(headlineRef.current, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
      if (steps) scrollTl.fromTo(steps, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo([subheadRef.current, ctaRef.current], { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="collaboration" className={`section-pinned bg-primary-dark vignette ${className}`}>

      {/* ── MOBILE LAYOUT ── */}
      <div className="section-mobile-content">
        <h2 className="font-display font-bold text-[clamp(36px,10vw,60px)] leading-[0.9] tracking-[-0.02em] text-[#F4F6FA] uppercase">
          COLLABORATION
        </h2>
        <p className="text-sm leading-relaxed text-cool-gray">
          We scope fast, prototype early, and keep communication tight—so you always know what's shipping next.
        </p>
        <div className="flex flex-col gap-4">
          {processSteps.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="process-step flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-mint" strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-cool-gray/60">0{i + 1}</span>
                  <h3 className="font-display font-semibold text-sm text-[#F4F6FA]">{title}</h3>
                </div>
                <p className="text-xs text-cool-gray/70">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollToSection('contact')}
          className="self-start group flex items-center gap-2 px-5 py-3 border border-white/20 text-[#F4F6FA] font-mono text-xs font-medium tracking-wider rounded hover:border-mint hover:text-mint transition-colors btn-hover"
        >
          MEET THE TEAM
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
          className="absolute left-[7vw] top-[18vh] w-[55vw] font-display font-bold text-[clamp(36px,5.5vw,90px)] leading-[0.9] tracking-[-0.02em] text-[#F4F6FA] uppercase"
          style={{ perspective: '1000px' }}
        >
          COLLABORATION
        </h2>
        <p
          ref={subheadRef}
          className="absolute left-[7vw] top-[38vh] w-[36vw] lg:w-[32vw] text-sm lg:text-base leading-relaxed text-cool-gray"
        >
          We scope fast, prototype early, and keep communication tight—so you always know what's shipping next.
        </p>
        <div ref={stepsRef} className="absolute left-[7vw] top-[50vh] right-[7vw] flex gap-4">
          {processSteps.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="process-step flex-1 p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-mint" strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-cool-gray/60">0{i + 1}</span>
                <h3 className="font-display font-semibold text-sm text-[#F4F6FA]">{title}</h3>
              </div>
              <p className="text-xs text-cool-gray/70">{description}</p>
            </div>
          ))}
        </div>
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('contact')}
          className="absolute left-[7vw] top-[78vh] group flex items-center gap-2 px-5 py-3 border border-white/20 text-[#F4F6FA] font-mono text-xs font-medium tracking-wider rounded hover:border-mint hover:text-mint transition-colors btn-hover"
        >
          MEET THE TEAM
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CollaborationSection;
