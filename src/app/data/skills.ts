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
} from "react-icons/si";
import { FiZap, FiGlobe, FiEye, FiSearch, FiLayers, FiUsers, FiLayout, FiMessageSquare, FiServer, FiCloud } from "react-icons/fi";
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
    title: "Frontend",
    accent: LIME,
    description: "Modern UI stacks for production client apps",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript (ES6+)", icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#264DE4" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
    ],
  },
  {
    id: "apis",
    title: "APIs & Integration",
    accent: "#38BDF8",
    description: "Reliable data flows and API tooling",
    skills: [
      { name: "REST APIs", icon: FiServer, color: "#38BDF8" },
      { name: "Axios", icon: SiAxios, color: "#5A29E4" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    id: "performance",
    title: "Performance & Quality",
    accent: MINT,
    description: "Speed, accessibility, and SEO standards",
    skills: [
      { name: "Lighthouse", icon: FiZap, color: MINT },
      { name: "Web Performance Optimization", icon: FiZap, color: "#FBBF24" },
      { name: "Accessibility", icon: FiEye, color: "#A78BFA" },
      { name: "SEO", icon: FiSearch, color: "#34D399" },
      { name: "Cross-Browser Compatibility", icon: FiGlobe, color: "#60A5FA" },
      { name: "Jest", icon: SiJest, color: "#C21325" },
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
    title: "Methodologies",
    accent: PURPLE,
    description: "Process and architecture for client delivery",
    skills: [
      { name: "Agile", icon: FiUsers, color: PURPLE },
      { name: "Component-Based Architecture", icon: FiLayers, color: LIME },
      { name: "Responsive Design", icon: FiLayout, color: "#06B6D4" },
      { name: "Client Requirement Analysis", icon: FiMessageSquare, color: "#F472B6" },
    ],
  },
];

/** Featured chips for compact / orbit-style displays */
export const SKILLS_LIST = SKILL_CATEGORIES.flatMap((cat) =>
  cat.skills
    .filter((s) => s.icon)
    .slice(0, cat.id === "frontend" ? 9 : 3)
    .map((s, i) => ({
      name: s.name.split(" ")[0].replace(".js", "").replace("(ES6+)", "JS"),
      icon: s.icon!,
      color: s.color ?? LIME,
      x: 8 + ((i * 17) % 80),
      y: 8 + ((i * 23) % 75),
      d: (i % 10) * 0.1,
    }))
);
