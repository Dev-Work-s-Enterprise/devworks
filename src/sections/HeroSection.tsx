import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Globe,
  Database,
  Cpu,
  Code2,
  Terminal,
  Wallet,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const floatingIcons = [
  { Icon: Bot, position: 'top-[20%] right-[15%]', size: 'w-12 h-12', delay: 0, opacity: 'opacity-40' },
  { Icon: Globe, position: 'top-[35%] right-[8%]', size: 'w-14 h-14', delay: 0.8, opacity: 'opacity-30' },
  { Icon: Database, position: 'top-[55%] right-[18%]', size: 'w-10 h-10', delay: 1.2, opacity: 'opacity-35' },
  { Icon: Cpu, position: 'bottom-[30%] right-[10%]', size: 'w-12 h-12', delay: 0.5, opacity: 'opacity-25' },
  { Icon: Code2, position: 'top-[45%] right-[25%]', size: 'w-9 h-9', delay: 1.5, opacity: 'opacity-30' },
  { Icon: Terminal, position: 'bottom-[20%] right-[22%]', size: 'w-10 h-10', delay: 0.3, opacity: 'opacity-35' },
  { Icon: Wallet, position: 'top-[15%] right-[28%]', size: 'w-8 h-8', delay: 2, opacity: 'opacity-25' },
  { Icon: Sparkles, position: 'bottom-[40%] right-[5%]', size: 'w-11 h-11', delay: 1, opacity: 'opacity-30' },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLSpanElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-play entrance animation on mount (desktop only)
  useEffect(() => {
    if (isMobile()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(microLabelRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words, { y: 40, rotateX: 25, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.03 }, 0.2);
      }
      tl.fromTo(subheadlineRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.5);
      tl.fromTo(ctaRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.6);
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        tl.fromTo(icon, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.4 + i * 0.1);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation (desktop only)
  useLayoutEffect(() => {
    if (isMobile()) return;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, microLabelRef.current], { opacity: 1, x: 0, y: 0 });
            iconsRef.current.forEach(icon => { if (icon) gsap.set(icon, { opacity: 1, x: 0, y: 0 }); });
          }
        }
      });
      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo([subheadlineRef.current, ctaRef.current], { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.75);
      scrollTl.fromTo(microLabelRef.current, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.8);
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        scrollTl.fromTo(icon, { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.72 + i * 0.02);
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="hero" className={`section-pinned bg-primary-dark vignette ${className}`}>

      {/* ── MOBILE LAYOUT ── */}
      <div className="section-mobile-content pt-24">
        <span className="font-mono text-[11px] tracking-[0.15em] text-cool-gray uppercase">
          DEV WORK'S ENTERPRISE
        </span>
        <h1 className="font-display font-bold text-[clamp(36px,10vw,72px)] leading-[0.95] tracking-[-0.02em] text-[#F4F6FA] uppercase">
          PRECISION<br />ENGINEERING
        </h1>
        <p className="font-mono text-sm tracking-wide text-cool-gray">
          Bots · Web Apps · Crypto Tools · AI/ML
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => scrollToSection('capabilities')}
            className="px-5 py-3 bg-mint text-[#0B0C0F] font-mono text-xs font-medium tracking-wider rounded btn-hover"
          >
            VIEW SERVICES
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-3 border border-white/20 text-[#F4F6FA] font-mono text-xs font-medium tracking-wider rounded hover:border-mint hover:text-mint transition-colors btn-hover"
          >
            START A PROJECT
          </button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (absolutely positioned, GSAP-animated) ── */}
      <div className="section-desktop-content">
        <span
          ref={microLabelRef}
          className="absolute top-[4vh] left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.15em] text-cool-gray uppercase"
        >
          DEV WORK'S ENTERPRISE
        </span>
        <div className="absolute left-[7vw] top-[18vh] w-[52vw] lg:w-[45vw]">
          <h1
            ref={headlineRef}
            className="font-display font-bold text-[clamp(40px,6vw,100px)] leading-[0.95] tracking-[-0.02em] text-[#F4F6FA] uppercase"
            style={{ perspective: '1000px' }}
          >
            <span className="word inline-block">PRECISION</span>
            <br />
            <span className="word inline-block">ENGINEERING</span>
          </h1>
        </div>
        <p
          ref={subheadlineRef}
          className="absolute left-[7vw] top-[54vh] w-[40vw] font-mono text-sm lg:text-base tracking-wide text-cool-gray"
        >
          Enterprise Solutions · Web Apps · Crypto Tools · AI/ML · Automation Tools/Workflows · MVP Development · Technical Consulting
        </p>
        <div ref={ctaRef} className="absolute left-[7vw] top-[64vh] flex flex-wrap gap-4">
          <button
            onClick={() => scrollToSection('capabilities')}
            className="group flex items-center gap-2 px-5 py-3 bg-mint text-[#0B0C0F] font-mono text-xs font-medium tracking-wider rounded btn-hover"
          >
            VIEW SERVICES
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-3 border border-white/20 text-[#F4F6FA] font-mono text-xs font-medium tracking-wider rounded hover:border-mint hover:text-mint transition-colors btn-hover"
          >
            START A PROJECT
          </button>
        </div>
        <div className="hidden lg:block">
          {floatingIcons.map(({ Icon, position, size, delay, opacity }, i) => (
            <div
              key={i}
              ref={(el) => { iconsRef.current[i] = el; }}
              className={`absolute ${position} ${size} icon-orb ${opacity} animate-float`}
              style={{ animationDelay: `${delay}s` }}
            >
              <Icon className="w-1/2 h-1/2 text-mint/60" strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
