import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ReadySectionProps {
  className?: string;
}

const floatingAccents = [
  { Icon: Sparkles, position: 'top-[20%] right-[15%]', delay: 0 },
  { Icon: Send, position: 'bottom-[25%] right-[10%]', delay: 1 },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const ReadySection = ({ className = '' }: ReadySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
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
      scrollTl.fromTo(bodyRef.current, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(ctaRef.current, { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, ease: 'none' }, 0.18);
      accentsRef.current.forEach((accent) => {
        if (!accent) return;
        scrollTl.fromTo(accent, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.15);
      });
      scrollTl.fromTo(headlineRef.current, { y: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo([bodyRef.current, ctaRef.current], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="ready" className={`section-pinned bg-primary-dark vignette ${className}`}>

      {/* ── MOBILE LAYOUT ── */}
      <div className="section-mobile-content">
        <h2 className="font-display font-bold text-[clamp(40px,12vw,64px)] leading-[1] tracking-[-0.02em] text-[#F4F6FA] uppercase">
          READY WHEN<br />YOU ARE
        </h2>
        <p className="text-base text-cool-gray leading-relaxed">
          Tell us what you're building. We'll reply with a clear plan, timeline, and estimate—no sales theater.
        </p>
        <button
          onClick={() => scrollToSection('contact')}
          className="self-start group flex items-center gap-3 px-6 py-4 bg-mint text-[#0B0C0F] font-mono text-sm font-medium tracking-wider rounded btn-hover"
        >
          START A PROJECT
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
        <div className="absolute left-[7vw] top-[20vh] max-w-xl">
          <h2
            ref={headlineRef}
            className="font-display font-bold text-[clamp(36px,5vw,72px)] leading-[1] tracking-[-0.02em] text-[#F4F6FA] uppercase"
            style={{ perspective: '1000px' }}
          >
            READY WHEN<br />YOU ARE
          </h2>
          <p ref={bodyRef} className="mt-8 text-base text-cool-gray leading-relaxed">
            Tell us what you're building. We'll reply with a clear plan, timeline, and estimate—no sales theater.
          </p>
          <button
            ref={ctaRef}
            onClick={() => scrollToSection('contact')}
            className="mt-10 group flex items-center gap-3 px-6 py-4 bg-mint text-[#0B0C0F] font-mono text-sm font-medium tracking-wider rounded btn-hover"
          >
            START A PROJECT
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReadySection;
