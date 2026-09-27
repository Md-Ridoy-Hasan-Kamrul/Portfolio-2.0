import { scrollToId } from "../../../hooks/useLenis";
import { FOOTER_CTA_LABEL, FOOTER_CTA_TARGET, FOOTER_LOGO, FOOTER_TAGLINE } from "./footerContent";
import { COLOR, FOOTER_ACCENT, SPACE, TYPE } from "./footerTokens";
import type { FooterMetrics } from "./resolveFooterVariant";

function AsteriskMark() {
  return (
    <svg className="footer-mark" width={SPACE.mark} height={SPACE.mark} viewBox="0 0 24 24" aria-hidden>
      <g fill="none" stroke={FOOTER_ACCENT} strokeWidth={SPACE.markStroke} strokeLinecap="round">
        <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
      </g>
    </svg>
  );
}

export function FooterBrand({ metrics }: { metrics: FooterMetrics }) {
  return (
    <div className="relative z-[1] flex flex-col" style={{ gap: metrics.stacked ? SPACE.brandGapPhone : SPACE.brandGap, paddingLeft: metrics.stacked ? SPACE.brandPhoneInset : 0 }}>
      <a href="#hero" className="footer-logo inline-flex items-center gap-2 no-underline" onClick={(event) => { event.preventDefault(); scrollToId("hero"); }}>
        <AsteriskMark />
        <span
          className="uppercase"
          style={{
            fontFamily: TYPE.display,
            fontSize: TYPE.logoSize,
            letterSpacing: TYPE.logoTracking,
            fontWeight: TYPE.weightBold,
            lineHeight: 1,
            color: COLOR.title,
          }}
        >
          {FOOTER_LOGO}
        </span>
      </a>
      <p
        style={{
          width: metrics.taglineWidth,
          maxWidth: "100%",
          margin: 0,
          fontFamily: TYPE.body,
          fontSize: TYPE.taglineSize,
          lineHeight: TYPE.taglineLine,
          color: COLOR.body,
        }}
      >
        {FOOTER_TAGLINE}
      </p>
      <button type="button" className="footer-cta w-fit" data-cta={FOOTER_CTA_TARGET} onClick={() => scrollToId(FOOTER_CTA_TARGET)}>
        {FOOTER_CTA_LABEL}
      </button>
    </div>
  );
}
