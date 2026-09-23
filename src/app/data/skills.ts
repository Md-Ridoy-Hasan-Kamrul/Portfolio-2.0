import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiRedux,
  SiReactrouter,
  SiAxios,
  SiPostman,
  SiJest,
  SiGit,
  SiGithub,
  SiVite,
  SiWebpack,
  SiFigma,
  SiVercel,
  SiRailway,
  SiAstro,
  SiSvelte,
  SiVuedotjs,
  SiReactquery,
  SiVitest,
  SiTestinglibrary,
} from "react-icons/si";
import {
  FiZap,
  FiGlobe,
  FiEye,
  FiSearch,
  FiLayers,
  FiUsers,
  FiLayout,
  FiMessageSquare,
  FiServer,
  FiCloud,
  FiCode,
  FiBox,
  FiTarget,
  FiAward,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { LIME, MINT, PURPLE } from "../constants/theme";

export type SkillItem = {
  name: string;
  icon?: IconType;
  color?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  accent: string;
  description: string;
  skills: SkillItem[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    accent: LIME,
    description: "Modern UI stacks for production client apps",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#42B883" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Astro 7", icon: SiAstro, color: "#FF5D01" },
      { name: "Svelte 5", icon: SiSvelte, color: "#FF3E00" },
      { name: "Lenis", icon: FiCode, color: "#A3E635" },
      { name: "JavaScript (ES6+)", icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#264DE4" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
      { name: "Responsive Design", icon: FiLayout, color: "#06B6D4" },
      { name: "Component-Based Architecture", icon: FiLayers, color: LIME },
    ],
  },
  {
    id: "apis",
    title: "State & API Integration",
    accent: "#38BDF8",
    description: "Client state, data flows, and API tooling",
    skills: [
      { name: "REST APIs", icon: FiServer, color: "#38BDF8" },
      { name: "Axios", icon: SiAxios, color: "#5A29E4" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "TanStack Query", icon: SiReactquery, color: "#FF4154" },
      { name: "Zustand", icon: FiBox, color: "#F59E0B" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    id: "performance",
    title: "Performance & Testing",
    accent: MINT,
    description: "Speed, accessibility, SEO, and test coverage",
    skills: [
      { name: "Lighthouse", icon: FiZap, color: MINT },
      { name: "Web Performance Optimization", icon: FiZap, color: "#FBBF24" },
      { name: "Accessibility", icon: FiEye, color: "#A78BFA" },
      { name: "SEO", icon: FiSearch, color: "#34D399" },
      { name: "Cross-Browser Compatibility", icon: FiGlobe, color: "#60A5FA" },
      { name: "Unit Testing (Jest)", icon: SiJest, color: "#C21325" },
      { name: "Vitest", icon: SiVitest, color: "#729B1B" },
      { name: "Playwright", icon: SiTestinglibrary, color: "#2EAD33" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Deployment",
    accent: "#FB923C",
    description: "Build, ship, and collaborate end-to-end",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "Webpack", icon: SiWebpack, color: "#8DD6F9" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "Coolify", icon: FiCloud, color: "#3B82F6" },
      { name: "Railway", icon: SiRailway, color: "#ffffff" },
      { name: "CI/CD", icon: FiLayers, color: "#FB923C" },
    ],
  },
  {
    id: "methodologies",
    title: "Soft Skills & Methodologies",
    accent: PURPLE,
    description: "Process and collaboration for client delivery",
    skills: [
      { name: "Problem-Solving", icon: FiTarget, color: "#F472B6" },
      { name: "Agile", icon: FiUsers, color: PURPLE },
      { name: "Team Collaboration", icon: FiUsers, color: "#38BDF8" },
      { name: "Communication", icon: FiMessageSquare, color: "#A78BFA" },
      { name: "Client Requirement Analysis", icon: FiAward, color: "#F472B6" },
    ],
  },
];

/** Featured chips for compact / orbit-style displays */
export const SKILLS_LIST = SKILL_CATEGORIES.flatMap((cat) =>
  cat.skills
    .filter((s) => s.icon)
    .slice(0, cat.id === "frontend" ? 11 : 3)
    .map((s, i) => ({
      name: s.name.split(" ")[0].replace(".js", "").replace("(ES6+)", "JS"),
      icon: s.icon!,
      color: s.color ?? LIME,
      x: 8 + ((i * 17) % 80),
      y: 8 + ((i * 23) % 75),
      d: (i % 10) * 0.1,
    }))
);
