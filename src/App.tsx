import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import CustomSoftwareSection from './sections/CustomSoftwareSection';
import CollaborationSection from './sections/CollaborationSection';
import ResultsSection from './sections/ResultsSection';
import ReadySection from './sections/ReadySection';
import StackTunnelSection from './sections/StackTunnelSection';
import ContactFormSection from './sections/ContactFormSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="grain-overlay">
      <Navigation />
      <main className="relative">
        <HeroSection className="z-10" />
        <CapabilitiesSection className="z-20" />
        <CustomSoftwareSection className="z-30" />
        <CollaborationSection className="z-40" />
        <ResultsSection className="z-50" />
        <ReadySection className="z-[60]" />
        <StackTunnelSection className="z-[70]" />
        <ContactFormSection className="z-[80]" />
        <FooterSection className="z-[90]" />
      </main>
    </div>
  );
}

export default App;
