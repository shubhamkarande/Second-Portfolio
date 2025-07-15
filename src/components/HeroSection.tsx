import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Initial setup - blur and hide elements
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    });
    
    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
    });

    // Animation sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out"
    }, "-=0.8");

    // Floating background elements
    gsap.to(".glow-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    // CTA button hover effect
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      const handleMouseEnter = () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          boxShadow: "0 0 30px rgb(64, 165, 255)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(ctaButton, {
          scale: 1,
          boxShadow: "0 0 20px rgb(64, 165, 255)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      ctaButton.addEventListener('mouseenter', handleMouseEnter);
      ctaButton.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        ctaButton.removeEventListener('mouseenter', handleMouseEnter);
        ctaButton.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-scroll-section
    >
      {/* Spline 3D Model as Complete Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe 
          src='https://my.spline.design/orb-4CCbk99W5AktTVpK4DqWzNTA/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full object-cover"
          style={{ minHeight: '100vh' }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Floating glow elements */}
      <div className="absolute inset-0 overflow-hidden z-20">
        <div className="glow-orb absolute top-20 left-20 w-32 h-32 bg-neon-blue/10 rounded-full blur-xl" />
        <div className="glow-orb absolute bottom-40 right-20 w-40 h-40 bg-neon-purple/10 rounded-full blur-xl" />
        <div className="glow-orb absolute top-1/2 left-1/3 w-24 h-24 bg-neon-cyan/10 rounded-full blur-xl" />
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-6 lg:px-20 max-w-4xl">
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6 leading-tight"
        >
          Hi, I'm Milad –<br />
          <span className="text-white">Web Developer</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          Crafting digital experiences that inspire and engage through 
          innovative design and cutting-edge technology.
        </p>
        
        <Button
          ref={ctaRef}
          className="hero-cta px-8 py-4 text-lg font-semibold bg-gradient-neon border-0 text-background shadow-glow-neon hover:shadow-glow-neon"
        >
          Hire Me
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;