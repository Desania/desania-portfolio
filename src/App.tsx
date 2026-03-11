/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import project1 from "./assets/project-1.png";
import project2 from "./assets/project-2.png";
import project3 from "./assets/project-3.png";
import project4 from "./assets/project-4.png";
import project5 from "./assets/project-5.png";
import project7 from "./assets/project-7.png";
import project8 from "./assets/project-8.png";
import project10 from "./assets/project-10.png";
import { 
  ExternalLink, 
  Mail, 
  Phone, 
  Linkedin, 
  Download, 
  ChevronRight, 
  Code, 
  Layout, 
  Zap, 
  Settings, 
  Search, 
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
  Globe,
  Monitor,
  Cpu,
  Smartphone,
  Gauge,
  Database,
  Puzzle
} from 'lucide-react';
import { cn } from './lib/utils';

gsap.registerPlugin(ScrollTrigger);

// --- Data ---

const FEATURED_PROJECTS = [
  { name: "Bigeye Agency", url: "https://bigeyeagency.com/", desc: "Full-service creative and media agency.", image: project1 },
  { name: "Purple Canyon", url: "https://purplecanyon.com/", desc: "Wellness and self-care e-commerce brand.", image: project10 },
  { name: "Project Sign", url: "https://projectsign.us/", desc: "Professional signage and vehicle wrap solutions.", image: project8 },
  { name: "G5 Architects", url: "https://g5architects.in/", desc: "Modern architectural and interior design.", image: project2 },
  { name: "Uttara Electronics", url: "https://uttaraelectronics.com/", desc: "Innovative green and renewable energy solutions.", image: project4 },
  { name: "AMS Construction", url: "https://amsconstructionlondonltd.co.uk/", desc: "London-based construction and renovation experts.", image: project3 },
  { name: "Palacia Skincare", url: "https://palaciaskincare.com/", desc: "Premium skincare and beauty e-commerce.", image: project7 },
  { name: "Blood Fitness", url: "https://bloodfitness.co.uk/", desc: "Jersey's premier martial arts and fitness academy.", image: project5 },
  { name: "Growth Mindset", url: "https://lifelessonsglobal.com/growth-mindset/", desc: "Educational platform for kids' confidence and resilience.", image: project1 }
];

const MORE_PROJECTS = [
  { name: "Happy Life on Samui", url: "https://softwebexpert.in/happylifeonsamui/" },
  { name: "Wellness with Kian", url: "https://www.wellnesswithkian.com/" },
  { name: "Alizo", url: "https://alizo.gr/" },
  { name: "Dream Closets", url: "https://dreamclosetsllc.com/" },
  { name: "Wijzer in Zorg", url: "https://softwebexpert.in/wijzerinzorg/" },
  { name: "Nels Student Housing", url: "https://nelsstudenthousing.com/" },
  { name: "Try Balance", url: "https://trybalance.co.uk/" },
  { name: "Warren Goldie", url: "https://warrengoldie.com/" },
  { name: "Oz Appliances", url: "https://ozappliances.com.au/" },
  { name: "Go PGC", url: "https://go-pgc.com/" },
  { name: "Nishant Mittal SEO", url: "https://nishantmittalseo.com/" },
  { name: "IINA", url: "https://iina.in/" },
  { name: "Mathematics Elevate", url: "https://www.mathematicselevateacademy.com/" },
  { name: "Golden Sparrow Records", url: "https://goldensparrowrecords.com/" },
  { name: "Mata Sahib Deva", url: "https://matasahibdevafoundation.com/" },
  { name: "Traffic Monks", url: "https://trafficmonks.com/" },
  { name: "Xoxocolati", url: "https://xoxocolati.com/" },
  { name: "Thinklab Comms", url: "https://www.thinklabcomms.com/" },
  { name: "Rainglow Resorts", url: "https://rainglowresorts.com/" },
  { name: "Vikmar Foods", url: "https://www.vikmarfoods.com/" },
  { name: "Weedland Shop", url: "https://weedlandshop.com/" },
  { name: "Peca", url: "https://softwebexpert.in/peca/" },
  { name: "Ridgways Drafting", url: "https://ridgwaysdrafting.com.au/" },
  { name: "Re-markability", url: "https://re-markability.com/" },
  { name: "Reynold Lewke", url: "https://reynoldlewke.com/" },
  { name: "The Richest Boy", url: "https://therichestboy.com/" },
  { name: "Neelu Sarao", url: "https://neelusarao.com/" }
];

const LANDING_PAGES = [
  { name: "IHHT Therapie", url: "https://ihht-therapiekonzept.de/krallerhofbaumodus/" },
  { name: "Squeeze Page Style", url: "https://softwebexpert.in/ihht/squeeze-page-style/" },
  { name: "Klavv Landing", url: "https://softwebexpert.in/klavv/landing-page-baumodus/" },
  { name: "Life Lessons Global", url: "https://lifelessonsglobal.com/growth-mindset/" },
  { name: "The Richest Boy LP", url: "https://softwebexpert.in/therichestboy/" },
  { name: "Multifamily Marketing", url: "https://www.bigeyeagency.com/multifamily-marketing-student-senior-housing/" },
  { name: "Drupal Landing", url: "https://www.bigeyeagency.com/landing-page-drupal/" },
  { name: "Social Media LP", url: "https://www.bigeyeagency.com/landing-page-social-media/" },
  { name: "Amazon Marketing", url: "https://www.bigeyeagency.com/landing-page-amazon/" },
  { name: "Pet Marketing", url: "https://www.bigeyeagency.com/landing-page-pet-marketing/" },
  { name: "Senior Living", url: "https://www.bigeyeagency.com/landing-page-senior-living/" },
  { name: "Market Research", url: "https://www.bigeyeagency.com/consumer-market-research-agency/" },
  { name: "EyeQ Landing", url: "https://www.bigeyeagency.com/landing-page-eyeq/" },
  { name: "Beauty & Wellness", url: "https://www.bigeyeagency.com/landing-page-beauty-and-wellness/" },
  { name: "Email Marketing", url: "https://www.bigeyeagency.com/landing-page-email-marketing/" },
  { name: "Retail Landing", url: "https://www.bigeyeagency.com/landing-page-retail/" },
  { name: "Data Driven LP", url: "https://www.bigeyeagency.com/landing-page-data-driven/" },
  { name: "Hotel Landing", url: "https://www.bigeyeagency.com/landing-page-hotel/" },
  { name: "Geetveda Aura", url: "https://geetveda.in/aura-cleanser-lp/" },
  { name: "Modern Style LP", url: "https://darkseagreen-cormorant-415606.hostingersite.com/" },
  { name: "CRO Salespage", url: "https://news.apotheken-gesundheitstipps.com/cro-salespage-new-style/" }
];

const SKILLS = [
  { name: "WordPress", icon: "https://cdn.simpleicons.org/wordpress/ffffff" },
  { name: "Elementor", icon: "https://cdn.simpleicons.org/elementor/ffffff" },
  { name: "Divi", icon: "https://cdn.simpleicons.org/blueprint/ffffff" },
  { name: "ACF", icon: "https://cdn.simpleicons.org/advancedcustomfields/ffffff" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/ffffff" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/ffffff" },
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/ffffff" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/ffffff" },
  { name: "Basic React.js", icon: "https://cdn.simpleicons.org/react/ffffff" },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/ffffff" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/ffffff" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff" },
  { name: "Shopify", icon: "https://cdn.simpleicons.org/shopify/ffffff" }
];

const SERVICES = [
  { title: "WordPress Website Development", icon: <Globe className="w-8 h-8" />, desc: "Custom WordPress solutions tailored to your business needs." },
  { title: "Elementor / Divi Website Design", icon: <Layout className="w-8 h-8" />, desc: "Stunning, high-performance designs using top page builders." },
  { title: "Responsive Design", icon: <Smartphone className="w-8 h-8" />, desc: "Websites that look and perform perfectly on all screen sizes." },
  { title: "Website Speed Optimization", icon: <Gauge className="w-8 h-8" />, desc: "Lightning-fast loading times for better SEO and user experience." },
  { title: "CMS Management", icon: <Database className="w-8 h-8" />, desc: "Efficient content management and organization for your digital assets." },
  { title: "Plugin Integration", icon: <Puzzle className="w-8 h-8" />, desc: "Seamless integration of essential plugins to extend functionality." },
  { title: "Website Maintenance", icon: <CheckCircle2 className="w-8 h-8" />, desc: "Keeping your site secure, updated, and running smoothly." },
  { title: "Bug Fixing & Troubleshooting", icon: <Search className="w-8 h-8" />, desc: "Quickly identifying and resolving technical issues." }
];

// --- Components ---

const SectionTitle = ({ children, subtitle, centered = false }: { children: React.ReactNode, subtitle?: string, centered?: boolean }) => (
  <div className={cn("mb-16 gsap-reveal", centered && "text-center")}>
    <h2 className="text-5xl md:text-7xl font-display italic mb-4">{children}</h2>
    {subtitle && <p className={cn("text-muted text-2xl max-w-2xl", centered && "mx-auto")}>{subtitle}</p>}
    <div className={cn("h-px w-24 bg-accent mt-8", centered && "mx-auto")}></div>
  </div>
);

interface ProjectCardProps {
  project: { name: string; url: string; desc?: string; image?: string };
  key?: React.Key;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <div className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden project-card-hover gsap-reveal">
    <div className="aspect-video bg-neutral-900 relative overflow-hidden">
      <img 
        src={project.image || `https://picsum.photos/seed/${project.name.replace(/\s/g, '')}/800/450`} 
        alt={project.name}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60"></div>
    </div>
    <div className="p-8">
      <h3 className="text-[20px] font-medium mb-2 group-hover:text-accent transition-colors">{project.name}</h3>
      {project.desc && <p className="text-[20px] text-muted mb-6 line-clamp-2">{project.desc}</p>}
      <a 
        href={project.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[20px] font-medium uppercase tracking-widest hover:gap-4 transition-all"
      >
        Visit Website <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  </div>
);

const TextProjectLink = ({ project }: { project: { name: string; url: string }; key?: React.Key }) => (
  <a 
    href={project.url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center justify-between p-6 bg-card border border-white/5 rounded-xl hover:border-accent/20 transition-all gsap-reveal"
  >
    <span className="text-[20px] font-medium group-hover:text-accent transition-colors">{project.name}</span>
    <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent transition-all" />
  </a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage("A network error occurred. Please check your connection.");
    }
  };

  useEffect(() => {
    // Smooth Scroll
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Hero Animations
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2
      });

      gsap.from(".hero-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "back.out(1.7)",
        stagger: 0.2
      });

      // Reveal Animations
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Background Shapes Animation
      gsap.to(".bg-shape", {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 2,
          from: "random"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="bg-shape absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="bg-shape absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 flex justify-between items-center">
        <div className="text-2xl font-display italic tracking-tighter cursor-pointer" onClick={() => scrollTo('hero')}>
          DG.
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Fullscreen Menu */}
      <div className={cn(
        "fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center transition-transform duration-700 ease-expo",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <ul className="text-center space-y-8">
          {['home', 'about', 'projects', 'skills', 'experience', 'services', 'contact'].map((item) => (
            <li key={item}>
              <button 
                onClick={() => scrollTo(item === 'home' ? 'hero' : item)}
                className="text-4xl md:text-6xl font-display italic hover:text-muted transition-colors capitalize"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-24 relative overflow-hidden">
        <div className="max-w-6xl">
          <p className="hero-title text-xl md:text-2xl font-mono text-muted mb-6 uppercase tracking-widest">
            Freelance WordPress Developer
          </p>
          <h1 className="hero-title text-7xl md:text-[12rem] font-display italic leading-[0.85] mb-12 tracking-tighter">
            Desania Garg
          </h1>
          <p className="hero-title text-[24px] md:text-3xl text-muted max-w-3xl mb-12 leading-relaxed">
            I build modern, fast and conversion-focused websites using WordPress and modern web technologies.
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => scrollTo('projects')}
              className="hero-btn px-10 py-5 bg-accent text-bg rounded-full font-medium text-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              View Projects <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="hero-btn px-10 py-5 border border-accent/20 rounded-full font-medium text-lg hover:bg-accent/5 transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-px h-24 bg-accent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-24 bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gsap-reveal">
            <SectionTitle centered>About Me</SectionTitle>
            <div className="space-y-8 text-[24px]">
              <p className="text-[24px]">
                I am a passionate freelance web developer specialized in creating high-performance WordPress ecosystems. My approach blends technical precision with creative design to deliver websites that don't just look good, but convert.
              </p>
              <p className="text-[24px]">
                With deep expertise in Elementor, Divi, and custom layout development, I focus on building responsive, user-friendly interfaces that provide seamless experiences across all devices.
              </p>
              <p className="text-[24px]">
                My work is driven by a commitment to performance, clean UI, and robust problem-solving. I value strong communication and teamwork, ensuring every client's vision is translated into a digital reality.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium">Design-Driven</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium">Performance-Focused</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium">Client-Centric</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-24">
        <div className="max-w-7xl text-lg mx-auto">
          <SectionTitle subtitle="A selection of my premium WordPress projects with custom designs.">
            Featured Projects
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>

          <div className="mt-40">
            <SectionTitle subtitle="A comprehensive list of additional successful client projects.">
              More Projects
            </SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MORE_PROJECTS.map((project, i) => (
                <TextProjectLink key={i} project={project} />
              ))}
            </div>
          </div>

          <div className="mt-40">
            <SectionTitle subtitle="High-conversion, performance-optimized landing pages.">
              Landing Pages
            </SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LANDING_PAGES.map((project, i) => (
                <TextProjectLink key={i} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 md:px-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="The technologies and tools I use to bring digital ideas to life.">
            My Skillset
          </SectionTitle>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {SKILLS.map((skill, i) => (
              <div key={i} className="group p-8 bg-card border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-accent/20 transition-all gsap-reveal">
                <img src={skill.icon} alt={skill.name} className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-500" />
                <span className="text-[20px] font-mono text-muted group-hover:text-accent">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="space-y-12">
            <div className="gsap-reveal border-l border-accent/20 pl-8 relative">
              <div className="absolute top-0 left-0 -translate-x-1/2 w-4 h-4 bg-accent rounded-full"></div>
              <h3 className="text-3xl font-display italic mb-4">WordPress Developer</h3>
              <ul className="space-y-4 text-muted text-2xl font-creative italic">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                  Expert WordPress theme customization and development using HTML, CSS, and Bootstrap.
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                  Advanced page builder development utilizing Elementor and Divi for custom, high-end designs.
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                  Comprehensive website updates, security patches, and complex technical troubleshooting.
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                  End-to-end client website delivery, from initial concept to final deployment and training.
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                  Efficient CMS management and content strategy implementation for diverse business sectors.
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                  Seamless plugin integrations and custom functionality development to enhance user experience.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 md:px-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Specialized solutions to help your business grow online.">
            My Services
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, i) => (
              <div key={i} className="p-10 bg-card border border-white/5 rounded-3xl hover:bg-neutral-900 transition-colors gsap-reveal">
                <div className="text-accent mb-6">{service.icon}</div>
                <h3 className="text-[24px] font-medium mb-4">{service.title}</h3>
                <p className="text-[24px] text-muted leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
          <div className="gsap-reveal">
            <SectionTitle subtitle="Let's discuss your next project and build something amazing together.">
              Get In Touch
            </SectionTitle>
            
            <div className="space-y-8 mt-12">
              <a href="mailto:gargdesania@gmail.com" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-card border border-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl text-muted uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-xl font-medium">gargdesania@gmail.com</p>
                </div>
              </a>
              
              <a href="tel:+917973406533" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-card border border-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl text-muted uppercase tracking-widest mb-1">Call Me</p>
                  <p className="text-xl font-medium">+91 7973406533</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/desania-garg-7b541027a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-card border border-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl text-muted uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="text-xl font-medium">Desania Garg</p>
                </div>
              </a>
            </div>

            <div className="mt-16">
              <a 
                href="https://drive.google.com/file/d/10IkExWG2RVToWglq10UR_HJ_rAUmY_8w/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent/5 border border-accent/20 rounded-full hover:bg-accent hover:text-bg transition-all font-medium"
              >
                <ArrowUpRight className="w-5 h-5" /> View Resume
              </a>
            </div>
          </div>

          <div className="gsap-reveal bg-card p-10 rounded-3xl border border-white/5">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-bg border border-white/10 rounded-xl px-6 py-4 focus:border-accent outline-none transition-colors" 
                    placeholder="Your Name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-bg border border-white/10 rounded-xl px-6 py-4 focus:border-accent outline-none transition-colors" 
                    placeholder="Your Email" 
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-bg border border-white/10 rounded-xl px-6 py-4 focus:border-accent outline-none transition-colors" 
                    placeholder="Your Phone Number" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted uppercase tracking-widest">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-bg border border-white/10 rounded-xl px-6 py-4 focus:border-accent outline-none transition-colors" 
                    placeholder="Project Subject" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted uppercase tracking-widest">Message</label>
                <textarea 
                  rows={5} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-bg border border-white/10 rounded-xl px-6 py-4 focus:border-accent outline-none transition-colors resize-none" 
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button 
                disabled={status === 'loading'}
                className="w-full py-5 bg-accent text-bg rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-emerald-500 text-center font-medium">Message sent successfully!</p>}
              {status === 'error' && <p className="text-rose-500 text-center font-medium">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-muted text-sm font-mono">
          © {new Date().getFullYear()} Desania Garg. All rights reserved.
        </div>
        <div className="flex gap-8 text-sm uppercase tracking-widest font-medium">
          <button onClick={() => scrollTo('hero')} className="hover:text-accent transition-colors">Home</button>
          <button onClick={() => scrollTo('projects')} className="hover:text-accent transition-colors">Projects</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-accent transition-colors">Contact</button>
        </div>
      </footer>
    </div>
  );
}
