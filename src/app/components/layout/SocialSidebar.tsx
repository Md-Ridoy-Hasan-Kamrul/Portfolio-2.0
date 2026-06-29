import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { BODY, TEXT } from "../../constants/theme";
import { GITHUB_HREF, LINKEDIN_HREF, FACEBOOK_HREF, WHATSAPP_HREF } from "../../constants/site";

export function SocialSidebar() {
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
    { icon: FiGithub, href: GITHUB_HREF, label: "GitHub" },
    { icon: FaLinkedinIn, href: LINKEDIN_HREF, label: "LinkedIn" },
    { icon: FaFacebookF, href: FACEBOOK_HREF, label: "Facebook" },
    { icon: FaWhatsapp, href: WHATSAPP_HREF, label: "WhatsApp" },
  ];

  return (
    <div className="fixed left-6 bottom-0 z-40 hidden 2xl:flex flex-col items-center">
      <div ref={ref} className="flex flex-col items-center gap-5">
        {links.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="transition-all duration-300 hover:-translate-y-0.5"
            style={{ color: BODY, opacity: 0 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = BODY; }}
          >
            <Icon className="w-[15px] h-[15px]" />
          </a>
        ))}
        <div className="w-px h-20 mt-1" style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)` }} />
      </div>
    </div>
  );
}
