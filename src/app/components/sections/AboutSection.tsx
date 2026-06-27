import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LIME, SURFACE, TEXT, BODY } from "../../constants/theme";

export function AboutSection() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5 mb-24">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: LIME }}>02 / About</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="abt-l opacity-0">
            <h2 className="font-['Clash_Display'] font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl" style={{ color: TEXT }}>
              "I build web experiences that don't just function —{" "}
              <span style={{ color: LIME }}>they feel inevitable.</span>"
            </h2>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[["3+", "Years"], ["9+", "Projects"], ["UITS", "B.Sc CSE"]].map(([v, l]) => (
                <div key={l} className="p-5 rounded-2xl" style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="font-['Clash_Display'] font-semibold text-3xl" style={{ color: LIME }}>{v}</div>
                  <div className="text-xs mt-1.5" style={{ color: BODY }}>{l}</div>
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
                  <span className="text-base leading-relaxed" style={{ color: BODY }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="abt-r opacity-0 space-y-6">
            <p className="text-base sm:text-lg leading-[1.85]" style={{ color: BODY }}>
              I'm Md. Ridoy Hasan Kamrul — a Computer Science graduate (B.Sc in CSE, UITS, Dhaka, 2022)
              specializing in the MERN stack with a strong focus on frontend development.
            </p>
            <p className="text-base sm:text-lg leading-[1.85]" style={{ color: BODY }}>
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
                  <span className="font-mono text-xs tracking-widest flex-shrink-0 mt-0.5" style={{ color: LIME }}>{e.year}</span>
                  <div>
                    <span className="text-base font-medium" style={{ color: TEXT }}>{e.degree}</span>
                    <span className="text-base" style={{ color: BODY }}> — {e.school}</span>
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
