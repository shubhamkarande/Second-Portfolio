import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(".footer-element", {
        opacity: 0,
        y: 30,
        filter: "blur(8px)"
      });

      gsap.set(".particle", {
        opacity: 0,
        scale: 0
      });

      // Footer animation
      gsap.to(".footer-element", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Particles animation
      gsap.to(".particle", {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Floating particles
      gsap.to(".particle", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 px-6 lg:px-20 mt-20 border-t border-glass-border"
      data-scroll-section
    >
      {/* Floating Particles Background */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-neon-blue/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="footer-element">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              MILAD
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              Crafting digital experiences that inspire and engage through 
              innovative design and cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-element">
            <h4 className="text-lg font-semibold text-neon-blue mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-foreground/70 hover:text-neon-blue transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-element">
            <h4 className="text-lg font-semibold text-neon-blue mb-4">
              Get In Touch
            </h4>
            <div className="space-y-2 text-foreground/70">
              <p>hello@milad.dev</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="glass-card p-2 rounded-lg hover:glow-blue transition-all duration-300 group"
              >
                <GithubLogo 
                  size={20} 
                  className="text-foreground group-hover:text-neon-blue transition-colors duration-300" 
                />
              </a>
              <a 
                href="#" 
                className="glass-card p-2 rounded-lg hover:glow-blue transition-all duration-300 group"
              >
                <LinkedinLogo 
                  size={20} 
                  className="text-foreground group-hover:text-neon-blue transition-colors duration-300" 
                />
              </a>
              <a 
                href="#" 
                className="glass-card p-2 rounded-lg hover:glow-blue transition-all duration-300 group"
              >
                <TwitterLogo 
                  size={20} 
                  className="text-foreground group-hover:text-neon-blue transition-colors duration-300" 
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-element pt-8 border-t border-glass-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">
              © 2024 Milad. All rights reserved.
            </p>
            <p className="text-foreground/60 text-sm flex items-center gap-1">
              Made with <Heart size={16} className="text-neon-pink" /> using React & GSAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;