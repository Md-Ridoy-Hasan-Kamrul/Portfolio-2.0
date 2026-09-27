import { CONTACT_EMAIL_HREF } from "../../../constants/site";
import { FOOTER_CREDIT, copyrightLine } from "./footerContent";
import { COLOR, FOOTER_ACCENT, SPACE, TYPE } from "./footerTokens";
import type { FooterMetrics } from "./resolveFooterVariant";

function Spark() {
  return (
    <svg className="footer-mark" width={SPACE.spark} height={SPACE.spark} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 1.5 14.2 9.8 22.5 12 14.2 14.2 12 22.5 9.8 14.2 1.5 12 9.8 9.8Z" fill={FOOTER_ACCENT} />
    </svg>
  );
}

export function FooterBottomBar({ year, metrics }: { year: number; metrics: FooterMetrics }) {
  return (
    <div
      className="relative z-[1] flex w-full"
      style={{
        flexDirection: metrics.stacked ? "column" : "row",
        alignItems: metrics.stacked ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: metrics.stacked ? SPACE.bottomPhone : 0,
        paddingLeft: metrics.stacked ? SPACE.brandPhoneInset : 0,
        paddingRight: metrics.stacked ? SPACE.brandPhoneInset : 0,
      }}
    >
      <p style={{ margin: 0, maxWidth: "100%", fontFamily: TYPE.body, fontSize: TYPE.metaSize, letterSpacing: TYPE.metaTracking, textTransform: "uppercase", color: COLOR.muted }}>
        {copyrightLine(year)}
      </p>
      <a
        className="footer-credit m-0 inline-flex max-w-full items-center gap-2"
        href={CONTACT_EMAIL_HREF}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: TYPE.body,
          fontSize: TYPE.metaSize,
          letterSpacing: TYPE.metaTracking,
          color: COLOR.credit,
          textDecoration: "none",
          overflowWrap: "anywhere",
        }}
      >
        <Spark />
        {FOOTER_CREDIT}
      </a>
    </div>
  );
}
