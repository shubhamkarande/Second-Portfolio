import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GithubLogo, LinkedinLogo, TwitterLogo, PaperPlaneTilt } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(".contact-element", {
        opacity: 0,
        y: 40,
        filter: "blur(8px)"
      });

      gsap.set(".social-icon", {
        opacity: 0,
        scale: 0.5,
        rotation: -180
      });

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(".contact-element", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      })
      .to(".social-icon", {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // Form input focus effects
      const inputs = formRef.current?.querySelectorAll('input, textarea');
      inputs?.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.02,
            boxShadow: "0 0 20px rgba(64, 165, 255, 0.3)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Social icons hover effect
      document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 5,
            boxShadow: "0 0 20px rgba(64, 165, 255, 0.5)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animate submit button
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Add success animation here
    }, 2000);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 lg:px-20"
      data-scroll-section
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="contact-element text-section gradient-text mb-6">
            Get In Touch
          </h2>
          <p className="contact-element text-xl text-foreground/70">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="contact-element">
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    className="glass-card border-glass-border bg-background-secondary/50 focus:border-neon-blue focus:ring-neon-blue/20"
                    required
                  />
                </div>
                <div className="contact-element">
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="glass-card border-glass-border bg-background-secondary/50 focus:border-neon-blue focus:ring-neon-blue/20"
                    required
                  />
                </div>
              </div>

              <div className="contact-element">
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="Project collaboration"
                  className="glass-card border-glass-border bg-background-secondary/50 focus:border-neon-blue focus:ring-neon-blue/20"
                  required
                />
              </div>

              <div className="contact-element">
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="glass-card border-glass-border bg-background-secondary/50 focus:border-neon-blue focus:ring-neon-blue/20"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="contact-element w-full bg-gradient-neon border-0 text-background font-semibold py-3 shadow-glow-neon hover:shadow-glow-neon disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PaperPlaneTilt size={20} />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <div className="contact-element glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-neon-blue mb-4">
                Contact Info
              </h3>
              <div className="space-y-3 text-foreground/70">
                <p>
                  <span className="font-medium">Email:</span><br />
                  hello@milad.dev
                </p>
                <p>
                  <span className="font-medium">Phone:</span><br />
                  +1 (555) 123-4567
                </p>
                <p>
                  <span className="font-medium">Location:</span><br />
                  San Francisco, CA
                </p>
              </div>
            </div>

            <div ref={socialRef} className="contact-element">
              <h3 className="text-lg font-semibold text-neon-blue mb-4">
                Follow Me
              </h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="social-icon glass-card p-3 rounded-xl hover:glow-blue transition-all duration-300"
                >
                  <GithubLogo size={24} className="text-foreground" />
                </a>
                <a 
                  href="#" 
                  className="social-icon glass-card p-3 rounded-xl hover:glow-blue transition-all duration-300"
                >
                  <LinkedinLogo size={24} className="text-foreground" />
                </a>
                <a 
                  href="#" 
                  className="social-icon glass-card p-3 rounded-xl hover:glow-blue transition-all duration-300"
                >
                  <TwitterLogo size={24} className="text-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;