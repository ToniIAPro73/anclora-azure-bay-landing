import { useEffect, useRef, useState } from "react";

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
    const startAnimationSequence = () => {
      setAnimationStates((prev) => ({ ...prev, backgroundImage: true }));
      setTimeout(() => setAnimationStates((prev) => ({ ...prev, logo: true })), 300);
      setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, subtitle: true })),
        800,
      );
      setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, description: true })),
        1300,
      );
      setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, priceBox: true })),
        1800,
      );
      setTimeout(
        () => setAnimationStates((prev) => ({ ...prev, ctaButtons: true })),
        2300,
      );
      setTimeout(
        () =>
          setAnimationStates((prev) => ({ ...prev, scrollIndicator: true })),
        2800,
      );
    };
    startAnimationSequence();
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
