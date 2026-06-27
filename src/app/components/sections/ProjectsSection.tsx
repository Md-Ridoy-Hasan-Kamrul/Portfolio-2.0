import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { PROJECTS } from "../../data/projects";
import { BG, LIME, SURFACE, TEXT, BODY } from "../../constants/theme";

export function ProjectsSection() {
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
    <section ref={sRef} id="projects" className="relative" style={{ paddingTop: "clamp(4rem, 3rem + 5vw, 9rem)", paddingBottom: "clamp(4rem, 3rem + 5vw, 9rem)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5" style={{ marginBottom: "clamp(2.5rem, 1.7rem + 3.6vw, 6rem)" }}>
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: LIME }}>04 / Projects</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          <span className="font-mono text-xs" style={{ color: BODY }}>Selected Work</span>
        </div>

        <div className="space-y-5">
          {PROJECTS.map((p) => (
            <div key={p.num} className="pj-entry opacity-0 group rounded-2xl overflow-hidden" style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="relative overflow-hidden" style={{ height: "clamp(220px, 28vw, 380px)" }}>
                <img
                  src={p.img} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ filter: "saturate(0.65) brightness(0.75)" }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 20%, ${SURFACE})` }} />

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

                <div className="absolute top-4 left-6 font-['Clash_Display'] font-semibold" style={{ fontSize: 96, color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none" }}>
                  {p.num}
                </div>
              </div>

              <div className="p-7 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs tracking-widest" style={{ color: p.accent }}>{p.num}</span>
                    <span className="font-mono text-xs" style={{ color: BODY }}>{p.caption}</span>
                  </div>
                  <h3 className="font-['Clash_Display'] font-semibold text-xl sm:text-2xl lg:text-3xl" style={{ color: TEXT }}>
                    {p.title}{" "}
                    <span style={{ color: BODY, fontWeight: 400 }}>{p.sub}</span>{" "}
                    <span style={{ color: p.accent }}>↗</span>
                  </h3>
                  <p className="mt-2.5 text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: BODY }}>{p.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md font-mono text-xs"
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
