import { CSSProperties } from "react";

type ShineBorderProps = {
  className?: string;
  borderWidth?: number;
  borderRadius?: number;
  duration?: number;
  shineColor?: string;
};

export function ShineBorder({
  className = "",
  borderWidth = 1,
  borderRadius = 24,
  duration = 10,
  shineColor = "#7dd3fc",
}: ShineBorderProps) {
  return (
    <div
      aria-hidden="true"
      className={`shine-border ${className}`.trim()}
      style={
        {
          "--shine-border-width": `${borderWidth}px`,
          "--shine-border-radius": `${borderRadius}px`,
          "--shine-pulse-duration": `${duration}s`,
          "--shine-color": shineColor,
        } as CSSProperties
      }
    />
  );
}
