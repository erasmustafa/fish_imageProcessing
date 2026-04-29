import React, { CSSProperties, ReactNode } from "react";

type AnimationMode = "auto-rotate" | "rotate-on-hover" | "stop-rotate-on-hover";

interface ShiningBorderProps {
  children: ReactNode;
  className?: string;
  animationMode?: AnimationMode;
  animationSpeed?: number;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function ShiningBorder({
  children,
  className = "",
  animationMode = "auto-rotate",
  animationSpeed = 5,
  borderWidth = 2,
  borderRadius = 20,
  backgroundColor = "#020617",
  gradientColors = {
    primary: "#0f172a",
    secondary: "#38bdf8",
    accent: "#22d3ee",
  },
}: ShiningBorderProps) {
  const animationClass =
    animationMode === "auto-rotate"
      ? "gradient-border-auto"
      : animationMode === "rotate-on-hover"
        ? "gradient-border-hover"
        : "gradient-border-stop-hover";

  const style = {
    "--animation-duration": `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `
      linear-gradient(${backgroundColor}, ${backgroundColor}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 37%,
        ${gradientColors.accent} 50%,
        ${gradientColors.secondary} 63%,
        ${gradientColors.primary} 100%
      )
    `,
    backgroundClip: "padding-box, border-box",
    backgroundOrigin: "padding-box, border-box",
  } as CSSProperties;

  return (
    <div className={`shining-border ${animationClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
