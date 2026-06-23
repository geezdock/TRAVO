"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  children: React.ReactNode;
}

const dotColors = ["#D4836A", "#C4A99A", "#4A7C59"];

const dotLabels = ["DESTINATION", "BUDGET", "DATES"];

let splashSeen = false;

export function SplashScreen({ children }: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (splashSeen) {
      setShowSplash(false);
      return;
    }

    splashSeen = true;

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-500 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-ink flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="text-center px-4">
              {/* Route SVG: 3 dots connected by a V path */}
              <div className="mb-5 relative">
                <svg
                  viewBox="0 0 160 120"
                  className="w-40 h-30 sm:w-52 sm:h-40 mx-auto"
                  fill="none"
                >
                  {/* Route path — left arm then right arm */}
                  <motion.path
                    d="M 20 20 L 80 100 L 140 20"
                    stroke="#F5F0EB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />

                  {/* Bold V overlay (fills in after route) */}
                  <motion.path
                    d="M 20 20 L 80 100 L 140 20"
                    stroke="#F5F0EB"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
                  />

                  {/* Drop shadow on the V (brutalist stamp) */}
                  <motion.path
                    d="M 23 23 L 83 103 L 143 23"
                    stroke="rgba(245,240,235,0.15)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.6, duration: 0.3, ease: "easeOut" }}
                  />

                  {/* Dot 1 — top-left */}
                  <motion.circle
                    cx="20"
                    cy="20"
                    r="5"
                    fill={dotColors[0]}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.35, ease: "backOut" }}
                  />
                  <motion.circle
                    cx="20"
                    cy="20"
                    r="9"
                    stroke={dotColors[0]}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.45, ease: "backOut" }}
                  />

                  {/* Dot 2 — bottom-center */}
                  <motion.circle
                    cx="80"
                    cy="100"
                    r="5"
                    fill={dotColors[1]}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.35, ease: "backOut" }}
                  />
                  <motion.circle
                    cx="80"
                    cy="100"
                    r="9"
                    stroke={dotColors[1]}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.45, ease: "backOut" }}
                  />

                  {/* Dot 3 — top-right */}
                  <motion.circle
                    cx="140"
                    cy="20"
                    r="5"
                    fill={dotColors[2]}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.35, ease: "backOut" }}
                  />
                  <motion.circle
                    cx="140"
                    cy="20"
                    r="9"
                    stroke={dotColors[2]}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.45, ease: "backOut" }}
                  />

                  {/* Dot labels */}
                  <motion.text
                    x="20"
                    y="44"
                    textAnchor="middle"
                    fill={dotColors[0]}
                    fontSize="7"
                    fontFamily="Space_Grotesk, sans-serif"
                    fontWeight="700"
                    opacity="0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.5, duration: 0.35 }}
                  >
                    {dotLabels[0]}
                  </motion.text>
                  <motion.text
                    x="80"
                    y="118"
                    textAnchor="middle"
                    fill={dotColors[1]}
                    fontSize="7"
                    fontFamily="Space_Grotesk, sans-serif"
                    fontWeight="700"
                    opacity="0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.8, duration: 0.35 }}
                  >
                    {dotLabels[1]}
                  </motion.text>
                  <motion.text
                    x="140"
                    y="44"
                    textAnchor="middle"
                    fill={dotColors[2]}
                    fontSize="7"
                    fontFamily="Space_Grotesk, sans-serif"
                    fontWeight="700"
                    opacity="0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.1, duration: 0.35 }}
                  >
                    {dotLabels[2]}
                  </motion.text>

                  {/* Background grid lines (map-like) */}
                  <motion.g
                    stroke="#F5F0EB"
                    strokeWidth="0.3"
                    strokeOpacity="0.06"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((x) => (
                      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="120" />
                    ))}
                    {[0, 20, 40, 60, 80, 100, 120].map((y) => (
                      <line key={`h${y}`} x1="0" y1={y} x2="160" y2={y} />
                    ))}
                  </motion.g>
                </svg>
              </div>

              {/* VOYAQ letters staggered */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {"VOYAQ".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="font-display text-4xl sm:text-5xl font-extrabold text-surface tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.6 + i * 0.12,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Tagline */}
              <motion.p
                className="font-heading text-xs sm:text-sm text-surface/50 tracking-[0.2em] uppercase"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                Plan Trips. Together.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
