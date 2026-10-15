"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once, on the client only. Every component imports gsap from here
// so plugins are guaranteed to be registered before any tween runs.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: "power3.out", duration: 1 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 900px)";

export { gsap, ScrollTrigger, SplitText, useGSAP };

// Expose the instance in development so animations can be inspected from the console.
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") { window.gsap = gsap; window.ScrollTrigger = ScrollTrigger; }
