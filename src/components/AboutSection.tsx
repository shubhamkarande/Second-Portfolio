import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileCode, 
  PaintBrush, 
  Code, 
  Rocket, 
  Lightning, 
  Globe 
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: FileCode, name: 'HTML5', color: 'text-orange-400' },
    { icon: PaintBrush, name: 'CSS3', color: 'text-blue-400' },
    { icon: Code, name: 'JavaScript', color: 'text-yellow-400' },
    { icon: Code, name: 'React', color: 'text-cyan-400' },
    { icon: Lightning, name: 'GSAP', color: 'text-green-400' },
    { icon: Globe, name: 'Three.js', color: 'text-white' },
    { icon: Rocket, name: 'Next.js', color: 'text-gray-300' },
    { icon: Code, name: 'TypeScript', color: 'text-blue-500' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([imageRef.current, contentRef.current], {
        opacity: 0,
        filter: "blur(10px)"
      });

      gsap.set(imageRef.current, { x: -50 });
      gsap.set(contentRef.current, { y: 30 });

      // ScrollTrigger animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(imageRef.current, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out"
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      .to(".skill-icon", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // Profile image hover effect
      const profileImage = imageRef.current;
      if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
          gsap.to(profileImage, {
            rotationY: 5,
            rotationX: -5,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        profileImage.addEventListener('mouseleave', () => {
          gsap.to(profileImage, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 lg:px-20"
      data-scroll-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-neon rounded-full p-1 glow-neon">
                <div className="w-full h-full bg-background rounded-full overflow-hidden">
                  <img
                    src="/lovable-uploads/a8d8a2c4-c827-405b-a8f0-e144d21af5da.png"
                    alt="Milad - Web Developer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-blue/30 rounded-full blur-sm float" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-neon-purple/30 rounded-full blur-sm float-delayed" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-section gradient-text mb-6">
                About Me
              </h2>
              <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
                <p>
                  I'm a passionate web developer with a love for creating 
                  immersive digital experiences. My expertise lies in combining 
                  cutting-edge technologies like React, GSAP, and Three.js to 
                  build websites that don't just function—they captivate.
                </p>
                <p>
                  With a keen eye for design and a deep understanding of modern 
                  web technologies, I specialize in creating smooth animations, 
                  interactive 3D elements, and responsive interfaces that 
                  deliver exceptional user experiences.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-xl font-semibold text-neon-blue mb-6">
                Technical Skills
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skill-icon group glass-card p-4 rounded-xl text-center hover:glow-blue transition-all duration-300 cursor-pointer"
                    style={{
                      opacity: 0,
                      transform: 'translateY(20px) scale(0.8)'
                    }}
                  >
                    <skill.icon 
                      size={32} 
                      className={`${skill.color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <p className="text-xs text-foreground/70 font-medium">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;