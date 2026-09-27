import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LIME, MINT, TEXT } from "../../constants/theme";
import { scrollToId, scrollToTop } from "../../hooks/useLenis";

/** Liquid Gold Navbar layout: four links + enquire CTA */
const NAV_LINKS = [
  { id: "skills", label: "Skill" },
  { id: "experience", label: "Experiences" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
] as const;

const CREAM = "rgb(245, 238, 224)";
const INK = "rgb(13, 11, 9)";
const WORDMARK = [
  { ch: "M", accent: true },
  { ch: "R", accent: false },
  { ch: "H", accent: true },
  { ch: "K", accent: false },
] as const;

function RollLabel({
  label,
  className,
  hoverClass,
}: {
  label: string;
  className: string;
  hoverClass: string;
}) {
  return (
    <span className="relative block h-[11px] overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[11px]">
        <span className={`block h-[11px] leading-[11px] whitespace-nowrap ${className}`}>{label}</span>
        <span aria-hidden className={`block h-[11px] leading-[11px] whitespace-nowrap ${hoverClass}`}>{label}</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.35 }
    );
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  const radius = open ? 31 : 100;

  return (
    <nav
      ref={navRef}
      className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4"
      style={{ opacity: 0 }}
    >
      <style>{`
        @keyframes lg-gold-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .lg-gold-spin {
          animation: lg-gold-spin 8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .lg-gold-spin { animation: none; }
        }
      `}</style>

      <div
        ref={shellRef}
        onMouseMove={onMove}
        className="relative w-full max-w-[700px] p-[2px] overflow-hidden transition-[border-radius] duration-500"
        style={{
          borderRadius: radius,
          background: `linear-gradient(180deg, #3d6b16 0%, #14240c 55%, #4a8a1c 100%)`,
          boxShadow: `0px 14px 60px 0px ${LIME}4d, 0px 2px 12px 0px rgba(0, 0, 0, 0.35)`,
          ["--gx" as string]: "50%",
          ["--gy" as string]: "0px",
        }}
      >
        <div
          className="lg-gold-spin pointer-events-none absolute left-1/2 top-1/2 h-[240%] w-[240%]"
          style={{
            background: `conic-gradient(from 0deg, #1c3d12, #3d7a18, ${LIME}, #e8ffc4, ${MINT}, ${LIME}, #3d7a18, #1c3d12)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(110px circle at var(--gx) var(--gy), ${LIME}f2, transparent 62%)`,
          }}
        />

        <div
          className="relative z-[1] overflow-hidden transition-[border-radius] duration-500"
          style={{ background: INK, borderRadius: open ? 29 : 100 }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(120px 36px at var(--gx) 0px, ${LIME}57, transparent 70%)`,
            }}
          />

          <div className="relative flex items-center justify-between min-h-[60px] pl-6 lg:pl-7 pr-2.5 py-2.5">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                scrollToTop();
              }}
              className="cursor-pointer shrink-0"
              aria-label="Back to top"
            >
              <span
                className="flex select-none italic font-medium text-[22px] lg:text-[24px] leading-none"
                style={{ fontFamily: '"Bodoni Moda", serif' }}
              >
                {WORDMARK.map(({ ch, accent }) => (
                  <span
                    key={ch}
                    style={accent ? { color: LIME } : { color: TEXT }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5">
              {NAV_LINKS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  className="group cursor-pointer px-2.5 py-3.5"
                >
                  <RollLabel
                    label={label}
                    className="font-medium uppercase text-[11px] tracking-[1.6px] text-[rgba(245,238,224,0.55)]"
                    hoverClass="font-medium uppercase text-[11px] tracking-[1.6px] text-[#fffaf0]"
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go("contact")}
                className="group cursor-pointer hidden lg:flex items-center rounded-full px-5 py-3 transition-colors duration-500"
                style={{ background: CREAM }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = LIME;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = CREAM;
                }}
              >
                <RollLabel
                  label="Enquire"
                  className="font-semibold uppercase text-[11px] tracking-[1.4px] text-[#14100b]"
                  hoverClass="font-semibold uppercase text-[11px] tracking-[1.4px] text-[#120e09]"
                />
              </button>

              <button
                type="button"
                className="lg:hidden relative cursor-pointer w-10 h-10 rounded-full"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                style={{ background: open ? "rgba(245, 238, 224, 0.14)" : "rgba(245, 238, 224, 0.08)" }}
              >
                <span
                  className="absolute left-3 h-0.5 w-4 rounded-sm origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    background: CREAM,
                    top: 19,
                    transform: open ? "rotate(45deg)" : "translateY(-3px)",
                  }}
                />
                <span
                  className="absolute left-3 h-0.5 w-4 rounded-sm origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    background: CREAM,
                    top: 19,
                    transform: open ? "rotate(-45deg)" : "translateY(3px)",
                  }}
                />
              </button>
            </div>
          </div>

          <div
            className="lg:hidden overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ maxHeight: open ? 320 : 0 }}
          >
            <div>
              <div className="flex flex-col px-[18px] pt-1.5 pb-[26px]">
                {NAV_LINKS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    className="cursor-pointer py-2.5 text-left font-medium uppercase text-[15px] tracking-[1.4px] transition-colors duration-300"
                    style={{ color: "rgba(245, 238, 224, 0.6)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fffaf0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(245, 238, 224, 0.6)";
                    }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="cursor-pointer mt-3 self-start rounded-full px-5 py-3 font-semibold uppercase text-[11px] tracking-[1.4px] transition-colors duration-500"
                  style={{ background: CREAM, color: "rgb(20, 16, 11)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = LIME;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = CREAM;
                  }}
                >
                  Enquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
