import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMenu, FiX } from "react-icons/fi";
import { BG, LIME, TEXT, BODY } from "../../constants/theme";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "../../constants/site";

export function Navbar() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1"
          style={{ color: TEXT }}
        >
          <span className="font-['Clash_Display'] font-semibold text-xl tracking-tight">
            <span style={{ color: LIME }}>M</span>R<span style={{ color: LIME }}>K</span>
          </span>
          <span className="font-mono text-xs tracking-widest ml-1.5 hidden sm:block" style={{ color: BODY }}>
            ridoy.dev
          </span>
        </button>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <button key={l} onClick={() => go(l)}
              className="text-sm font-medium capitalize tracking-wide transition-colors duration-200"
              style={{ color: BODY }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = BODY; }}
            >
              {l}
            </button>
          ))}
        </div>

        <a href={CONTACT_EMAIL_HREF}
          target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300"
          style={{ color: TEXT, border: "1px solid rgba(255,255,255,0.1)" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${LIME}50`; el.style.color = LIME; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = TEXT; }}
        >
          {CONTACT_EMAIL}
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: TEXT }}>
          {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5 border-t" style={{ background: BG, borderColor: "rgba(255,255,255,0.05)" }}>
          {links.map((l) => (
            <button key={l} onClick={() => go(l)} className="text-left text-sm capitalize" style={{ color: BODY }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
