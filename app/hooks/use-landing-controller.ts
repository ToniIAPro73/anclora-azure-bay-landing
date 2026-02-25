import { useEffect, useRef, useState } from "react";

const HERO_ANIMATION_TIMELINE_MS = {
  backgroundImage: 0,
  logo: 300,
  subtitle: 800,
  description: 1300,
  priceBox: 1800,
  ctaButtons: 2300,
  scrollIndicator: 2800,
} as const;

export function useLandingController() {
  const heroStackRef = useRef<HTMLDivElement>(null);
  const [heroScale, setHeroScale] = useState(1);
  const [animationStates, setAnimationStates] = useState({
    backgroundImage: false,
    logo: false,
    subtitle: false,
    description: false,
    priceBox: false,
    ctaButtons: false,
    scrollIndicator: false,
  });

  const fitHeroToViewport = () => {
    const el = heroStackRef.current;
    if (!el) return;
    const navOffset = window.innerHeight <= 500 ? 80 : 24;
    const available = window.innerHeight - navOffset;
    const rect = el.getBoundingClientRect();
    const scale = Math.min(1, available / rect.height);
    setHeroScale(scale > 0 ? scale : 1);
  };

  useEffect(() => {
    const timers: number[] = [];

    timers.push(
      window.setTimeout(
        () =>
          setAnimationStates((prev) => ({ ...prev, backgroundImage: true })),
        HERO_ANIMATION_TIMELINE_MS.backgroundImage,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, logo: true })),
        HERO_ANIMATION_TIMELINE_MS.logo,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, subtitle: true })),
        HERO_ANIMATION_TIMELINE_MS.subtitle,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, description: true })),
        HERO_ANIMATION_TIMELINE_MS.description,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, priceBox: true })),
        HERO_ANIMATION_TIMELINE_MS.priceBox,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, ctaButtons: true })),
        HERO_ANIMATION_TIMELINE_MS.ctaButtons,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, scrollIndicator: true })),
        HERO_ANIMATION_TIMELINE_MS.scrollIndicator,
      ),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    let resizeRaf: number | null = null;

    const scheduleResize = () => {
      if (resizeRaf !== null) return;
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null;
        fitHeroToViewport();
      });
    };

    scheduleResize();
    window.addEventListener("resize", scheduleResize, { passive: true });
    window.addEventListener("orientationchange", scheduleResize);

    return () => {
      if (resizeRaf !== null) {
        window.cancelAnimationFrame(resizeRaf);
      }
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("orientationchange", scheduleResize);
    };
  }, []);

  return {
    animationStates,
    heroScale,
    heroStackRef,
  };
}
