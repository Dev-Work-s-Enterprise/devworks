import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Layers, 
  Database, 
  Bot, 
  Wallet, 
  CloudCog 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StackTunnelSectionProps {
  className?: string;
}

const stackCards = [
  {
    icon: Layers,
    title: 'Architecture',
    description: 'Scalable backends (Node/Python/Go), REST & GraphQL APIs, secure auth.',
  },
  {
    icon: Database,
    title: 'Data & AI',
    description: 'PostgreSQL, Redis, vector stores, LLM integrations, NLP pipelines.',
  },
  {
    icon: Bot,
    title: 'Automation',
    description: 'Selenium, Playwright, cron workflows, real-time event pipelines.',
  },
  {
    icon: Wallet,
    title: 'Crypto & Web3',
    description: 'Wallet integrations, custom miners, on-chain data, monitoring bots.',
  },
  {
    icon: CloudCog,
    title: 'DevOps',
    description: 'Docker, CI/CD, cloud deploys, monitoring, automated testing.',
  },
];

const StackTunnelSection = ({ className = '' }: StackTunnelSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className={`relative min-h-screen bg-secondary-lavender py-[10vh] px-6 lg:px-10 ${className}`}
      style={{
        background: 'linear-gradient(180deg, #0B0C0F 0%, #151725 50%, #0B0C0F 100%)',
      }}
    >
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-[8vh]">
        <h2 className="font-display font-bold text-[clamp(32px,4vw,64px)] tracking-[-0.02em] text-[#F4F6FA] uppercase">
          STACK & DELIVERY
        </h2>
        <p className="mt-4 font-mono text-sm text-cool-gray max-w-[52ch] mx-auto">
          A proven toolchain, tuned for speed and stability
        </p>
      </div>

      {/* Cards */}
      <div className="relative max-w-3xl mx-auto space-y-4">
        {stackCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="tunnel-card-dark relative p-6 lg:p-8 hover:border-mint/20 transition-colors"
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-mint/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-mint" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-semibold text-lg text-[#F4F6FA]">
                      {card.title}
                    </h3>
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-cool-gray/60">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-cool-gray leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StackTunnelSection;
