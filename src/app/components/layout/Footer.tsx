import { FooterView } from "./footer/FooterView";
import { useViewportWidth } from "./footer/useViewportWidth";

export function Footer({ footerRef }: { footerRef: React.RefObject<HTMLElement> }) {
  const width = useViewportWidth();
  return <FooterView footerRef={footerRef} width={width} />;
}
