import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Preloader from './Preloader';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PortfolioApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize locomotive scroll when component mounts
    let locomotiveScroll: any;

    const initSmoothScrolling = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      
      locomotiveScroll = new LocomotiveScroll({
        el: containerRef.current!,
        smooth: true,
        multiplier: 1,
        class: 'is-revealed',
        scrollbarContainer: document.querySelector('[data-scroll-container]')
      });

      // Update ScrollTrigger on locomotive scroll
      locomotiveScroll.on('scroll', ScrollTrigger.update);

      // Sync ScrollTrigger with locomotive scroll
      ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
          return arguments.length ? locomotiveScroll.scrollTo(value, 0, 0) : locomotiveScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: containerRef.current!.style.transform ? 'transform' : 'fixed'
      });

      // Refresh ScrollTrigger and locomotive scroll
      ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());
      ScrollTrigger.refresh();
    };

    if (!isLoading) {
      initSmoothScrolling();
    }

    // Cleanup
    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
      ScrollTrigger.removeEventListener('refresh', () => locomotiveScroll?.update());
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Additional setup after loading
    gsap.to("body", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  if (isLoading) {
    return <Preloader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative">
      <Navigation />
      
      <div 
        ref={containerRef}
        data-scroll-container
        className="overflow-hidden"
      >
        <main>
          <section id="home">
            <HeroSection />
          </section>
          
          <section id="about">
            <AboutSection />
          </section>
          
          <section id="projects">
            <ProjectsSection />
          </section>
          
          <section id="contact">
            <ContactSection />
          </section>
          
          <Footer />
        </main>
      </div>

      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioApp;