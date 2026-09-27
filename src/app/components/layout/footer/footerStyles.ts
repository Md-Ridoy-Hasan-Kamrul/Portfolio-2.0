import {
  ACCENT_RGB,
  COLOR,
  FOOTER_ACCENT,
  MOTION,
  SPACE,
  TYPE,
} from './footerTokens';

export function footerStyleSheet(): string {
  return `
    .footer-panel { position: relative; overflow: hidden; box-sizing: border-box; }
    .footer-glow { position: absolute; pointer-events: none; border-radius: 100%; filter: blur(${SPACE.glowBlur}px); z-index: 0; }
    .footer-glow-large {
      left: ${SPACE.glowLargeLeft}px; bottom: ${SPACE.glowLargeBottom}px; width: ${SPACE.glowLargeWidth}px; height: ${SPACE.glowLargeHeight}px;
      background: radial-gradient(50% 50% at 50% 50%, rgba(${ACCENT_RGB}, 0.55) 0%, rgba(${ACCENT_RGB}, 0) 100%);
      animation: footer-glow-large ${MOTION.glowLargeMs}ms ease-in-out infinite alternate;
    }
    .footer-glow-small {
      right: ${SPACE.glowSmallRight}px; top: ${SPACE.glowSmallTop}px; width: ${SPACE.glowSmallWidth}px; height: ${SPACE.glowSmallHeight}px;
      background: radial-gradient(50% 50% at 50% 50%, rgba(${ACCENT_RGB}, 0.36) 0%, rgba(${ACCENT_RGB}, 0) 100%);
      animation: footer-glow-small ${MOTION.glowSmallMs}ms ease-in-out ${MOTION.glowSmallDelayMs}ms infinite alternate;
    }
    .footer-glow-center {
      left: ${SPACE.glowCenterLeft}px; bottom: ${SPACE.glowCenterBottom}px; width: ${SPACE.glowSmallWidth}px; height: ${SPACE.glowSmallHeight}px;
      background: radial-gradient(50% 50% at 50% 50%, rgba(${ACCENT_RGB}, 0.22) 0%, rgba(${ACCENT_RGB}, 0) 100%);
      animation: footer-glow-center ${MOTION.glowCenterMs}ms ease-in-out ${MOTION.glowCenterDelayMs}ms infinite alternate;
    }
    [data-variant="phone"] .footer-glow-large { left: ${SPACE.glowPhoneLeft}px; bottom: ${SPACE.glowPhoneBottom}px; width: ${SPACE.glowPhoneSize}px; height: ${SPACE.glowPhoneSize}px; }
    @keyframes footer-glow-large {
      from { opacity: ${MOTION.restOpacity}; transform: translateX(0) scale(1) rotate(0deg); }
      to { opacity: ${MOTION.largeOpacity}; transform: translateX(${MOTION.largeTravel}px) scale(${MOTION.largeScale}) rotate(360deg); }
    }
    @keyframes footer-glow-small {
      from { opacity: ${MOTION.restOpacity}; transform: translateX(0) scale(1) rotate(0deg); }
      to { opacity: ${MOTION.smallOpacity}; transform: translateX(${MOTION.sideTravel}px) scale(${MOTION.smallScale}) rotate(360deg); }
    }
    @keyframes footer-glow-center {
      from { opacity: ${MOTION.restOpacity}; transform: translateX(0) scale(1) rotate(0deg); }
      to { opacity: ${MOTION.centerOpacity}; transform: translateX(${MOTION.sideTravel}px) scale(${MOTION.centerScale}) rotate(360deg); }
    }
    .footer-mark { animation: footer-spin ${MOTION.spinMs}ms linear infinite; transform-origin: center; }
    .footer-logo:hover .footer-mark { animation-play-state: paused; transform: rotate(${MOTION.hoverRotate}deg) scale(${MOTION.hoverScale}); }
    @keyframes footer-spin { to { transform: rotate(360deg); } }
    .footer-link, .footer-cta {
      font-family: ${TYPE.body};
      cursor: pointer;
      text-decoration: none;
      border: 0;
      background: transparent;
    }
    .footer-link {
      display: inline-flex;
      align-items: center;
      padding: ${SPACE.linkPadY}px ${SPACE.linkPadX}px;
      border-radius: ${SPACE.linkRadius}px;
      color: ${COLOR.body};
      font-size: ${TYPE.linkSize}px;
      line-height: ${TYPE.linkLine};
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }
    .footer-link:hover {
      background: rgba(${ACCENT_RGB}, 0.14);
      color: ${COLOR.linkHover};
      transform: translateY(${SPACE.linkHoverLift}px) scale(${SPACE.linkHoverScale});
    }
    .footer-link:active { transform: scale(${SPACE.linkPressScale}); }
    [data-variant="phone"] .footer-link { padding: ${SPACE.linkPadYPhone}px 0; font-size: ${TYPE.linkSizePhone}px; }
    [data-variant="phone"] .footer-link:hover { background: transparent; color: ${COLOR.linkHover}; }
    .footer-cta {
      display: inline-flex;
      align-items: center;
      height: ${SPACE.ctaHeight}px;
      padding: 0 ${SPACE.ctaPadX}px;
      border-radius: 999px;
      color: ${FOOTER_ACCENT};
      background: rgba(${ACCENT_RGB}, 0.12);
      box-shadow: 0 0 24px rgba(${ACCENT_RGB}, 0.28), inset 0 0 0 1px rgba(${ACCENT_RGB}, 0.45);
      font-size: ${TYPE.linkSize}px;
      letter-spacing: ${TYPE.ctaTracking};
    }
    .footer-cta:hover { background: rgba(${ACCENT_RGB}, 0.22); box-shadow: 0 0 32px rgba(${ACCENT_RGB}, 0.45), inset 0 0 0 1px ${FOOTER_ACCENT}; }
    .footer-link:focus-visible, .footer-cta:focus-visible, .footer-logo:focus-visible {
      outline: ${SPACE.focusWidth}px solid ${FOOTER_ACCENT};
      outline-offset: ${SPACE.focusOffset}px;
    }
    @media (prefers-reduced-motion: reduce) {
      .footer-glow, .footer-mark { animation: none; }
      .footer-link, .footer-cta { transition: none; }
    }
  `;
}
