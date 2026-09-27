import { SPACE, VIEWPORT } from "./footerTokens";

export type FooterVariant = "desktop" | "laptop" | "tablet" | "phone";

export type FooterMetrics = {
  stacked: boolean;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  sectionGap: number;
  columnGap: number;
  taglineWidth: number | "100%";
  panelWidth: number | "100%";
};

export function resolveFooterVariant(width: number): FooterVariant {
  if (width >= VIEWPORT.desktop) return "desktop";
  if (width >= VIEWPORT.laptop) return "laptop";
  if (width >= VIEWPORT.tablet) return "tablet";
  return "phone";
}

export function footerMetrics(variant: FooterVariant, width: number): FooterMetrics {
  if (variant === "desktop") {
    return {
      stacked: false,
      paddingTop: SPACE.padDesktop,
      paddingRight: SPACE.padDesktop,
      paddingBottom: SPACE.padDesktop,
      paddingLeft: SPACE.padDesktop,
      sectionGap: SPACE.sectionDesktop,
      columnGap: SPACE.columnGapDesktop,
      taglineWidth: SPACE.taglineDesktop,
      panelWidth: VIEWPORT.desktop,
    };
  }
  if (variant === "laptop") {
    return {
      stacked: false,
      paddingTop: SPACE.padLaptop,
      paddingRight: SPACE.padLaptop,
      paddingBottom: SPACE.padLaptop,
      paddingLeft: SPACE.padLaptop,
      sectionGap: SPACE.sectionTablet,
      columnGap: SPACE.columnGapLaptop,
      taglineWidth: SPACE.taglineTablet,
      panelWidth: "100%",
    };
  }
  if (variant === "tablet") {
    return {
      stacked: false,
      paddingTop: SPACE.padTabletY,
      paddingRight: SPACE.padTabletX,
      paddingBottom: SPACE.padTabletBottom,
      paddingLeft: SPACE.padTabletX,
      sectionGap: SPACE.sectionTablet,
      columnGap: SPACE.columnGapTablet,
      taglineWidth: SPACE.taglineTablet,
      panelWidth: "100%",
    };
  }
  const horizontal = width <= VIEWPORT.mobileS ? SPACE.padPhoneNarrowX : SPACE.padPhoneX;
  return {
    stacked: true,
    paddingTop: SPACE.padPhoneTop,
    paddingRight: horizontal,
    paddingBottom: SPACE.padPhoneBottom,
    paddingLeft: horizontal,
    sectionGap: SPACE.sectionPhone,
    columnGap: SPACE.columnGapPhone,
    taglineWidth: "100%",
    panelWidth: "100%",
  };
}
