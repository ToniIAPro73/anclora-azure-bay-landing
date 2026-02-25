import type React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type FloatingControlsProps = {
  scrollPosition: "top" | "middle" | "bottom";
  scrollToTop: () => void;
  scrollToBottom: () => void;
  language: "es" | "en";
  languageToggleAriaLabel: string;
  languageToggleTitle: string;
  setLanguage: React.Dispatch<React.SetStateAction<"es" | "en">>;
};

export function FloatingControls({
  scrollPosition,
  scrollToTop,
  scrollToBottom,
  language,
  languageToggleAriaLabel,
  languageToggleTitle,
  setLanguage,
}: FloatingControlsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end gap-3">
      <div className="flex flex-col gap-2">
        {(scrollPosition === "middle" || scrollPosition === "bottom") && (
          <button
            onClick={scrollToTop}
            aria-label={language === "es" ? "Ir al inicio" : "Go to top"}
            className="group w-12 h-12 rounded-full bg-linear-to-br from-brown-dark via-taupe-medium to-brown-dark border-2 border-gold-warm/30 hover:border-gold-warm/60 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(162,144,96,0.4)] transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
          >
            <ChevronUp
              className="w-6 h-6 text-gold-warm group-hover:text-white transition-colors duration-300"
              strokeWidth={3}
            />
          </button>
        )}

        {(scrollPosition === "top" || scrollPosition === "middle") && (
          <button
            onClick={scrollToBottom}
            aria-label={language === "es" ? "Ir al final" : "Go to bottom"}
            className="group w-12 h-12 rounded-full bg-linear-to-br from-brown-dark via-taupe-medium to-brown-dark border-2 border-gold-warm/30 hover:border-gold-warm/60 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(162,144,96,0.4)] transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
          >
            <ChevronDown
              className="w-6 h-6 text-gold-warm group-hover:text-white transition-colors duration-300"
              strokeWidth={3}
            />
          </button>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
        className="bg-white/95 backdrop-blur-sm border-brown-dark/20 hover:bg-cream-light text-brown-dark shadow-lg rounded-full px-4 py-2"
        aria-label={languageToggleAriaLabel}
        title={languageToggleTitle}
      >
        <span className={language === "es" ? "font-bold" : "opacity-60"}>ES</span>
        <span className="mx-2 text-brown-dark/40">|</span>
        <span className={language === "en" ? "font-bold" : "opacity-60"}>EN</span>
      </Button>
    </div>
  );
}
