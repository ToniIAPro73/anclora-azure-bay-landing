import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type TopNavSectionProps = {
  showNavbar: boolean;
  scrollToSection: (sectionId: string) => void;
  language: "es" | "en";
  t: any;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuLabels: { open: string; close: string };
};

export function TopNavSection({
  showNavbar,
  scrollToSection,
  language,
  t,
  showMenu,
  setShowMenu,
  mobileMenuLabels,
}: TopNavSectionProps) {
  return (
    <nav
      className={`landing-nav fixed top-0 left-0 right-0 z-50 bg-cream-light/98 backdrop-blur-md border-b border-brown-dark/10 shadow-sm transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="landing-nav__inner container mx-auto px-4 md:px-6">
        <div className="landing-nav__bar flex items-center justify-between h-14 md:h-16">
          <div className="shrink-0">
            <button
              onClick={() => scrollToSection("anclora")}
              aria-label={language === "es" ? "Ir a Anclora" : "Go to Anclora"}
              className="group relative text-brown-dark text-base md:text-lg font-bold tracking-tight transition-all duration-300 hover:text-gold-warm py-2 px-3 rounded-lg"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              <span className="relative">
                ANCLORA
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-gold-warm via-[#8B7355] to-transparent group-hover:w-full transition-all duration-500 ease-out" />
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            <button
              onClick={() => scrollToSection("wynn-effect")}
              aria-label={t.menu.wynnEffect}
              className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-xs md:text-sm font-normal px-2 md:px-3 py-2 hover:underline underline-offset-4 decoration-gold-warm hover:-translate-y-0.5"
            >
              {t.menu.wynnEffect}
            </button>
            <button
              onClick={() => scrollToSection("investment")}
              aria-label={t.menu.investment}
              className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-xs md:text-sm font-normal px-2 md:px-3 py-2 hover:underline underline-offset-4 decoration-gold-warm hover:-translate-y-0.5"
            >
              {t.menu.investment}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              aria-label={t.menu.features}
              className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-xs md:text-sm font-normal px-2 md:px-3 py-2 hover:underline underline-offset-4 decoration-gold-warm hover:-translate-y-0.5"
            >
              {t.menu.features}
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              aria-label={t.menu.gallery}
              className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-xs md:text-sm font-normal px-2 md:px-3 py-2 hover:underline underline-offset-4 decoration-gold-warm hover:-translate-y-0.5"
            >
              {t.menu.gallery}
            </button>
            <button
              onClick={() => scrollToSection("apartments")}
              aria-label={t.menu.apartments}
              className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-xs md:text-sm font-normal px-2 md:px-3 py-2 hover:underline underline-offset-4 decoration-gold-warm hover:-translate-y-0.5"
            >
              {t.menu.apartments}
            </button>
            <button
              onClick={() => scrollToSection("location")}
              aria-label={t.menu.location}
              className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-xs md:text-sm font-normal px-2 md:px-3 py-2 hover:underline underline-offset-4 decoration-gold-warm hover:-translate-y-0.5"
            >
              {t.menu.location}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              aria-label={t.menu.faq}
              className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-xs md:text-sm font-normal px-2 md:px-3 py-2 hover:underline underline-offset-4 decoration-gold-warm hover:-translate-y-0.5"
            >
              {t.menu.faq}
            </button>
          </div>

          <div className="hidden md:block shrink-0">
            <Button
              onClick={() => scrollToSection("dossier")}
              className="bg-gold-warm hover:bg-gold-warm/90 text-brown-dark font-semibold px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm rounded-md shadow-md transition-all duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {language === "es" ? "Dossier Exclusivo" : "Exclusive Dossier"}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden text-brown-dark hover:text-gold-warm p-2"
            aria-label={showMenu ? mobileMenuLabels.close : mobileMenuLabels.open}
            aria-expanded={showMenu}
            aria-controls="mobile-nav-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {showMenu ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {showMenu && (
          <div
            id="mobile-nav-menu"
            className="md:hidden py-4 border-t border-brown-dark/10 bg-cream-light"
          >
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("wynn-effect")}
                aria-label={t.menu.wynnEffect}
                className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-sm font-normal text-left py-2 hover:underline underline-offset-4 decoration-gold-warm"
              >
                {t.menu.wynnEffect}
              </button>
              <button
                onClick={() => scrollToSection("investment")}
                aria-label={t.menu.investment}
                className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-sm font-normal text-left py-2 hover:underline underline-offset-4 decoration-gold-warm"
              >
                {t.menu.investment}
              </button>
              <button
                onClick={() => scrollToSection("features")}
                aria-label={t.menu.features}
                className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-sm font-normal text-left py-2 hover:underline underline-offset-4 decoration-gold-warm"
              >
                {t.menu.features}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                aria-label={t.menu.gallery}
                className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-sm font-normal text-left py-2 hover:underline underline-offset-4 decoration-gold-warm"
              >
                {t.menu.gallery}
              </button>
              <button
                onClick={() => scrollToSection("apartments")}
                aria-label={t.menu.apartments}
                className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-sm font-normal text-left py-2 hover:underline underline-offset-4 decoration-gold-warm"
              >
                {t.menu.apartments}
              </button>
              <button
                onClick={() => scrollToSection("location")}
                aria-label={t.menu.location}
                className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-sm font-normal text-left py-2 hover:underline underline-offset-4 decoration-gold-warm"
              >
                {t.menu.location}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                aria-label={t.menu.faq}
                className="text-brown-dark/70 hover:text-brown-dark transition-all duration-200 text-sm font-normal text-left py-2 hover:underline underline-offset-4 decoration-gold-warm"
              >
                {t.menu.faq}
              </button>
              <Button
                onClick={() => scrollToSection("dossier")}
                size="sm"
                className="bg-gold-warm hover:bg-gold-warm/90 text-brown-dark font-semibold px-4 py-1.5 text-xs rounded-md shadow-md w-full mt-2 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {language === "es" ? "Dossier Exclusivo" : "Exclusive Dossier"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
