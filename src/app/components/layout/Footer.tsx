import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { BG, LIME, TEXT, BODY } from "../../constants/theme";
import { LINKEDIN_HREF } from "../../constants/site";

export function Footer({ footerRef }: { footerRef: React.RefObject<HTMLElement> }) {
  const links = [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedinIn, href: LINKEDIN_HREF, label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer
      ref={footerRef}
      className="fixed bottom-0 inset-x-0 z-0 py-8"
      style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="font-['Clash_Display'] font-semibold text-2xl tracking-tight" style={{ color: TEXT }}>
              <span style={{ color: LIME }}>M</span>R<span style={{ color: LIME }}>K</span>
            </div>
            <div className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: BODY }}>
              Md. Ridoy Hasan Kamrul
            </div>
          </div>
          <div className="flex items-center gap-6">
            {links.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="transition-all duration-300 hover:-translate-y-0.5"
                style={{ color: BODY }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LIME; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = BODY; }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: BODY }}>
            Front-End Developer · MERN Stack
          </p>
          <p className="text-xs" style={{ color: BODY }}>
            © {new Date().getFullYear()} Md. Ridoy Hasan Kamrul. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: BODY }}>
            Built with React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
