import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { FiGithub, FiShare2 } from "react-icons/fi";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { GITHUB_HREF, LINKEDIN_HREF, FACEBOOK_HREF, WHATSAPP_HREF } from "../../constants/site";

const SHELL = "rgb(36, 36, 36)";
const SHADOW = "6px 6px 12px 0px rgb(31, 31, 31), -6px -6px 12px 0px rgb(41, 41, 41)";
const INSET = "inset 6px 6px 12px 0px rgb(31, 31, 31), inset -6px -6px 12px 0px rgb(41, 41, 41)";

const LINKS = [
  { icon: FiGithub, href: GITHUB_HREF, label: "GitHub" },
  { icon: FaLinkedinIn, href: LINKEDIN_HREF, label: "LinkedIn" },
  { icon: FaFacebookF, href: FACEBOOK_HREF, label: "Facebook" },
  { icon: FaWhatsapp, href: WHATSAPP_HREF, label: "WhatsApp" },
] as const;

function NeoButton({
  label,
  children,
  href,
}: {
  label: string;
  children: ReactNode;
  href?: string;
}) {
  const [pressed, setPressed] = useState(false);
  const className =
    "flex h-[52px] w-[52px] items-center justify-center rounded-[20px] text-[#ededed] transition-[box-shadow,color,transform] duration-300";
  const style = { background: SHELL, boxShadow: pressed ? INSET : SHADOW };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
        style={style}
        onMouseEnter={() => setPressed(true)}
        onMouseLeave={() => setPressed(false)}
        onFocus={() => setPressed(true)}
        onBlur={() => setPressed(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" aria-label={label} className={`${className} cursor-pointer`} style={style}>
      {children}
    </button>
  );
}

export function SocialSidebar() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: 2.9 });
  }, []);

  return (
    <div ref={ref} className="fixed bottom-0 left-6 z-40 hidden flex-col items-center 2xl:flex" style={{ opacity: 0 }}>
      <div
        className="flex flex-col-reverse items-center p-1.5 transition-[gap] duration-500"
        style={{
          background: SHELL,
          borderRadius: 26,
          boxShadow: SHADOW,
          gap: open ? 10 : 0,
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <NeoButton label={open ? "Social links" : "Open social links"}>
          <FiShare2 className="h-5 w-5" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.35s ease" }} />
        </NeoButton>

        <div
          className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ maxHeight: open ? 260 : 0 }}
        >
          <div className="flex flex-col items-center gap-2.5 pb-0.5">
              {LINKS.map(({ icon: Icon, href, label }) => (
                <NeoButton key={label} href={href} label={label}>
                  <Icon className="h-5 w-5" />
                </NeoButton>
              ))}
            </div>
          </div>
        </div>

      <div className="mt-1 h-16 w-px" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)" }} />
    </div>
  );
}
