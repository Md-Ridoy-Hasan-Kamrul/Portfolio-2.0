import { useEffect, useRef, type ReactNode } from "react";

/**
 * Induction button from the valence-core source.
 * Shader, size, radius, and label treatment match that source.
 */
const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

const FS = [
  "precision highp float;",
  "uniform vec2 u_res;",
  "uniform float u_time;",
  "uniform float u_arcs;",
  "uniform float u_flash;",
  "float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}",
  "float noise(vec2 p){",
  "  vec2 i=floor(p), f=fract(p);",
  "  vec2 u=f*f*(3.0-2.0*f);",
  "  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),",
  "             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);",
  "}",
  "float fbm(vec2 p){",
  "  float v=0.0; float a=0.5;",
  "  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.05+vec2(9.7,3.1); a*=0.5; }",
  "  return v;",
  "}",
  "float sdRBox(vec2 p, vec2 b, float r){",
  "  vec2 q = abs(p) - b + r;",
  "  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;",
  "}",
  "void main(){",
  "  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;",
  "  float ar = u_res.x / u_res.y;",
  "  vec2 hs = vec2(ar * 0.5 - 0.045, 0.5 - 0.045);",
  "  float d = sdRBox(p, hs, hs.y);",
  "  float t = u_time;",
  "  float hover = clamp(u_arcs / 6.0, 0.0, 1.0);",
  "  vec3 col = vec3(0.039, 0.039, 0.039);",
  "  float plate = 1.0 - smoothstep(-0.004, 0.004, d);",
  "  vec3 plateCol = vec3(0.04, 0.05, 0.055);",
  "  plateCol += vec3(0.014, 0.022, 0.035) * fbm(p * 9.0);",
  "  plateCol += vec3(0.45, 0.72, 0.12) * exp(d * 9.0) * (0.25 + hover * 0.6);",
  "  col = mix(col, plateCol, plate);",
  "  col *= 1.0 + 0.5 * exp(-max(d, 0.0) * 16.0) * (1.0 - plate);",
  "  float a = atan(p.y, p.x);",
  "  vec3 arcCol = vec3(0.0);",
  "  for (int i = 0; i < 6; i++) {",
  "    float fi = float(i);",
  "    float w = clamp(u_arcs - fi, 0.0, 1.0);",
  "    float n1 = fbm(vec2(a * 2.4 + fi * 11.3, t * (1.6 + fi * 0.27) + fi * 53.1));",
  "    float off = (n1 - 0.5) * (0.11 + u_flash * 0.1);",
  "    float seg = smoothstep(0.35, 0.75, noise(vec2(a * 1.8 + fi * 7.7, t * (0.9 + fi * 0.13) + fi * 19.0)));",
  "    seg = 0.3 + 0.7 * seg;",
  "    float g = 0.0042 / (abs(d + off) + 0.006);",
  "    arcCol += (vec3(0.722, 1.0, 0.231) * g + vec3(0.93, 1.0, 0.72) * g * g * 0.55) * w * seg;",
  "  }",
  "  float outerMask = 1.0 - smoothstep(0.04, 0.15, d);",
  "  col += arcCol * (0.6 + 0.4 * hover) * outerMask;",
  "  float ring = 0.006 / (abs(d) + 0.006);",
  "  col += vec3(0.85, 1.0, 0.55) * ring * u_flash * 1.5 * outerMask;",
  "  col += vec3(0.722, 1.0, 0.231) * u_flash * 0.16 * outerMask;",
  "  gl_FragColor = vec4(col, 1.0);",
  "}",
].join("\n");

type ShaderButtonsProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  download?: string;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "induction-button";
  mode?: "dark" | "light";
  hue?: number;
  saturation?: number;
  brightness?: number;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("shader compile failed:", gl.getShaderInfoLog(shader));
  }
  return shader;
}

export function ShaderButtons({
  children,
  onClick,
  href,
  download,
  className = "",
  type = "button",
  disabled = false,
  hue = 0,
  saturation = 1,
  brightness = 1,
}: ShaderButtonsProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const button = elRef.current;
    const canvas = canvasRef.current;
    if (!button || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VS);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("program link failed:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const locP = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uArcs = gl.getUniformLocation(prog, "u_arcs");
    const uFlash = gl.getUniformLocation(prog, "u_flash");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let arcs = 2.4;
    let arcsTarget = 2.4;
    let flash = 0;
    let crawl = 0;
    let last = performance.now();
    let frameId = 0;

    const enter = () => {
      arcsTarget = 5.8;
    };
    const leave = () => {
      arcsTarget = 2.4;
    };
    const click = () => {
      flash = 1;
    };

    button.addEventListener("mouseenter", enter);
    button.addEventListener("mouseleave", leave);
    button.addEventListener("focus", enter);
    button.addEventListener("blur", leave);
    button.addEventListener("click", click);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      arcs += (arcsTarget - arcs) * Math.min(1, dt * 5);
      flash *= Math.exp(-3.6 * dt);
      crawl += dt * (0.6 + (arcs / 6) * 1.1 + flash * 2);
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 3 : crawl);
      gl.uniform1f(uArcs, arcs);
      gl.uniform1f(uFlash, flash);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      button.removeEventListener("mouseenter", enter);
      button.removeEventListener("mouseleave", leave);
      button.removeEventListener("focus", enter);
      button.removeEventListener("blur", leave);
      button.removeEventListener("click", click);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  const graded = hue !== 0 || saturation !== 1 || brightness !== 1;
  const sharedClass = `group relative inline-flex h-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent px-7 text-sm transition-transform duration-[220ms] ease-[cubic-bezier(.34,1.4,.5,1)] hover:-translate-y-0.5 active:translate-y-px active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3B] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-60 ${className}`;
  const canvas = (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 block h-full w-full rounded-full"
      style={graded ? { filter: `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})` } : undefined}
    />
  );
  const label = (
    <span
      className="pointer-events-none relative z-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[#f4ffe6]"
      style={{ textShadow: "0 0 12px rgba(184, 255, 59, .65), 0 1px 4px rgba(0, 0, 0, .8)" }}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={(node) => {
          elRef.current = node;
        }}
        href={href}
        download={download}
        className={sharedClass}
      >
        {canvas}
        {label}
      </a>
    );
  }

  return (
    <button
      ref={(node) => {
        elRef.current = node;
      }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={sharedClass}
    >
      {canvas}
      {label}
    </button>
  );
}
