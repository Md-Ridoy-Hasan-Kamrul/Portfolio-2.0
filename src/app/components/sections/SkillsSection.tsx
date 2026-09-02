import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SKILL_CATEGORIES } from "../../data/skills";
import { LIME, SURFACE, TEXT, BODY } from "../../constants/theme";
import { useSectionSpacing } from "../../hooks/useSectionSpacing";

export function SkillsSection() {
  const sRef = useRef<HTMLElement>(null);
  const { py, mb } = useSectionSpacing();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sk-head",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sRef.current, start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        ".sk-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".sk-list", start: "top 84%", once: true },
        }
      );
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sRef}
      id="skills"
      className="relative"
      style={{ paddingTop: py, paddingBottom: py }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5" style={{ marginBottom: mb }}>
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: LIME }}>
            02 / Skills
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div className="sk-head opacity-0 mb-10 lg:mb-12 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-16 items-end">
          <div>
            <h2
              className="font-['Clash_Display'] font-semibold leading-tight text-4xl sm:text-5xl lg:text-6xl"
              style={{ color: TEXT }}
            >
              Technical <span style={{ color: LIME }}>expertise</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: BODY }}>
              Production-ready frontend stack used across live client projects
              from UI architecture to deployment.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-1">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: BODY }}>
              Categories
            </span>
            <span className="font-['Clash_Display'] font-semibold text-3xl" style={{ color: TEXT }}>
              0{SKILL_CATEGORIES.length}
            </span>
          </div>
        </div>

        <div className="sk-list space-y-3">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className="sk-row opacity-0 group rounded-2xl px-5 sm:px-7 py-5 sm:py-6 transition-all duration-400"
              style={{
                background: SURFACE,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${cat.accent}35`;
                el.style.background = `linear-gradient(105deg, ${cat.accent}0a, ${SURFACE} 42%)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.05)";
                el.style.background = SURFACE;
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[9rem_1fr] lg:grid-cols-[10.5rem_1fr] gap-4 md:gap-8 md:items-start">
                {/* Category label */}
                <div className="flex md:flex-col md:pt-1 gap-3 md:gap-2 items-center md:items-start">
                  <span
                    className="font-mono text-[10px] tracking-[0.25em] uppercase"
                    style={{ color: cat.accent }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="font-['Clash_Display'] font-semibold text-lg sm:text-xl leading-tight"
                    style={{ color: TEXT }}
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Skills */}
                <div>
                  <p className="mb-3 text-xs sm:text-sm" style={{ color: BODY }}>
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => {
                      const Icon = skill.icon;
                      const col = skill.color ?? cat.accent;
                      return (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all duration-250"
                          style={{
                            color: TEXT,
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = `${col}55`;
                            el.style.background = `${col}12`;
                            el.style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "rgba(255,255,255,0.07)";
                            el.style.background = "rgba(255,255,255,0.03)";
                            el.style.transform = "none";
                          }}
                        >
                          {Icon && (
                            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: col }} />
                          )}
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
