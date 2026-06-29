import gsap from "gsap";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { BG, LIME, TEXT, BODY } from "../../constants/theme";
import { GITHUB_HREF, LINKEDIN_HREF, FACEBOOK_HREF, WHATSAPP_HREF } from "../../constants/site";

export function Footer({ footerRef }: { footerRef: React.RefObject<HTMLElement> }) {
  const links = [
    { icon: FiGithub, href: GITHUB_HREF, label: "GitHub", color: "#ffffff" },
    { icon: FaLinkedinIn, href: LINKEDIN_HREF, label: "LinkedIn", color: "#0A66C2" },
    { icon: FaFacebookF, href: FACEBOOK_HREF, label: "Facebook", color: "#1877F2" },
    { icon: FaWhatsapp, href: WHATSAPP_HREF, label: "WhatsApp", color: "#25D366" },
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
              <span style={{ color: LIME }}>M</span>R<span style={{ color: LIME }}>H</span>K
            </div>
            <div className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: BODY }}>
              Md.Ridoy Hasan Kamrul
            </div>
          </div>
          <div className="flex items-center gap-6">
            {links.map(({ icon: Icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ color: BODY }}
                onMouseEnter={(e) => { gsap.to(e.currentTarget, { scale: 1.35, y: -4, color, duration: 0.35, ease: "back.out(2.5)" }); }}
                onMouseLeave={(e) => { gsap.to(e.currentTarget, { scale: 1, y: 0, color: BODY, duration: 0.4, ease: "power2.out" }); }}>
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
