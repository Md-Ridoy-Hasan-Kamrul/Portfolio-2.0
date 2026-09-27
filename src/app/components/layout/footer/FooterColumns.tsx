import { CV_DOWNLOAD_NAME } from "../../../constants/site";
import { scrollToId } from "../../../hooks/useLenis";
import type { FooterColumn, FooterLink } from "./footerContent";
import { COLOR, FOOTER_ACCENT, SPACE, TYPE } from "./footerTokens";
import type { FooterMetrics } from "./resolveFooterVariant";

function FooterLinkControl({ link }: { link: FooterLink }) {
  if (link.kind === "section") {
    return (
      <button type="button" className="footer-link" data-section={link.href} onClick={() => scrollToId(link.href)}>
        {link.label}
      </button>
    );
  }
  if (link.kind === "download") {
    return (
      <a className="footer-link" href={link.href} download={CV_DOWNLOAD_NAME}>
        {link.label}
      </a>
    );
  }
  return (
    <a className="footer-link" href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  );
}

function FooterColumnBlock({ column, stacked, linksRow = false }: { column: FooterColumn; stacked: boolean; linksRow?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col" style={{ gap: SPACE.linkStack }}>
      <h3
        style={{
          margin: 0,
          padding: `0 0 ${stacked ? SPACE.linkPadYPhone : SPACE.titlePadBottom}px ${stacked ? 0 : SPACE.linkPadX}px`,
          fontFamily: TYPE.display,
          fontSize: TYPE.columnSize,
          letterSpacing: TYPE.columnTracking,
          fontWeight: TYPE.weightBold,
          textTransform: "uppercase",
          color: FOOTER_ACCENT,
        }}
      >
        {column.title}
      </h3>
      <div className={linksRow ? "flex flex-wrap" : "flex flex-col"} style={{ gap: linksRow ? SPACE.columnGapPhone : 0 }}>
        {column.links.map((link) => (
          <FooterLinkControl key={link.label} link={link} />
        ))}
      </div>
    </div>
  );
}

export function FooterColumns({ columns, metrics }: { columns: readonly FooterColumn[]; metrics: FooterMetrics }) {
  if (metrics.stacked) {
    const explore = columns.find((column) => column.title === "Explore");
    const work = columns.find((column) => column.title === "Work");
    const connect = columns.find((column) => column.title === "Connect");
    return (
      <div
        className="relative z-[1] grid w-full"
        style={{ gridTemplateColumns: "1fr 1fr", columnGap: metrics.columnGap, rowGap: metrics.columnGap }}
      >
        {explore && <FooterColumnBlock column={explore} stacked />}
        {work && <FooterColumnBlock column={work} stacked />}
        {connect && (
          <div className="min-w-0" style={{ gridColumn: "1 / -1" }}>
            <FooterColumnBlock column={connect} stacked linksRow />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative z-[1] flex" style={{ gap: metrics.columnGap }}>
      {columns.map((column) => (
        <FooterColumnBlock key={column.title} column={column} stacked={false} />
      ))}
    </div>
  );
}
