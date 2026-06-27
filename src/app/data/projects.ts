import { LIME, MINT, PURPLE } from "../constants/theme";

export const PROJECTS = [
  {
    num: "01", title: "Q Global Living", sub: "Real Estate Platform",
    caption: "Full-Stack Marketplace · Next.js 16",
    desc: "Full-stack real estate marketplace with internationalization (EN/FR), property listings, event registration, admin dashboards, and escrow-protected transactions. React Compiler compliant with custom auth flows for admin/client/partner roles.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "i18n"],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=780&fit=crop&auto=format",
    live: "https://qhomes.mtscorporate.com/en", github: "#", accent: LIME,
  },
  {
    num: "02", title: "CoorDeck", sub: "Technologies",
    caption: "Temporary Works Management · Next.js 14",
    desc: "90+ Lighthouse score site built pixel-perfectly from a Figma design. Full SEO, WCAG 2.1 AA accessibility, and Framer Motion animations throughout.",
    tags: ["Next.js 14", "TypeScript", "Framer Motion", "WCAG 2.1"],
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&h=780&fit=crop&auto=format",
    live: "https://alex-coordinate.vercel.app", github: "#", accent: MINT,
  },
  {
    num: "03", title: "TherellWalker", sub: "Trading Journal",
    caption: "Performance Analytics · React 19",
    desc: "Trading journal platform with Context API state management, localStorage trade logging, real-time P&L calculations, Recharts analytics dashboard (equity curves, win rates), and rotating reflection prompts for trading psychology.",
    tags: ["React 19", "Tailwind CSS", "Recharts", "Context API"],
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&h=780&fit=crop&auto=format",
    live: "https://myledger.mtscorporate.com/", github: "#", accent: PURPLE,
  },
  {
    num: "04", title: "Layls", sub: "E-commerce Platform",
    caption: "Auth & Shopping · Next.js",
    desc: "E-commerce platform with complete authentication — Google Auth 2.0, WhatsApp/Email OTP for sign-up, login & recovery. Secure password toggle and login-gated content.",
    tags: ["Next.js", "Google Auth 2.0", "OTP", "E-commerce"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=780&fit=crop&auto=format",
    live: "https://www.layls.com", github: "#", accent: "#F59E0B",
  },
];
