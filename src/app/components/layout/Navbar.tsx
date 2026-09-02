import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMenu, FiX, FiMail } from "react-icons/fi";
import { BG, LIME, TEXT, BODY } from "../../constants/theme";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "../../constants/site";

/** Same order as reference navbar: Skill → Experiences → Projects → About → Contact */
const NAV_LINKS = [
  { id: "skills", label: "Skill", num: "02" },
  { id: "experience", label: "Experiences", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "about", label: "About", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 });
    gsap.fromTo(tagRef.current, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "power4.out", delay: 0.5 });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!linksRef.current) return;
    const items = linksRef.current.children;
    if (open) {
      gsap.fromTo(items, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out", delay: 0.1 });
    } else {
      gsap.set(items, { opacity: 0, y: 16 });
    }
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const linkBtn = (id: string, label: string, className = "") => (
    <button
      key={id}
      type="button"
      onClick={() => go(id)}
      className={`text-sm font-medium tracking-wide transition-colors duration-200 ${className}`}
      style={{ color: TEXT }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LIME; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
    >
      {label}
    </button>
  );

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between py-5">
        {/* Logo — MR lime, HK white, kamrul.dev mono */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 shrink-0 z-10"
          style={{ color: TEXT }}
        >
          <span className="font-['Clash_Display'] font-semibold text-xl tracking-tight leading-none">
            <span style={{ color: LIME }}>MR</span>
            <span style={{ color: TEXT }}>HK</span>
          </span>
          <span className="hidden sm:inline-block overflow-hidden">
            <span ref={tagRef} className="inline-block font-mono text-xs tracking-widest" style={{ color: BODY }}>
              kamrul.dev
            </span>
          </span>
        </button>

        {/* Center nav — portfolio section flow */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:gap-10 xl:gap-14">
          {NAV_LINKS.map(({ id, label }) => linkBtn(id, label))}
        </div>

        {/* Email pill */}
        <a
          href={CONTACT_EMAIL_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center shrink-0 z-10 text-xs lg:text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap"
          style={{ color: TEXT, border: "1px solid rgba(255,255,255,0.12)" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = `${LIME}50`;
            el.style.color = LIME;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.12)";
            el.style.color = TEXT;
          }}
        >
          {CONTACT_EMAIL}
        </a>

        <button type="button" className="md:hidden z-10" onClick={() => setOpen(!open)} style={{ color: TEXT }}>
          {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu — same section order */}
      <div
        className="md:hidden grid"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 300ms ease" }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div
            ref={linksRef}
            className="px-4 sm:px-6 py-8 flex flex-col items-center gap-2 border-t"
            style={{ background: BG, borderColor: "rgba(255,255,255,0.05)" }}
          >
            {NAV_LINKS.map(({ id, label, num }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className="flex items-center gap-3 px-6 py-3 rounded-full text-xl font-medium tracking-wide transition-all duration-300"
                style={{ color: BODY, opacity: 0 }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = LIME;
                  el.style.background = `${LIME}12`;
                  el.style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = BODY;
                  el.style.background = "transparent";
                  el.style.transform = "scale(1)";
                }}
              >
                <span className="font-mono text-xs" style={{ color: LIME }}>
                  {num}
                </span>
                {label}
              </button>
            ))}
            <a
              href={CONTACT_EMAIL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{ color: TEXT, border: "1px solid rgba(255,255,255,0.12)", opacity: 0 }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${LIME}50`;
                el.style.color = LIME;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.color = TEXT;
              }}
            >
              <FiMail className="w-4 h-4" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
