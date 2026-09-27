import { describe, expect, it } from "vitest";
import {
  CONTACT_EMAIL,
  CV_PDF_PATH,
  GITHUB_HREF,
  LINKEDIN_HREF,
  WHATSAPP_HREF,
} from "../../../constants/site";
import {
  FOOTER_CREDIT,
  FOOTER_CTA_LABEL,
  FOOTER_CTA_TARGET,
  FOOTER_LOGO,
  FOOTER_TAGLINE,
  buildFooterColumns,
  copyrightLine,
} from "./footerContent";

describe("footer content", () => {
  it("uses the site wordmark, tagline, and contact call to action", () => {
    expect(FOOTER_LOGO).toBe("MRHK");
    expect(FOOTER_TAGLINE).toContain("Dhaka");
    expect(FOOTER_TAGLINE).toContain("Frontend Developer");
    expect(FOOTER_CTA_LABEL).toBe("Let's talk");
    expect(FOOTER_CTA_TARGET).toBe("contact");
    expect(FOOTER_CREDIT).toBe(CONTACT_EMAIL);
  });

  it("keeps the navbar sections and every public contact link", () => {
    const columns = buildFooterColumns();
    const byTitle = Object.fromEntries(columns.map((column) => [column.title, column.links]));

    expect(byTitle.Explore).toEqual([
      { label: "Experiences", href: "experience", kind: "section" },
      { label: "Education", href: "about", kind: "section" },
      { label: "Skill", href: "skills", kind: "section" },
    ]);
    expect(byTitle.Work).toEqual([
      { label: "Projects", href: "projects", kind: "section" },
      { label: "Resume", href: CV_PDF_PATH, kind: "download" },
      { label: "Let's talk", href: "contact", kind: "section" },
    ]);
    expect(byTitle.Connect).toEqual([
      { label: "GitHub", href: GITHUB_HREF, kind: "external" },
      { label: "LinkedIn", href: LINKEDIN_HREF, kind: "external" },
      { label: "WhatsApp", href: WHATSAPP_HREF, kind: "external" },
    ]);
  });

  it("writes the copyright with the given year", () => {
    expect(copyrightLine(2026)).toBe("© 2026 Md. Ridoy Hasan Kamrul. All rights reserved.");
  });
});
