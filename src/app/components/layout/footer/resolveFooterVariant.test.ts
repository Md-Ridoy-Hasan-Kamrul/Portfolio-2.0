import { describe, expect, it } from "vitest";
import { VIEWPORT } from "./footerTokens";
import { footerMetrics, resolveFooterVariant } from "./resolveFooterVariant";

describe("resolveFooterVariant", () => {
  it("maps the requested breakpoints", () => {
    expect(resolveFooterVariant(1440)).toBe("desktop");
    expect(resolveFooterVariant(VIEWPORT.desktop)).toBe("desktop");
    expect(resolveFooterVariant(VIEWPORT.laptop)).toBe("laptop");
    expect(resolveFooterVariant(VIEWPORT.laptop - 1)).toBe("tablet");
    expect(resolveFooterVariant(VIEWPORT.tablet)).toBe("tablet");
    expect(resolveFooterVariant(VIEWPORT.tablet - 1)).toBe("phone");
    expect(resolveFooterVariant(VIEWPORT.mobileL)).toBe("phone");
    expect(resolveFooterVariant(VIEWPORT.mobileM)).toBe("phone");
    expect(resolveFooterVariant(VIEWPORT.mobileS)).toBe("phone");
  });

  it("keeps a horizontal top row from tablet upward and stacks on phones", () => {
    expect(footerMetrics("desktop", 1440).stacked).toBe(false);
    expect(footerMetrics("laptop", VIEWPORT.laptop).stacked).toBe(false);
    expect(footerMetrics("tablet", VIEWPORT.tablet).stacked).toBe(false);
    expect(footerMetrics("phone", VIEWPORT.mobileL).stacked).toBe(true);
  });

  it("tightens phone padding at 320px so the card still fits", () => {
    const regular = footerMetrics("phone", VIEWPORT.mobileL);
    const narrow = footerMetrics("phone", VIEWPORT.mobileS);
    expect(regular.paddingRight).toBeGreaterThan(narrow.paddingRight);
    expect(narrow.paddingRight).toBeGreaterThan(0);
  });
});
