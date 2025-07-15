import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([textRef.current, progressBarRef.current], { opacity: 0, y: 30 });
    
    // Animation sequence
    tl.to([textRef.current, progressBarRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
      }
    })
    .to([textRef.current, progressBarRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: "power2.in"
    }, "+=0.5")
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center space-y-8">
        <div ref={textRef} className="space-y-4">
          <h1 className="text-6xl font-bold gradient-text tracking-wider">
            MILAD
          </h1>
          <p className="text-lg text-foreground/60">
            Loading Experience...
          </p>
        </div>
        
        <div className="w-80 mx-auto space-y-2">
          <div className="relative h-1 bg-background-secondary rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="absolute left-0 top-0 h-full bg-gradient-neon rounded-full w-0"
              style={{ 
                boxShadow: '0 0 20px hsl(var(--neon-blue))',
                filter: 'blur(0.5px)'
              }}
            />
          </div>
          <div className="text-right">
            <span 
              ref={percentRef}
              className="text-sm text-neon-blue font-mono"
            >
              0%
            </span>
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full glow-blue float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;