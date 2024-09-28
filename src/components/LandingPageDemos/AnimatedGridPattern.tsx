"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  fill?: string;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  fill = "white",
  ...props
}: GridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<
    Array<{ id: string; x: number; y: number }>
  >([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  // Generate squares positioned in a grid
  useEffect(() => {
    const generateSquares = () => {
      const squares = [];
      const numCols = Math.ceil(dimensions.width / width);
      const numRows = Math.ceil(dimensions.height / height);

      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          squares.push({ id: `${i}-${j}`, x: i * width, y: j * height });
        }
      }

      return squares;
    };

    setSquares(generateSquares);
  }, [dimensions, width, height]);

  // Randomize squares to show only a few at a time
  const randomizeSquares = (
    squares: Array<{ id: string; x: number; y: number }>
  ) => {
    const shuffled = squares.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSquares);
  };

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-1/2 fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {randomizeSquares(squares).map(({ x, y, id }, index) => (
          <motion.rect
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: Infinity,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
            width={width - 1}
            height={height - 1}
            x={x + 1}
            y={y + 1}
            fill={fill}
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}

export default GridPattern;
