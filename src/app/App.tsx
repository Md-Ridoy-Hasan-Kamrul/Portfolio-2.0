import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "./components/Toast";
import developerPhoto from "../imports/Gemini_Generated_Image_hkis8khkis8khkis.png";
const cvPdf = "/Ridoy_Hasan_Kamrul_CV.pdf";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiGithub, FiExternalLink, FiMail, FiArrowUpRight, FiMenu, FiX, FiMapPin, FiPhone,
} from "react-icons/fi";
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs,
  SiFigma, SiGit, SiJavascript, SiHtml5, SiCss, SiBootstrap, SiGithub, SiPostman,
} from "react-icons/si";
import { FaLinkedinIn, FaTwitter, FaWhatsapp, FaDribbble } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// ─── Design tokens ────────────────────────────────────────────────────────────
const LIME = "#B8FF3B";
const MINT = "#4DFFA8";
const PURPLE = "#A78BFA";
const BG = "#06060C";
const SURFACE = "#0C0C14";
const MUTED = "#52526A";
const TEXT = "#EEEEF5";

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS_LIST = [
  { name: "React",       icon: SiReact,      color: "#61DAFB", x: 8,  y: 10, d: 0    },
  { name: "Next.js",     icon: SiNextdotjs,  color: "#ffffff", x: 33, y: 4,  d: 0.4  },
  { name: "TypeScript",  icon: SiTypescript, color: "#3178C6", x: 60, y: 12, d: 0.2  },
  { name: "JavaScript",  icon: SiJavascript, color: "#F7DF1E", x: 82, y: 5,  d: 0.6  },
  { name: "HTML5",       icon: SiHtml5,      color: "#E34F26", x: 14, y: 44, d: 0.8  },
  { name: "CSS3",        icon: SiCss,        color: "#264DE4", x: 38, y: 52, d: 0.15 },
  { name: "Tailwind",    icon: SiTailwindcss,color: "#06B6D4", x: 62, y: 46, d: 0.5  },
  { name: "Bootstrap",   icon: SiBootstrap,  color: "#7952B3", x: 86, y: 42, d: 0.3  },
  { name: "Node.js",     icon: SiNodedotjs,  color: "#8CC84B", x: 5,  y: 76, d: 0.7  },
  { name: "Figma",       icon: SiFigma,      color: "#F24E1E", x: 30, y: 82, d: 0.9  },
  { name: "Git",         icon: SiGit,        color: "#F05032", x: 55, y: 80, d: 0.45 },
  { name: "GitHub",      icon: SiGithub,     color: "#ffffff", x: 78, y: 76, d: 0.65 },
  { name: "Postman",     icon: SiPostman,    color: "#FF6C37", x: 93, y: 62, d: 0.25 },
];

const PROJECTS = [
  {
    num: "01", title: "Q Global Living", sub: "Real Estate Platform",
    caption: "Full-Stack Marketplace · Next.js 16",
    desc: "Full-stack real estate marketplace with internationalization (EN/FR), property listings, event registration, admin dashboards, and escrow-protected transactions. React Compiler compliant with custom auth flows for admin/client/partner roles.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "i18n"],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=780&fit=crop&auto=format",
    live: "https://qhomes.mtscorporate.com/en", github: "#", accent: LIME,
  },
  {
    num: "02", title: "CoorDeck", sub: "Technologies",
    caption: "Temporary Works Management · Next.js 14",
    desc: "90+ Lighthouse score site built pixel-perfectly from a Figma design. Full SEO, WCAG 2.1 AA accessibility, and Framer Motion animations throughout.",
    tags: ["Next.js 14", "TypeScript", "Framer Motion", "WCAG 2.1"],
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&h=780&fit=crop&auto=format",
    live: "https://alex-coordinate.vercel.app", github: "#", accent: MINT,
  },
  {
    num: "03", title: "TherellWalker", sub: "Trading Journal",
    caption: "Performance Analytics · React 19",
    desc: "Trading journal platform with Context API state management, localStorage trade logging, real-time P&L calculations, Recharts analytics dashboard (equity curves, win rates), and rotating reflection prompts for trading psychology.",
    tags: ["React 19", "Tailwind CSS", "Recharts", "Context API"],
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&h=780&fit=crop&auto=format",
    live: "https://myledger.mtscorporate.com/", github: "#", accent: PURPLE,
  },
  {
    num: "04", title: "Layls", sub: "E-commerce Platform",
    caption: "Auth & Shopping · Next.js",
    desc: "E-commerce platform with complete authentication — Google Auth 2.0, WhatsApp/Email OTP for sign-up, login & recovery. Secure password toggle and login-gated content.",
    tags: ["Next.js", "Google Auth 2.0", "OTP", "E-commerce"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=780&fit=crop&auto=format",
    live: "https://www.layls.com", github: "#", accent: "#F59E0B",
  },
];

const EXPERIENCE = [
  {
    num: "01", role: "Front-End Developer", company: "MAK Tech Solution",
    period: "Jan 2025 — Present", color: LIME,
    desc: "Delivering multiple live client projects via Fiverr. Building UIs with React, Next.js, Tailwind CSS & JavaScript — from Figma designs to production. Integrating NPM packages and collaborating with tools like Postman, GitHub & Git.",
    stats: ["Currently Active", "Fiverr Clients", "React & Next.js"],
  },
  {
    num: "02", role: "Researcher", company: "Business Process Outsourcing",
    period: "Jan 2022 — Dec 2024", color: MINT,
    desc: "Conducted property access point (APN) research and performed market analysis for BPO & direct marketing services at KA-53/2, Pragati Sarani Shahjadpur, Gulshan, Dhaka.",
    stats: ["APN Research", "Market Analysis", "3 Years"],
  },
  {
    num: "03", role: "Front-End Developer", company: "Matrix Apparels Ltd.",
    period: "Jan 2021 — Aug 2021", color: PURPLE,
    desc: "Internship at 55/1 DM Ramij Uddin Road, Khilkhet. Built frontend web applications, gained proficiency in HTML, CSS, Bootstrap & JavaScript. Developed requirement analysis and teamwork skills.",
    stats: ["Internship", "HTML / CSS / JS", "Bootstrap"],
  },
];

// ─── Grain overlay ────────────────────────────────────────────────────────────

function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9996]"
      style={{
        opacity: 0.038,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  );
}

// ─── Loading screen ───────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".lc",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.6, stagger: 0.04, ease: "power4.out" }
    )
    .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, "-=0.1")
    .fromTo(subtitleRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
    .to([".lc", lineRef.current, subtitleRef.current], {
      opacity: 0, y: -16, duration: 0.35, stagger: 0.02, ease: "power3.in", delay: 0.8,
    })
    .to(ref.current, { yPercent: -100, duration: 0.85, ease: "power4.inOut", onComplete: onDone }, "-=0.1");
  }, []);

  const name = "RIDOY.DEV";

  return (
    <div ref={ref} className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-3" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(500px at 50% 50%, ${LIME}07, transparent 70%)`,
      }} />

      {/* Name */}
      <div className="flex items-center">
        {name.split("").map((c, i) => (
          <div key={i} style={{ overflow: "hidden", display: "inline-block" }}>
            <span className="lc inline-block font-['Clash_Display'] font-semibold"
              style={{ fontSize: 60, letterSpacing: "-1px", color: c === "." ? LIME : TEXT, opacity: 0 }}>
              {c}
            </span>
          </div>
        ))}
      </div>

      {/* Lime underline */}
      <div ref={lineRef} className="h-px w-28 origin-left"
        style={{ background: `linear-gradient(90deg, ${LIME}, transparent)`, transform: "scaleX(0)" }} />

      {/* Title + location */}
      <div ref={subtitleRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: MUTED }}>
          Front-End Developer
        </span>
        <span style={{ color: LIME, fontSize: 10 }}>·</span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: MUTED }}>
          Dhaka, Bangladesh
        </span>
      </div>
    </div>
  );
}

// ─── Magnetic button ──────────────────────────────────────────────────────────

function MagneticBtn({
  children, className, style, onClick, href, target,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  target?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.32, y: (e.clientY - r.top - r.height / 2) * 0.32, duration: 0.3, ease: "power2.out" });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1,0.4)" });

  const inner = (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className} style={style} onClick={onClick}>
      {children}
    </div>
  );
  if (href) return <a href={href} target={target} rel="noopener noreferrer">{inner}</a>;
  return inner;
}

// ─── Custom cursor ────────────────────────────────────────────────────────────

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      gsap.to(cursor.current, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "none" });
    };
    window.addEventListener("mousemove", onMove);
    const inters = document.querySelectorAll("a,button,[data-cursor]");
    inters.forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(cursor.current, { scale: 3.5, opacity: 0.4, duration: 0.3 }));
      el.addEventListener("mouseleave", () => gsap.to(cursor.current, { scale: 1, opacity: 1, duration: 0.3 }));
    });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={cursor}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      style={{ willChange: "transform" }}
    >
      <div className="w-5 h-5 rounded-full border" style={{ borderColor: `${LIME}80` }} />
    </div>
  );
}

// ─── Social sidebar ───────────────────────────────────────────────────────────

function SocialSidebar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      Array.from(ref.current.children),
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 2.9 }
    );
  }, []);

  const links = [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaDribbble, href: "#", label: "Dribbble" },
  ];

  return (
    <div className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center">
      <div ref={ref} className="flex flex-col items-center gap-5">
        {links.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} aria-label={label}
            className="transition-all duration-300 hover:-translate-y-0.5"
            style={{ color: MUTED, opacity: 0 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}
          >
            <Icon className="w-[15px] h-[15px]" />
          </a>
        ))}
        <div className="w-px h-20 mt-1" style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)` }} />
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 2.5 });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = ["about", "skills", "projects", "experience", "contact"];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? `${BG}e8` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
        opacity: 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between py-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1"
          style={{ color: TEXT }}
        >
          <span className="font-['Clash_Display'] font-semibold text-xl tracking-tight">
            <span style={{ color: LIME }}>M</span>R<span style={{ color: LIME }}>K</span>
          </span>
          <span className="font-mono text-[10px] tracking-widest ml-1.5 hidden sm:block" style={{ color: MUTED }}>
            ridoy.dev
          </span>
        </button>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <button key={l} onClick={() => go(l)}
              className="text-sm font-medium capitalize tracking-wide transition-colors duration-200"
              style={{ color: MUTED }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}
            >
              {l}
            </button>
          ))}
        </div>

        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mdridoyhasankamrul@gmail.com&su=Hello%20Ridoy"
          target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300"
          style={{ color: TEXT, border: "1px solid rgba(255,255,255,0.1)" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${LIME}50`; el.style.color = LIME; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = TEXT; }}
        >
          mdridoyhasankamrul@gmail.com
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: TEXT }}>
          {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-8 py-5 flex flex-col gap-5 border-t" style={{ background: BG, borderColor: "rgba(255,255,255,0.05)" }}>
          {links.map((l) => (
            <button key={l} onClick={() => go(l)} className="text-left text-sm capitalize" style={{ color: MUTED }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [spot, setSpot] = useState({ x: -9999, y: -9999 });
  const sRef = useRef<HTMLElement>(null);
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l3 = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([l1.current, l2.current, l3.current], { yPercent: 110 });
      const tl = gsap.timeline({ delay: 2.35 });
      tl.to([l1.current, l2.current, l3.current], { yPercent: 0, duration: 1.15, stagger: 0.11, ease: "power4.out" })
        .fromTo(subRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6")
        .fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.5")
        .fromTo(statsRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
        .fromTo(imgRef.current, { opacity: 0, scale: 0.94, x: 24 }, { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out" }, 0.25)
        .fromTo(".h-badge", { opacity: 0, y: 10, scale: 0.82 }, { opacity: 1, y: 0, scale: 1, stagger: 0.09, ease: "back.out(1.7)" }, "-=0.7");
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG }}
      onMouseMove={(e) => setSpot({ x: e.clientX, y: e.clientY })}
    >
      {/* Mouse spotlight */}
      <div className="absolute inset-0 pointer-events-none transition-none" style={{
        background: `radial-gradient(650px at ${spot.x}px ${spot.y}px, rgba(184,255,59,0.065), transparent 62%)`,
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.018,
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="max-w-7xl mx-auto px-8 w-full grid lg:grid-cols-12 gap-6 items-center pt-28 pb-20">
        {/* Text */}
        <div className="col-span-12 lg:col-span-7">
          {/* Availability badge */}
          <div className="flex items-center gap-3 mb-12">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: LIME }} />
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase" style={{ color: MUTED }}>
              Available for freelance · Dhaka, Bangladesh
            </span>
          </div>

          {/* Display headline — text masking reveal */}
          <div className="space-y-1 mb-10">
            {[
              { ref: l1, text: "RIDOY", gradient: false },
              { ref: l2, text: "HASAN", gradient: true },
              { ref: l3, text: "KAMRUL.", gradient: false },
            ].map(({ ref, text, gradient }) => (
              <div key={text} style={{ overflow: "hidden", lineHeight: 1 }}>
                <div
                  ref={ref}
                  className="font-['Clash_Display'] font-semibold leading-[0.92] tracking-tight"
                  style={{
                    fontSize: "clamp(52px, 8vw, 108px)",
                    ...(gradient
                      ? { background: `linear-gradient(130deg, ${LIME} 0%, ${MINT} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                      : { color: TEXT }),
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>

          <p ref={subRef} className="text-lg leading-relaxed max-w-md mb-9" style={{ color: MUTED, opacity: 0 }}>
            Front-End Developer specializing in the MERN stack — building responsive,
            user-friendly web applications with React, Next.js & modern web technologies.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <MagneticBtn
              className="cursor-pointer flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: LIME, color: BG }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work <FiArrowUpRight className="w-4 h-4" />
            </MagneticBtn>
            <a
              href={cvPdf}
              download="Md_Ridoy_Hasan_Kamrul_CV.pdf"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:opacity-70"
              style={{ color: TEXT, border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Download CV
            </a>
          </div>

          <div ref={statsRef} className="flex gap-10 mt-12 pt-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", opacity: 0 }}>
            {[["3+", "Years exp."], ["9+", "Projects"], ["B.Sc", "CSE · UITS"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-['Clash_Display'] font-semibold text-3xl" style={{ color: TEXT }}>{v}</div>
                <div className="text-xs mt-1" style={{ color: MUTED }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
          <div ref={imgRef} className="relative" style={{ opacity: 0 }}>
            {/* Lime glow under photo */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-60 h-28 rounded-full blur-3xl" style={{ background: `${LIME}18` }} />

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-12 h-12">
              <div className="absolute top-0 right-0 w-8 h-px" style={{ background: LIME }} />
              <div className="absolute top-0 right-0 w-px h-8" style={{ background: LIME }} />
            </div>
            <div className="absolute bottom-0 left-0 w-12 h-12">
              <div className="absolute bottom-0 left-0 w-8 h-px" style={{ background: LIME }} />
              <div className="absolute bottom-0 left-0 w-px h-8" style={{ background: LIME }} />
            </div>

            {/* Photo */}
            <div className="relative overflow-hidden rounded-2xl" style={{ width: "clamp(240px,22vw,340px)", aspectRatio: "3/4", boxShadow: `0 0 90px ${LIME}10` }}>
              <img
                src={developerPhoto}
                alt="Md. Ridoy Hasan Kamrul — Frontend Developer"
                className="w-full h-full object-cover object-top"
                style={{ filter: "saturate(0.9) contrast(1.05) brightness(0.92)", mixBlendMode: "luminosity" as const }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG} 8%, transparent 50%)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to left, transparent 60%, ${BG}30 100%)` }} />
            </div>

            {/* Floating tech badges */}
            {[
              { icon: SiReact,      label: "React",      color: "#61DAFB", cls: "top-6 -left-20" },
              { icon: SiNextdotjs,  label: "Next.js",    color: TEXT,      cls: "top-28 -left-24" },
              { icon: SiJavascript, label: "JavaScript",  color: "#F7DF1E", cls: "bottom-36 -left-20" },
              { icon: SiTailwindcss,label: "Tailwind",   color: "#06B6D4", cls: "top-14 -right-20" },
              { icon: SiTypescript, label: "TypeScript",  color: "#3178C6", cls: "bottom-24 -right-24" },
            ].map(({ icon: Icon, label, color, cls }) => (
              <div key={label} className={`h-badge absolute ${cls} flex items-center gap-2 px-3 py-2 rounded-xl`}
                style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", opacity: 0 }}>
                <Icon style={{ color }} className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-mono text-[11px]" style={{ color: TEXT }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
        <div className="w-px h-11 animate-pulse" style={{ background: `linear-gradient(to bottom, ${LIME}70, transparent)` }} />
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: MUTED }}>scroll</span>
      </div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const items = ["React", "TypeScript", "Next.js", "GSAP", "Figma", "WebGL", "Node.js", "GraphQL", "TailwindCSS", "Three.js", "Docker", "PostgreSQL"];

  return (
    <div className="overflow-hidden flex" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0" }}>
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-none items-center gap-10 pr-10" style={{ animation: "marquee 28s linear infinite" }}>
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3 flex-none">
              <span className="w-1 h-1 rounded-full" style={{ background: LIME }} />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase whitespace-nowrap" style={{ color: MUTED }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const sRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".abt-l", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sRef.current, start: "top 75%", once: true } });
      gsap.fromTo(".abt-r", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sRef.current, start: "top 75%", once: true } });
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sRef} id="about" className="py-36 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-5 mb-24">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: LIME }}>02 / About</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="abt-l opacity-0">
            <h2 className="font-['Clash_Display'] font-semibold leading-tight" style={{ fontSize: "clamp(30px, 4vw, 52px)", color: TEXT }}>
              "I build web experiences that don't just function —{" "}
              <span style={{ color: LIME }}>they feel inevitable.</span>"
            </h2>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[["3+", "Years"], ["9+", "Projects"], ["UITS", "B.Sc CSE"]].map(([v, l]) => (
                <div key={l} className="p-5 rounded-2xl" style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="font-['Clash_Display'] font-semibold text-3xl" style={{ color: LIME }}>{v}</div>
                  <div className="text-xs mt-1.5" style={{ color: MUTED }}>{l}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-3">
              {[
                "Front-End Developer at MAK Tech Solution via Fiverr",
                "B.Sc in CSE, UITS Dhaka — graduated 2022",
                "Open to freelance & full-time opportunities globally",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background: LIME }} />
                  <span className="text-sm leading-relaxed" style={{ color: MUTED }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="abt-r opacity-0 space-y-6">
            <p className="text-lg leading-[1.85]" style={{ color: MUTED }}>
              I'm Md. Ridoy Hasan Kamrul — a Computer Science graduate (B.Sc in CSE, UITS, Dhaka, 2022)
              specializing in the MERN stack with a strong focus on frontend development.
            </p>
            <p className="leading-[1.85]" style={{ color: MUTED }}>
              I build responsive, user-friendly web applications that deliver exceptional user
              experiences. I thrive in both team and independent environments, bringing a
              problem-solving mindset and a passion for creating impactful digital solutions.
            </p>

            {/* Education timeline */}
            <div className="mt-6 space-y-3">
              {[
                { year: "2022", degree: "B.Sc in CSE", school: "UITS, Dhaka" },
                { year: "2016", degree: "H.S.C", school: "Shaheed Ramiz Uddin Cantonment College" },
                { year: "2014", degree: "S.S.C", school: "Govt. Kalachandpur High School & College" },
              ].map((e) => (
                <div key={e.year} className="flex items-start gap-4">
                  <span className="font-mono text-[10px] tracking-widest flex-shrink-0 mt-0.5" style={{ color: LIME }}>{e.year}</span>
                  <div>
                    <span className="text-sm font-medium" style={{ color: TEXT }}>{e.degree}</span>
                    <span className="text-sm" style={{ color: MUTED }}> — {e.school}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  const sRef = useRef<HTMLElement>(null);
  const [hov, setHov] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sk-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sRef.current, start: "top 78%", once: true } });
      gsap.fromTo(".sk-orb", { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.6)", scrollTrigger: { trigger: ".sk-orb", start: "top 85%", once: true } });
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sRef} id="skills" className="py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-5 mb-24">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: LIME }}>03 / Skills</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="sk-title opacity-0">
            <h2 className="font-['Clash_Display'] font-semibold leading-tight" style={{ fontSize: "clamp(36px, 5vw, 68px)", color: TEXT }}>
              The tools I{" "}
              <span style={{ color: LIME }}>master</span>{" "}
              every day
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: MUTED }}>
              My complete frontend toolkit — from React & Next.js to Tailwind & TypeScript.
              Built through real client work, internships & production projects.
            </p>

            {/* Category legend */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[["Frontend", "#61DAFB"], ["Backend", "#8CC84B"], ["Creative", "#F24E1E"], ["Tools", "#F05032"]].map(([cat, col]) => (
                <div key={cat} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: col }} />
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: MUTED }}>{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating skill constellation */}
          <div className="relative h-[440px]">
            {SKILLS_LIST.map((skill) => (
              <div
                key={skill.name}
                className="sk-orb absolute cursor-default"
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  animation: `float ${3.2 + skill.d * 1.5}s ease-in-out infinite`,
                  animationDelay: `${skill.d}s`,
                  opacity: 0,
                }}
                onMouseEnter={() => setHov(skill.name)}
                onMouseLeave={() => setHov(null)}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-all duration-300"
                  style={{
                    background: hov === skill.name ? `${skill.color}18` : SURFACE,
                    border: `1px solid ${hov === skill.name ? skill.color + "45" : "rgba(255,255,255,0.06)"}`,
                    transform: hov === skill.name ? "scale(1.1)" : "scale(1)",
                    boxShadow: hov === skill.name ? `0 0 20px ${skill.color}25` : "none",
                  }}
                >
                  <skill.icon style={{ color: skill.color }} className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-mono text-[11px]" style={{ color: TEXT }}>{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectsSection() {
  const sRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(".pj-entry").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sRef} id="projects" className="py-36 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-5 mb-24">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: LIME }}>04 / Projects</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          <span className="font-mono text-[10px]" style={{ color: MUTED }}>Selected Work</span>
        </div>

        <div className="space-y-5">
          {PROJECTS.map((p) => (
            <div key={p.num} className="pj-entry opacity-0 group rounded-2xl overflow-hidden" style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.05)" }}>
              {/* Full-bleed image */}
              <div className="relative overflow-hidden" style={{ height: "clamp(220px, 28vw, 380px)" }}>
                <img
                  src={p.img} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ filter: "saturate(0.65) brightness(0.75)" }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 20%, ${SURFACE})` }} />

                {/* Hover overlay — links */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(6,6,12,0.55)" }}>
                  <div className="flex gap-3">
                    <a href={p.live} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
                      style={{ background: p.accent, color: BG }}>
                      Live <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a href={p.github} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-70"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                      Source <FiGithub className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Watermark number */}
                <div className="absolute top-4 left-6 font-['Clash_Display'] font-semibold" style={{ fontSize: 96, color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none" }}>
                  {p.num}
                </div>
              </div>

              {/* Project meta */}
              <div className="p-7 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] tracking-widest" style={{ color: p.accent }}>{p.num}</span>
                    <span className="font-mono text-[10px]" style={{ color: MUTED }}>{p.caption}</span>
                  </div>
                  <h3 className="font-['Clash_Display'] font-semibold" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: TEXT }}>
                    {p.title}{" "}
                    <span style={{ color: MUTED, fontWeight: 400 }}>{p.sub}</span>{" "}
                    <span style={{ color: p.accent }}>↗</span>
                  </h3>
                  <p className="mt-2.5 text-sm max-w-xl leading-relaxed" style={{ color: MUTED }}>{p.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md font-mono text-[10px]"
                      style={{ background: `${p.accent}12`, color: p.accent, border: `1px solid ${p.accent}22` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection() {
  const sRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ex-row", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: sRef.current, start: "top 76%", once: true } });
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sRef} id="experience" className="py-36 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-5 mb-24">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: LIME }}>05 / Experience</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div className="space-y-3">
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              className="ex-row opacity-0 rounded-2xl px-7 py-6 cursor-pointer transition-all duration-400"
              style={{
                background: active === i ? SURFACE : "transparent",
                border: `1px solid ${active === i ? item.color + "28" : "rgba(255,255,255,0.04)"}`,
              }}
              onClick={() => setActive(i)}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Index */}
                <div className="col-span-1">
                  <span className="font-['Clash_Display'] font-semibold text-5xl transition-all duration-300"
                    style={{ color: active === i ? item.color : "rgba(255,255,255,0.08)" }}>
                    {item.num}
                  </span>
                </div>

                {/* Role + Company */}
                <div className="col-span-12 sm:col-span-4">
                  <div className="font-mono text-[10px] tracking-widest mb-1 transition-colors duration-300"
                    style={{ color: active === i ? item.color : MUTED }}>
                    {item.company}
                  </div>
                  <h3 className="font-['Clash_Display'] font-semibold text-lg" style={{ color: TEXT }}>{item.role}</h3>
                </div>

                {/* Period */}
                <div className="col-span-6 sm:col-span-2">
                  <span className="font-mono text-xs" style={{ color: MUTED }}>{item.period}</span>
                </div>

                {/* Stats */}
                <div className="col-span-6 sm:col-span-5 flex flex-wrap gap-2 justify-end">
                  {item.stats.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md font-mono text-[10px] transition-all duration-300"
                      style={{
                        background: active === i ? `${item.color}12` : "rgba(255,255,255,0.04)",
                        color: active === i ? item.color : MUTED,
                        border: `1px solid ${active === i ? item.color + "22" : "rgba(255,255,255,0.04)"}`,
                      }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable desc */}
              {active === i && (
                <div className="mt-5" style={{ paddingLeft: "calc(8.33% + 16px)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{item.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CV link */}
        <div className="mt-10 flex justify-start pl-[calc(8.33%+28px)]">
          <a href={cvPdf} download="Md_Ridoy_Hasan_Kamrul_CV.pdf" className="flex items-center gap-2 text-sm transition-all duration-300 group"
            style={{ color: MUTED }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}>
            Download full résumé
            <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const sRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ct-inner", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sRef.current, start: "top 80%", once: true } });
    }, sRef);
    return () => ctx.revert();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:mdridoyhasankamrul@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section ref={sRef} id="contact" className="py-36 relative">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${LIME}25, transparent)` }} />

      <div className="max-w-7xl mx-auto px-8">
        <div className="ct-inner opacity-0 grid lg:grid-cols-2 gap-20 items-start">
          {/* Left — Large CTA */}
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: LIME }}>06 / Contact</span>
            <h2 className="font-['Clash_Display'] font-semibold mt-6 leading-[0.9]" style={{ fontSize: "clamp(52px, 8vw, 100px)", color: TEXT }}>
              Let's
              <br />
              <span style={{ color: LIME }}>build</span>
              <br />
              something.
            </h2>

            <p className="mt-8 leading-relaxed" style={{ color: MUTED, maxWidth: 380 }}>
              Computer Science graduate specializing in MERN stack — available for freelance
              projects via Fiverr and open to full-time opportunities globally.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: FiMail,  label: "Email",    value: "mdridoyhasankamrul@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=mdridoyhasankamrul@gmail.com&su=Hello%20Ridoy" },
                { icon: FiPhone, label: "Phone",    value: "+880 1680 092066",              href: "tel:+8801680092066" },
                { icon: FiMapPin,label: "Location", value: "Dhaka, Bangladesh",             href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${LIME}12`, border: `1px solid ${LIME}25` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: LIME }} />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-widest uppercase mb-0.5" style={{ color: MUTED }}>{label}</div>
                    {href ? (
                      <a href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors duration-200"
                        style={{ color: TEXT }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LIME; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm" style={{ color: TEXT }}>{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={submit} className="p-8 rounded-2xl space-y-5" style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="grid sm:grid-cols-2 gap-5">
              {[["name", "Name", "Your name"], ["email", "Email", "you@company.com"]].map(([key, lbl, ph]) => (
                <div key={key}>
                  <label className="block font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: MUTED }}>{lbl}</label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={ph}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: BG, border: "1px solid rgba(255,255,255,0.06)", color: TEXT }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = `${LIME}40`; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: MUTED }}>Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, timeline, and budget..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                style={{ background: BG, border: "1px solid rgba(255,255,255,0.06)", color: TEXT }}
                onFocus={(e) => { (e.target as HTMLElement).style.borderColor = `${LIME}40`; }}
                onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
              style={{ background: LIME, color: BG }}
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedinIn, href: "https://linkedin.com/in/md-ridoy-hasan-kamrul", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
  ];
  return (
    <footer className="py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Top row: logo + social icons centered */}
        <div className="flex flex-col items-center gap-4 mb-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-1">
            <div className="font-['Clash_Display'] font-semibold text-2xl tracking-tight" style={{ color: TEXT }}>
              <span style={{ color: LIME }}>M</span>R<span style={{ color: LIME }}>K</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: MUTED }}>
              Md. Ridoy Hasan Kamrul
            </div>
          </div>
          {/* Social icons — centered, clear of FAB */}
          <div className="flex items-center gap-6">
            {links.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="transition-all duration-300 hover:-translate-y-0.5"
                style={{ color: MUTED }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LIME; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {/* Bottom row: copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: MUTED }}>
            Front-End Developer · MERN Stack
          </p>
          <p className="text-xs" style={{ color: MUTED }}>
            © {new Date().getFullYear()} Md. Ridoy Hasan Kamrul. All rights reserved.
          </p>
          <p className="font-mono text-[10px]" style={{ color: MUTED }}>
            Built with React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────

function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);
  const fabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!fabRef.current) return;
    gsap.fromTo(fabRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 3 });
  }, []);

  return (
    <a
      ref={fabRef}
      href="https://wa.me/8801680092066"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-36 right-6 z-[99998] flex flex-row-reverse items-center"
      style={{ opacity: 0 }}
    >
      <div className="ml-3 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300"
        style={{
          background: SURFACE, border: "1px solid rgba(37,211,102,0.3)", color: TEXT,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0) scale(1)" : "translateX(8px) scale(0.95)",
        }}>
        Chat with me
      </div>
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366]/25 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #128C7E, #25D366)",
            boxShadow: hovered ? "0 8px 32px rgba(37,211,102,0.5)" : "0 4px 20px rgba(37,211,102,0.3)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}>
          <FaWhatsapp className="w-7 h-7 text-white" />
        </div>
      </div>
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      body { font-family: 'Inter', sans-serif; background: ${BG}; color: ${TEXT}; scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: ${BG}; }
      ::-webkit-scrollbar-thumb { background: ${LIME}35; border-radius: 99px; }
      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh", overflowX: "hidden" }}>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <GrainOverlay />
      <CustomCursor />
      <Toaster />
      <SocialSidebar />
      <Navbar />
      <WhatsAppFAB />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
