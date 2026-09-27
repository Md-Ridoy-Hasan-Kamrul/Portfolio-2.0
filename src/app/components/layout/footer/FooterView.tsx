import { buildFooterColumns } from "./footerContent";
import { footerStyleSheet } from "./footerStyles";
import { BreathingGlows } from "./BreathingGlows";
import { FooterBottomBar } from "./FooterBottomBar";
import { FooterBrand } from "./FooterBrand";
import { FooterColumns } from "./FooterColumns";
import { COLOR, PANEL_SHADOW, SPACE } from "./footerTokens";
import { footerMetrics, resolveFooterVariant, type FooterVariant } from "./resolveFooterVariant";

function panelStyle(variant: FooterVariant, width: number) {
  const metrics = footerMetrics(variant, width);
  return {
    metrics,
    style: {
      width: metrics.panelWidth,
      maxWidth: "100%",
      marginInline: "auto",
      display: "flex",
      flexDirection: "column" as const,
      paddingTop: metrics.paddingTop,
      paddingRight: metrics.paddingRight,
      paddingBottom: metrics.paddingBottom,
      paddingLeft: metrics.paddingLeft,
      backgroundColor: COLOR.glass,
      border: `1px solid ${COLOR.border}`,
      borderTopLeftRadius: SPACE.radius,
      borderTopRightRadius: SPACE.radius,
      boxShadow: PANEL_SHADOW,
      backdropFilter: `blur(${SPACE.blur}px)`,
      WebkitBackdropFilter: `blur(${SPACE.blur}px)`,
      overflow: "hidden",
    },
  };
}

export function FooterView({
  footerRef,
  width,
  year = new Date().getFullYear(),
}: {
  footerRef: React.RefObject<HTMLElement>;
  width: number;
  year?: number;
}) {
  const variant = resolveFooterVariant(width);
  const { metrics, style } = panelStyle(variant, width);
  const columns = buildFooterColumns();

  return (
    <footer
      ref={footerRef}
      data-variant={variant}
      className="fixed bottom-0 inset-x-0 z-0 pointer-events-none"
    >
      <style>{footerStyleSheet()}</style>
      <div className="footer-panel pointer-events-auto" style={style}>
        <BreathingGlows />
        <div className="relative z-[1] flex w-full flex-col" style={{ gap: metrics.sectionGap }}>
        <div
          className="footer-top relative z-[1] flex w-full"
          data-layout={metrics.stacked ? "stack" : "row"}
          style={{
            flexDirection: metrics.stacked ? "column" : "row",
            justifyContent: metrics.stacked ? "flex-start" : "space-between",
            alignItems: "flex-start",
            gap: metrics.stacked ? metrics.sectionGap : 0,
          }}
        >
          <FooterBrand metrics={metrics} />
          <FooterColumns columns={columns} metrics={metrics} />
        </div>
        <div className="relative z-[1] h-px w-full" style={{ backgroundColor: COLOR.divider }} />
        <FooterBottomBar year={year} metrics={metrics} />
        </div>
      </div>
    </footer>
  );
}
