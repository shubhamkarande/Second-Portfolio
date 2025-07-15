import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowSquareOut, GithubLogo } from 'phosphor-react';

// Import project images
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "3D Interactive Web App",
      description: "Futuristic web application with immersive 3D elements and real-time interactions.",
      image: project1,
      tech: ["React", "Three.js", "GSAP", "TypeScript"],
      featured: true
    },
    {
      id: 2,
      title: "Gaming Platform",
      description: "Next-generation gaming website with dynamic animations and 3D models.",
      image: project2,
      tech: ["Next.js", "Spline", "Framer Motion", "WebGL"]
    },
    {
      id: 3,
      title: "Email Marketing Tool",
      description: "Advanced email platform with stunning data visualizations and analytics.",
      image: project3,
      tech: ["React", "D3.js", "Node.js", "MongoDB"]
    },
    {
      id: 4,
      title: "Authentication System",
      description: "Secure and elegant authentication solution with modern UI/UX design.",
      image: project4,
      tech: ["React", "Auth0", "Tailwind", "TypeScript"]
    },
    {
      id: 5,
      title: "Animated Portfolio",
      description: "Creative portfolio showcase with smooth animations and 3D interactions.",
      image: project5,
      tech: ["React", "GSAP", "Three.js", "Locomotive"]
    },
    {
      id: 6,
      title: "Animation Tools",
      description: "Professional web animation toolkit with timeline controls and effects.",
      image: project6,
      tech: ["React", "GSAP", "Canvas API", "WebGL"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 50,
        filter: "blur(10px)"
      });

      gsap.set(".project-card", {
        opacity: 0,
        y: 60,
        scale: 0.9
      });

      // Title animation
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards animation
      gsap.to(".project-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Card hover effects
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            y: -10,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            duration: 0.3,
            ease: "power2.out"
          });
          
          const image = card.querySelector('.project-image');
          gsap.to(image, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
          
          const image = card.querySelector('.project-image');
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

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
        <h2 
          ref={titleRef}
          className="text-section gradient-text text-center mb-16"
        >
          Featured Projects
        </h2>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-48 sm:h-56 lg:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-neon-blue/20 backdrop-blur-sm border border-neon-blue/30 hover:bg-neon-blue/30">
                    <ArrowSquareOut size={16} />
                  </Button>
                  <Button size="sm" className="bg-neon-purple/20 backdrop-blur-sm border border-neon-purple/30 hover:bg-neon-purple/30">
                    <GithubLogo size={16} />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-foreground/70 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-gradient-neon border-0 hover:shadow-glow-neon transition-all duration-300">
                  View Project
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;