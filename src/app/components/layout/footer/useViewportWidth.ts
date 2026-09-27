import { useEffect, useState } from "react";
import { VIEWPORT } from "./footerTokens";

function readWidth(): number {
  if (typeof window === "undefined") return VIEWPORT.desktop;
  return window.innerWidth;
}

export function useViewportWidth(): number {
  const [width, setWidth] = useState(readWidth);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}
