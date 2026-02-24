import type { RefObject } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  animationStates: {
    backgroundImage: boolean;
    logo: boolean;
    subtitle: boolean;
    description: boolean;
    priceBox: boolean;
    ctaButtons: boolean;
    scrollIndicator: boolean;
  };
  scrollProgress: number;
  heroStackRef: RefObject<HTMLDivElement | null>;
  heroScale: number;
  language: "es" | "en";
  t: {
    hero: {
      subtitle: string;
      description: string;
      payment: string;
      handover: string;
    };
  };
  pricePrefix: string;
  priceString: string;
  scrollToSection: (sectionId: string) => void;
};

export function HeroSection({
  animationStates,
  scrollProgress,
  heroStackRef,
  heroScale,
  language,
  t,
  pricePrefix,
  priceString,
  scrollToSection,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="hero-section relative min-h-svh overflow-hidden pt-14 md:pt-0"
    >
      <div
        className="absolute inset-0 z-0 transition-all ease-out"
        style={{
          opacity: animationStates.backgroundImage ? 1 : 0,
          transform: animationStates.backgroundImage ? "scale(1)" : "scale(1.05)",
          filter: animationStates.logo
            ? `brightness(${0.55 + scrollProgress * 0.45}) saturate(${
                0.4 + scrollProgress * 0.6
              }) blur(${3 - scrollProgress * 3}px)`
            : "brightness(1) saturate(1) blur(0px)",
          transitionDuration: animationStates.logo ? "2000ms" : "700ms",
        }}
      >
        <Image
          src="/assets/imagenes/hero-background.png"
          alt="Azure Bay waterfront hero background"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
      </div>

      <div
        className="hero-content relative z-10 h-full flex flex-col items-center justify-center px-4"
        style={{
          opacity: 1 - scrollProgress,
          transition: "opacity 0.1s linear",
        }}
      >
        <div
          ref={heroStackRef as unknown as RefObject<HTMLDivElement>}
          className="hero-container container max-w-6xl mx-auto"
          style={{
            transform: heroScale < 1 ? `scale(${heroScale})` : undefined,
            transformOrigin: "top center",
          }}
        >
          <div
            translate="no"
            className="hero-stack flex flex-col items-center justify-center text-center space-y-2 mt-0"
          >
            <h1 className="sr-only">
              {language === "es"
                ? "Azure Bay - Caso de estudio inmobiliario premium"
                : "Azure Bay - Premium real estate portfolio case study"}
            </h1>
            <div
              className="transition-all ease-out mt-12 flex justify-center"
              suppressHydrationWarning
              style={{
                opacity: animationStates.logo ? 1 : 0,
                transform: animationStates.logo ? "scale(1)" : "scale(0.3)",
                filter: animationStates.logo ? "blur(0px)" : "blur(12px)",
                transitionDuration: "2500ms",
              }}
            >
              <Image
                src="/assets/imagenes/logo-azure-bay.webp"
                alt="Azure Bay Logo"
                width={384}
                height={384}
                className="h-44 sm:h-60 md:h-72 lg:h-80 xl:h-96 w-auto drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                priority
                sizes="(max-width: 640px) 176px, (max-width: 768px) 240px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
              />
            </div>

            <div
              className="transition-all ease-out"
              style={{
                opacity: animationStates.subtitle ? 1 : 0,
                transform: animationStates.subtitle ? "scale(1)" : "scale(0.3)",
                filter: animationStates.subtitle ? "blur(0px)" : "blur(12px)",
                transitionDuration: "2000ms",
              }}
            >
              <div className="hero-subtitle inline-block bg-black/65 sm:bg-black/55 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 border border-gold-warm/60 ring-2 ring-gold-warm/75 shadow-[0_0_40px_rgba(162,144,96,0.7)]">
                <p className="font-arabic text-gold-warm text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold tracking-[0.02em] sm:tracking-[0.04em] md:tracking-[0.06em] uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] whitespace-nowrap">
                  {t.hero.subtitle}
                </p>
              </div>
            </div>

            <div
              className="transition-all ease-out max-w-5xl"
              style={{
                opacity: animationStates.description ? 1 : 0,
                transform: animationStates.description ? "scale(1)" : "scale(0.3)",
                filter: animationStates.description ? "blur(0px)" : "blur(12px)",
                transitionDuration: "2000ms",
              }}
            >
              <div className="hero-description relative mx-auto px-2 max-w-4xl">
                <p className="relative text-[#FFFFFF] text-sm sm:text-base md:text-lg font-medium px-3 sm:px-6 py-2 sm:py-3 tracking-[0.01em] text-center leading-relaxed">
                  {t.hero.description}
                </p>
              </div>
            </div>

            <div
              className="transition-all ease-out"
              style={{
                opacity: animationStates.priceBox ? 1 : 0,
                transform: animationStates.priceBox ? "scale(1)" : "scale(0.3)",
                filter: animationStates.priceBox ? "blur(0px)" : "blur(12px)",
                transitionDuration: "2000ms",
              }}
            >
              <div className="relative">
                <div
                  className="hero-price-card rounded-2xl p-3 sm:p-4 shadow-2xl max-w-[90vw] sm:max-w-160 mx-auto transition-all duration-200 border-2 border-brown-dark/85 ring-2 ring-gold-warm/65 hover:-translate-y-[3px] hover:ring-gold-warm/85 hover:shadow-[0_24px_52px_rgba(0,0,0,0.6),0_0_56px_rgba(162,144,96,0.7)]"
                  style={{ backgroundColor: "#6E5F46" }}
                >
                  <div className="space-y-1.5 sm:space-y-2 text-center">
                    <div className="hero-price-value text-gold-warm text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap [text-shadow:1px_1px_3px_rgba(0,0,0,0.9)]">
                      {pricePrefix}
                      {"\u00A0"}
                      {priceString}
                    </div>
                    <div className="hero-price-payment text-cream-light text-xs sm:text-sm md:text-base font-medium [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
                      {t.hero.payment}
                    </div>
                    <div className="hero-price-handover text-cream-light text-xs sm:text-xs md:text-sm font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
                      {t.hero.handover}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="transition-all ease-out"
              style={{
                opacity: animationStates.ctaButtons ? 1 : 0,
                transform: animationStates.ctaButtons ? "scale(1)" : "scale(0.3)",
                filter: animationStates.ctaButtons ? "blur(0px)" : "blur(12px)",
                transitionDuration: "2000ms",
              }}
            >
              <div className="flex flex-col gap-3 items-center">
                <Button
                  onClick={() => scrollToSection("dossier")}
                  size="lg"
                  className="hero-cta bg-gold-warm text-brown-dark font-bold antialiased tracking-wide px-10 py-4 text-base sm:text-lg rounded-xl border-2 border-brown-dark/85 ring-2 ring-gold-warm/65 shadow-2xl transition-all duration-200 hover:bg-gold-warm/80 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(0,0,0,0.55),0_0_48px_rgba(162,144,96,0.65)] hover:ring-gold-warm/85 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <Download className="h-5 w-5" />
                    <span>
                      {language === "es" ? "Dossier Exclusivo" : "Exclusive Dossier"}
                    </span>
                  </span>
                </Button>

                <div
                  className="hero-scroll-indicator mt-2 hidden sm:flex justify-center pointer-events-none animate-bounce"
                  style={{
                    opacity: animationStates.scrollIndicator ? 1 : 0,
                    transform: animationStates.scrollIndicator
                      ? "translateY(0px)"
                      : "translateY(20px)",
                  }}
                >
                  <div className="w-6 h-10 border-2 border-yellow-400/70 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-yellow-400/80 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
