import {
  CONTACT_EMAIL,
  CV_PDF_PATH,
  GITHUB_HREF,
  LINKEDIN_HREF,
  WHATSAPP_HREF,
} from "../../../constants/site";

export const FOOTER_LOGO = "MRHK";
export const FOOTER_TAGLINE =
  "Frontend Developer based in Dhaka, building production interfaces for remote product teams.";
export const FOOTER_CTA_LABEL = "Let's talk";
export const FOOTER_CTA_TARGET = "contact";
export const FOOTER_CREDIT = CONTACT_EMAIL;

export type FooterLinkKind = "section" | "external" | "download";

export type FooterLink = {
  label: string;
  href: string;
  kind: FooterLinkKind;
};

export type FooterColumn = {
  title: string;
  links: readonly FooterLink[];
};

export function copyrightLine(year: number): string {
  return `© ${year} Md. Ridoy Hasan Kamrul. All rights reserved.`;
}

export function buildFooterColumns(): readonly FooterColumn[] {
  return [
    {
      title: "Explore",
      links: [
        { label: "Experiences", href: "experience", kind: "section" },
        { label: "Education", href: "about", kind: "section" },
        { label: "Skill", href: "skills", kind: "section" },
      ],
    },
    {
      title: "Work",
      links: [
        { label: "Projects", href: "projects", kind: "section" },
        { label: "Resume", href: CV_PDF_PATH, kind: "download" },
        { label: FOOTER_CTA_LABEL, href: FOOTER_CTA_TARGET, kind: "section" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "GitHub", href: GITHUB_HREF, kind: "external" },
        { label: "LinkedIn", href: LINKEDIN_HREF, kind: "external" },
        { label: "WhatsApp", href: WHATSAPP_HREF, kind: "external" },
      ],
    },
  ];
}
