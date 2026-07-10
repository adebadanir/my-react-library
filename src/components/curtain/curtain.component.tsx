import type { ComponentPropsWithoutRef } from "react";
import "./curtain.style.css";

export type CurtainProps = ComponentPropsWithoutRef<"div"> & {
  duration: number;
  colors?: string[];
  direction?: "up" | "down" | "left" | "right";
  count?: number;
};

export function CurtainComponent({
  duration,
  count,
  colors = ["#000"],
  direction = "down",
  ...rest
}: CurtainProps) {
  const totalBars = colors.length === 1 ? (count ?? 5) : colors.length;
  const finalColors =
    colors.length === 1 ? Array(totalBars).fill(colors[0]) : colors;

  const isHorizontal = direction === "left" || direction === "right";
  const sizeStyle = isHorizontal
    ? { width: "100%", height: `${100 / colors.length}%` }
    : { height: "100%", width: `${100 / colors.length}%` };

  return (
    <div className={`curtain-container dir-${direction}`} {...rest}>
      {finalColors?.map((color, index) => {
        const validColor = color.startsWith("#") ? color : `#${color}`;
        return (
          <div
            key={index}
            className={`curtain-bar bar-${direction}`}
            style={{
              ...sizeStyle,
              animationDuration: `${duration}s`,
              animationDelay: `${index * 0.1}s`,
              backgroundColor: validColor,
              boxShadow: `0 0 0 1px ${validColor}`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
