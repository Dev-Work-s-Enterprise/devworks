import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  className?: string;
}

const FooterSection = ({ className = '' }: FooterSectionProps) => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    }, footer);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Services', id: 'capabilities' },
    { label: 'Process', id: 'collaboration' },
    { label: 'Stack', id: 'stack' },
    { label: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Dev-Work-s-Enterprise', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/dero-idoghor-4722b1374?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative bg-primary-dark border-t border-white/5 py-12 px-6 lg:px-[7vw] ${className}`}
    >
      <div ref={contentRef} className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-10">

          {/* Left — Brand */}
          <div className="lg:max-w-sm">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display font-bold text-lg tracking-wider text-[#F4F6FA] hover:text-mint transition-colors"
            >
              DEV WORK'S
            </button>
            <p className="mt-3 text-sm text-cool-gray leading-relaxed">
              Premium development for teams that ship. End-to-End products, Bots, web apps, crypto tools, and AI integrations all built to run reliably at scale.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-cool-gray hover:text-mint hover:bg-white/10 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Links */}
          <div className="flex flex-wrap gap-10 lg:gap-16">

            {/* Navigation */}
            <div>
              <h4 className="font-mono text-[11px] tracking-wider text-cool-gray uppercase mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm text-[#F4F6FA]/80 hover:text-mint transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-mono text-[11px] tracking-wider text-cool-gray uppercase mb-4">
                Services
              </h4>
              <ul className="space-y-3">
                <li className="text-sm text-[#F4F6FA]/80">Automation Tools/Workflows</li>
                <li className="text-sm text-[#F4F6FA]/80">Web &amp; Mobile Apps</li>
                <li className="text-sm text-[#F4F6FA]/80">Crypto &amp; Blockchain</li>
                <li className="text-sm text-[#F4F6FA]/80">AI/ML &amp; Data Tools</li>
                <li className="text-sm text-[#F4F6FA]/80">Enterprise Solutions</li>
                <li className="text-sm text-[#F4F6FA]/80">MVP Development</li>
                <li className="text-sm text-[#F4F6FA]/80">Technical Consulting</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-[11px] tracking-wider text-cool-gray uppercase mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:devworks.ent@gmail.com"
                    className="text-sm text-[#F4F6FA]/80 hover:text-mint transition-colors"
                  >
                    devworks.ent@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+2348081617247"
                    className="text-sm text-[#F4F6FA]/80 hover:text-mint transition-colors"
                  >
                    +234 (808) 161-7247
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cool-gray/60">
            © 2026 Dev Work's Enterprise. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-xs text-cool-gray/60 hover:text-[#F4F6FA] transition-colors">
              Privacy Policy
            </button>
            <button className="text-xs text-cool-gray/60 hover:text-[#F4F6FA] transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
