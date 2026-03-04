import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Layers, Zap, CheckCircle, ArrowRight, Code2, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CustomSoftwareSectionProps {
  className?: string;
}

const features = [
  { icon: Code, text: '100% Custom Code' },
  { icon: Layers, text: 'Clean Architecture' },
  { icon: Zap, text: 'Fast & Scalable' },
  { icon: CheckCircle, text: 'Production-Ready' },
];

const floatingAccents = [
  { Icon: Code2, position: 'top-[20%] right-[15%]', delay: 0 },
  { Icon: Terminal, position: 'bottom-[25%] right-[10%]', delay: 1 },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const CustomSoftwareSection = ({ className = '' }: CustomSoftwareSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
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
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        scrollTl.fromTo(chars, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.005, ease: 'none' }, 0);
      }
      scrollTl.fromTo([bodyRef.current], { x: '-10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);
      const featureItems = featuresRef.current?.querySelectorAll('.feature-item');
      if (featureItems) scrollTl.fromTo(featureItems, { x: -50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.12);
      scrollTl.fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.2);
      accentsRef.current.forEach((accent) => {
        if (!accent) return;
        scrollTl.fromTo(accent, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.15);
      });
      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo([bodyRef.current, featuresRef.current, ctaRef.current], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const headlineText = 'CUSTOM SOFTWARE';
  const chars = headlineText.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>{char}</span>
  ));

  return (
    <section ref={sectionRef} id="custom" className={`section-pinned bg-primary-dark vignette ${className}`}>

      {/* ── MOBILE LAYOUT ── */}
      <div className="section-mobile-content">
        <h2 className="font-display font-bold text-[clamp(36px,10vw,60px)] leading-[0.95] tracking-[-0.02em] text-[#F4F6FA] uppercase">
          CUSTOM<br />SOFTWARE
        </h2>
        <p className="text-base text-cool-gray leading-relaxed">
          No templates. No bloat. Every system is designed around your workflow, then delivered with documentation and testing.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="feature-item flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-mint/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-mint" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-[#F4F6FA]/90">{text}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollToSection('contact')}
          className="self-start group flex items-center gap-2 px-5 py-3 bg-mint text-[#0B0C0F] font-mono text-xs font-medium tracking-wider rounded micro-hover"
        >
          REQUEST A QUOTE
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
        <div className="absolute left-[7vw] top-[18vh] max-w-xl">
          <h2
            ref={headlineRef}
            className="font-display font-bold text-[clamp(40px,5.5vw,96px)] leading-[0.95] tracking-[-0.02em] text-[#F4F6FA] uppercase"
          >
            {chars}
          </h2>
          <div ref={bodyRef} className="mt-8">
            <p className="text-base text-cool-gray leading-relaxed">
              No templates. No bloat. Every system is designed around your workflow, then delivered with documentation and testing.
            </p>
          </div>
          <div ref={featuresRef} className="mt-8 grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="feature-item flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-mint/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-mint" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-[#F4F6FA]/90">{text}</span>
              </div>
            ))}
          </div>
          <button
            ref={ctaRef}
            onClick={() => scrollToSection('contact')}
            className="mt-8 group flex items-center gap-2 px-5 py-3 bg-mint text-[#0B0C0F] font-mono text-xs font-medium tracking-wider rounded micro-hover"
          >
            REQUEST A QUOTE
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomSoftwareSection;
