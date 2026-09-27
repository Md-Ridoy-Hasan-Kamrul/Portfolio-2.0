(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, GITHUB_HREF } from "../../../constants/site";
import { VIEWPORT } from "./footerTokens";
import { FooterView } from "./FooterView";

const mounts: Array<{ root: ReturnType<typeof createRoot>; host: HTMLDivElement }> = [];

function renderFooter(width: number) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  act(() => {
    root.render(<FooterView footerRef={{ current: null }} width={width} />);
  });
  mounts.push({ root, host });
  return host;
}

afterEach(() => {
  for (const mount of mounts) {
    act(() => mount.root.unmount());
    mount.host.remove();
  }
  mounts.length = 0;
  document.body.innerHTML = "";
});

describe("Breathing footer", () => {
  it("renders site content inside the glass panel", () => {
    const host = renderFooter(VIEWPORT.desktop);
    expect(host.querySelector("footer")?.getAttribute("data-variant")).toBe("desktop");
    expect(host.textContent).toContain("MRHK");
    expect(host.textContent).toContain("Let's talk");
    expect(host.textContent).toContain("Experiences");
    expect(host.textContent).toContain(CONTACT_EMAIL);
    expect(host.querySelector(`a[href="${GITHUB_HREF}"]`)).not.toBeNull();
    expect(host.querySelector("a.footer-credit")?.getAttribute("href")).toBe(CONTACT_EMAIL_HREF);
    expect(host.querySelector("a.footer-credit")?.textContent).toContain(CONTACT_EMAIL);
    expect(host.querySelectorAll(".footer-glow")).toHaveLength(3);
  });

  it("stacks the top row on mobile widths", () => {
    for (const width of [VIEWPORT.mobileL, VIEWPORT.mobileM, VIEWPORT.mobileS]) {
      const host = renderFooter(width);
      expect(host.querySelector("footer")?.getAttribute("data-variant")).toBe("phone");
      expect(host.querySelector(".footer-top")?.getAttribute("data-layout")).toBe("stack");
    }
  });

  it("scrolls to contact when Let's talk is pressed", () => {
    const contact = document.createElement("div");
    contact.id = "contact";
    const scroll = vi.fn();
    contact.scrollIntoView = scroll;
    document.body.appendChild(contact);

    const host = renderFooter(VIEWPORT.laptop);
    const button = [...host.querySelectorAll("button")].find((el) => el.textContent?.includes("Let's talk")) as HTMLButtonElement;
    act(() => {
      button.click();
    });
    expect(scroll).toHaveBeenCalled();
  });
});
