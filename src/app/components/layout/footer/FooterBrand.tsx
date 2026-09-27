import { LIME, TEXT } from "../../../constants/theme";
import { scrollToId, scrollToTop } from "../../../hooks/useLenis";
import { FOOTER_CTA_LABEL, FOOTER_CTA_TARGET, FOOTER_TAGLINE } from "./footerContent";
import { COLOR, FOOTER_ACCENT, SPACE, TYPE } from "./footerTokens";
import type { FooterMetrics } from "./resolveFooterVariant";

const WORDMARK = [
  { ch: "M", accent: true },
  { ch: "R", accent: false },
  { ch: "H", accent: true },
  { ch: "K", accent: false },
] as const;

export function FooterBrand({ metrics }: { metrics: FooterMetrics }) {
  return (
    <div className="relative z-[1] flex flex-col" style={{ gap: metrics.stacked ? SPACE.brandGapPhone : SPACE.brandGap, paddingLeft: metrics.stacked ? SPACE.brandPhoneInset : 0 }}>
      <button
        type="button"
        className="footer-logo w-fit cursor-pointer"
        aria-label="Back to top"
        onClick={() => scrollToTop()}
      >
        <span className="inline-flex items-center gap-2">
        <svg className="footer-mark" width={SPACE.mark} height={SPACE.mark} viewBox="0 0 24 24" aria-hidden>
          <g fill="none" stroke={FOOTER_ACCENT} strokeWidth={SPACE.markStroke} strokeLinecap="round">
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
          </g>
        </svg>
        <span
          className="flex select-none italic font-medium text-[22px] leading-none lg:text-[24px]"
          style={{ fontFamily: '"Bodoni Moda", serif' }}
        >
          {WORDMARK.map(({ ch, accent }) => (
            <span key={ch} style={accent ? { color: LIME } : { color: TEXT }}>
              {ch}
            </span>
          ))}
        </span>
        </span>
      </button>
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
