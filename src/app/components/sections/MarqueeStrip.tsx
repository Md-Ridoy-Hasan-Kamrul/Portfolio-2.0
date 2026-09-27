import { SKILL_CATEGORIES } from "../../data/skills";
import { LIME, BODY } from "../../constants/theme";

const ITEMS = SKILL_CATEGORIES.flatMap((cat) => cat.skills.map((skill) => skill.name));

export function MarqueeStrip() {
  const duration = `${ITEMS.length * 2.2}s`;

  return (
    <div
      className="overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0" }}
    >
      <style>{`
        @keyframes skill-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
      <div
        className="flex w-max"
        style={{ animation: `skill-marquee ${duration} linear infinite` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
            {ITEMS.map((item) => (
              <div key={`${copy}-${item}`} className="flex shrink-0 items-center gap-3 pl-10">
                <span className="w-1 h-1 shrink-0 rounded-full" style={{ background: LIME }} />
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.28em]" style={{ color: BODY }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
