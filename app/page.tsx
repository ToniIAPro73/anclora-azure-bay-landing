"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import HubSpotScript from "./HubSpotScript";
import {
  ALTCHA_TRANSLATIONS,
  SITE_URL,
  type LeadAutomationPayload,
  type LeadAutomationResult,
  type LeadFieldKey,
} from "./landing-config";
import { landingContent } from "./landing-content";
import { HeroSection } from "./sections/hero-section";
import { FooterSection } from "./sections/footer-section";
import { LocationSection } from "./sections/location-section";
import { LeadFormSection } from "./sections/lead-form-section";
import { GallerySection } from "./sections/gallery-section";
import { ApartmentsSection } from "./sections/apartments-section";
import { FaqSection } from "./sections/faq-section";
import { FloatingControls } from "./sections/floating-controls";
import { useLandingController } from "./hooks/use-landing-controller";
import { Button } from "@/components/ui/button";
import {
  Globe,
  MapPin,
  Home,
  Star,
  Users,
  Phone,
  TrendingUp,
  Calendar,
  DollarSign,
  Award,
  CheckCircle2,
  Download,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Bot,
} from "lucide-react";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "altcha-widget": JSX.IntrinsicElements["div"] & {
        challengeurl: string;
        name?: string;
        hidefooter?: string;
        hidelogo?: string;
        strings?: string;
        language?: "es" | "en";
        theme?: string;
      };
    }
  }
}

export default function AzureBayLanding() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [activeGalleryTab, setActiveGalleryTab] = useState<
    "servicios" | "interior" | "sitios" | "video"
  >("servicios");
  const { animationStates, heroScale, heroStackRef } = useLandingController();
  const [visibleSections, setVisibleSections] = useState({
    wynnEffect: false,
    investment: false,
    features: false,
    gallery: false,
    apartments: false,
    trust: false,
    location: false,
    faq: false,
    leadForm: false,
    footer: false,
  });

  const [showMenu, setShowMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState<
    "top" | "middle" | "bottom"
  >("top");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [automationFeedback, setAutomationFeedback] = useState<{
    type: "success" | "error";
    userName: string;
  } | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [hasLoadedHubSpotScript, setHasLoadedHubSpotScript] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{
    field: LeadFieldKey;
    message: string;
  } | null>(null);
  const [activeApartment, setActiveApartment] = useState<
    "studio" | "oneBed" | "twoBed" | "threeBed"
  >("studio");
  const [activeAzureBayTab, setActiveAzureBayTab] = useState(0);
  const [locationView, setLocationView] = useState<"map" | "collage">("map");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);
  const altchaRef = useRef<HTMLDivElement>(null);

  // Clear validation message when language changes
  useEffect(() => {
    if (validationMessage) {
      setValidationMessage(null);
    }
  }, [language, validationMessage]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    let scrollRaf: number | null = null;

    const updateScrollState = () => {
      const currentScroll = window.scrollY;

      // Calculate scroll progress for hero section (0 to 1)
      const heroHeight = window.innerHeight;
      const progress = Math.min(currentScroll / heroHeight, 1);
      setScrollProgress(progress);

      // Show navbar after scrolling past hero section
      setShowNavbar(currentScroll > window.innerHeight * 0.8);

      // Determine scroll position for navigation buttons
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollableHeight = scrollHeight - clientHeight;
      const scrollPercentage =
        scrollableHeight > 0 ? (currentScroll / scrollableHeight) * 100 : 0;

      if (scrollPercentage < 15) {
        setScrollPosition("top");
      } else if (scrollPercentage > 85) {
        setScrollPosition("bottom");
      } else {
        setScrollPosition("middle");
      }

      const checkSectionVisibility = (
        ref: React.RefObject<HTMLDivElement | null>,
        sectionKey: keyof typeof visibleSections
      ) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setVisibleSections((prev) => ({
          ...prev,
          [sectionKey]: isVisible || currentScroll > 300,
        }));
      };
      checkSectionVisibility(wynnEffectRef, "wynnEffect");
      checkSectionVisibility(investmentRef, "investment");
      checkSectionVisibility(featuresRef, "features");
      checkSectionVisibility(galleryRef, "gallery");
      checkSectionVisibility(apartmentsRef, "apartments");
      checkSectionVisibility(trustRef, "trust");
      checkSectionVisibility(locationRef, "location");
      checkSectionVisibility(faqRef, "faq");
      checkSectionVisibility(leadFormRef, "leadForm");
      checkSectionVisibility(footerRef, "footer");
      scrollRaf = null;
    };

    const onScroll = () => {
      if (scrollRaf !== null) return;
      scrollRaf = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();

    return () => {
      if (scrollRaf !== null) {
        window.cancelAnimationFrame(scrollRaf);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!visibleSections.leadForm && !privacyAccepted) return;
    let cancelled = false;

    (async () => {
      const globalAny = window as any;
      if (!globalAny.__altchaI18nLoaded) {
        try {
          await Promise.all([
            import("altcha/i18n/en"),
            import("altcha/i18n/es-es"),
          ]);
          globalAny.__altchaI18nLoaded = true;
        } catch (error) {
          console.error("[ALTCHA] Unable to load i18n bundle:", error);
          return;
        }
      }

      if (cancelled) return;
      const registry = globalAny.altchaI18n;
      if (!registry) return;

      (["es", "en"] as const).forEach((locale) => {
        registry.set(locale, {
          ...(registry.get(locale) ?? {}),
          ...ALTCHA_TRANSLATIONS[locale],
        });
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [language, visibleSections.leadForm, privacyAccepted]);

  useEffect(() => {
    if (privacyAccepted && !hasLoadedHubSpotScript) {
      setHasLoadedHubSpotScript(true);
    }
  }, [privacyAccepted, hasLoadedHubSpotScript]);

  const wynnEffectRef = useRef<HTMLDivElement>(null);
  const investmentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const apartmentsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const leadFormRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const content = landingContent;
  const t = content[language];
  const priceString = language === "es" ? "192.000€" : "£172,000";
  const pricePrefix = language === "es" ? "Desde" : "Starting from";
  const mobileMenuLabels =
    language === "es"
      ? { open: "Abrir menú de navegación", close: "Cerrar menú de navegación" }
      : { open: "Open navigation menu", close: "Close navigation menu" };
  const languageToggleTitle =
    language === "es"
      ? "Cambia el idioma a inglés"
      : "Switch language to Spanish";

  const apartmentConfigs = {
    studio: {
      image: "/assets/imagenes/studio-1.webp",
      sizeSqftRange: [300, 462] as [number, number],
      bedrooms: 0,
      bathrooms: 1,
    },
    oneBed: {
      image: "/assets/imagenes/1-bedroom-1.webp",
      sizeSqftRange: [600, 850] as [number, number],
      bedrooms: 1,
      bathrooms: 1,
    },
    twoBed: {
      image: "/assets/imagenes/2-bedroom-1.webp",
      sizeSqftRange: [1100, 1200] as [number, number],
      bedrooms: 2,
      bathrooms: 1,
    },
    threeBed: {
      image: "/assets/imagenes/3-bedroom-1.webp",
      sizeSqftRange: [1700, 1800] as [number, number],
      bedrooms: 3,
      bathrooms: 2,
    },
  };

  const apartmentPrices = {
    studio: { en: "£172,000", es: "192.000€" },
    oneBed: { en: "£325,000", es: "370.000€" },
    twoBed: { en: "£526,000", es: "598.000€" },
    threeBed: { en: "£795,000", es: "905.000€" },
  } as const;

  const formatSizeRange = (range: [number, number]) => {
    if (language === "es") {
      const sqm = range.map((value) => Math.round(value / 10.7639));
      return `${sqm[0]}-${sqm[1]} m²`;
    }
    return `${range[0]}-${range[1]} sq ft`;
  };

  const formatBedroomValue = (count: number) => {
    if (count === 0) {
      return language === "es" ? "Estudio" : "Studio";
    }
    const plural = count > 1;
    return language === "es"
      ? `${count} ${plural ? "habitaciones" : "habitación"}`
      : `${count} ${plural ? "bedrooms" : "bedroom"}`;
  };

  const formatBathroomValue = (count: number) => {
    const valueString =
      language === "es" ? count.toString().replace(".", ",") : count.toString();
    const plural = count > 1;
    return language === "es"
      ? `${valueString} ${plural ? "baños" : "baño"}`
      : `${valueString} ${plural ? "baths" : "bath"}`;
  };

  const infoLabels = {
    size: language === "es" ? "Superficie" : "Interior size",
    price: language === "es" ? "Desde" : "From",
    bedrooms: language === "es" ? "Dormitorios" : "Bedrooms",
    bathrooms: language === "es" ? "Baños" : "Bathrooms",
    parking: "Parking",
  };

  const statCardBaseClasses =
    "rounded-2xl border border-gold-warm/30 p-4 shadow-sm bg-linear-to-br from-[#fdf9f3] via-[#f7ede1] to-[#f1e2d3] text-brown-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:brightness-95";

  const apartmentCopy = t.apartments.tabs[activeApartment];
  const activeApartmentConfig = apartmentConfigs[activeApartment];
  const activeApartmentPrice = apartmentPrices[activeApartment][language];
  const highlightItems = [...apartmentCopy.highlights, t.apartments.note];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: "Azure Bay",
    description:
      language === "es"
        ? "Residencias frente al mar en Azure Bay District con entrega llave en mano y plan 1% mensual."
        : "Seafront residences in Azure Bay District with turnkey delivery and a 1% monthly plan.",
    url: SITE_URL,
    image: `${SITE_URL}/assets/imagenes/hero-background.png`,
    offers: [
      {
        "@type": "AggregateOffer",
        priceCurrency: "GBP",
        lowPrice: "172000",
        highPrice: "795000",
        offerCount: 4,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: "192000",
        highPrice: "905000",
        offerCount: 4,
        availability: "https://schema.org/InStock",
      },
    ],
    seller: {
      "@type": "Organization",
      name: "Anclora Private Estates",
      url: "https://www.ancloraprivateestates.com",
    },
  };
  const featureColumns = [
    t.leadForm.features.slice(0, 2),
    t.leadForm.features.slice(2),
  ];
  const LuxuryBadge = ({
    label,
    alignment = "center",
  }: {
    label: string;
    alignment?: "start" | "center";
  }) => (
    <div
      className={`inline-flex w-full ${
        alignment === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <div className="relative px-10 py-3.5 rounded-full border-2 border-[#A29060] bg-linear-to-br from-[#f5f1ea]/95 via-white/90 to-[#ede8df]/95 text-[#A29060] font-bold tracking-[0.35em] shadow-[0_8px_32px_rgba(162,144,96,0.3),0_0_0_1px_rgba(162,144,96,0.2)_inset,0_1px_2px_rgba(255,255,255,0.8)_inset] backdrop-blur-md overflow-hidden group transition-all duration-500 hover:shadow-[0_16px_48px_rgba(162,144,96,0.6),0_0_60px_rgba(162,144,96,0.3),0_0_0_2px_rgba(162,144,96,0.5)_inset,0_2px_4px_rgba(255,255,255,1)_inset] hover:scale-105 hover:border-[#d4b876] cursor-pointer">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#A29060]/60 to-transparent group-hover:via-[#d4b876] transition-all duration-500"></div>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
        <div className="absolute inset-0 bg-linear-to-br from-[#A29060]/0 via-[#A29060]/0 to-[#A29060]/0 group-hover:from-[#A29060]/10 group-hover:via-white/20 group-hover:to-[#d4b876]/10 transition-all duration-500"></div>
        <div
          className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #A29060 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        ></div>
        <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(162,144,96,0.4)] transition-all duration-500 uppercase tracking-[0.35em] text-xs md:text-sm">
          {label}
        </span>
      </div>
    </div>
  );
  const nameLabel = language === "es" ? "Nombre completo" : "Full name";
  const emailLabel = "Email";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setShowMenu(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const showBackToHero = scrollProgress >= 1;

  const orchestrateLeadAutomation = async (
    payload: LeadAutomationPayload
  ): Promise<LeadAutomationResult> => {
    const getHubSpotCookie = () => {
      if (typeof document === "undefined") return "";
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "hubspotutk") {
          return value;
        }
      }
      return "";
    };

    const hubspotutk = getHubSpotCookie() || `generated_${Date.now()}`;
    const pageUri =
      typeof window !== "undefined" ? window.location.href : SITE_URL;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12_000);
    let response: Response;
    try {
      response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          firstName: payload.firstName,
          lastName: payload.lastName,
          fullName: payload.fullName,
          email: payload.email,
          language: payload.language,
          hubspotutk,
          pageUri,
          utm: payload.utm,
          altchaPayload: payload.altchaPayload,
          companyWebsite: payload.honeypot ?? "",
        }),
      });
    } finally {
      window.clearTimeout(timeoutId);
    }

    if (!response.ok) {
      let errorMessage = "Error procesando lead";
      try {
        const errorData = await response.json();
        errorMessage = errorData?.error || errorMessage;
      } catch {
        // swallow
      }
      throw new Error(errorMessage);
    }

    return response.json();
  };

  const fieldErrorCopy: Record<LeadFieldKey, string> = {
    firstName:
      language === "es"
        ? "Indica tu nombre para personalizar el dossier."
        : "Please include your first name so we can personalize the dossier.",
    lastName:
      language === "es"
        ? "Añade tus apellidos para continuar."
        : "Please add your last name to continue.",
    email:
      language === "es"
        ? "Necesitamos tu email para enviarte el dossier."
        : "We need your email address to deliver the dossier.",
    privacy:
      language === "es"
        ? "Debes aceptar la política de privacidad para recibir el dossier."
        : "You must accept the privacy policy before receiving the dossier.",
    captcha:
      language === "es"
        ? "Completa la verificación de seguridad para continuar."
        : "Please complete the security verification to continue.",
  };

  const emailInvalidCopy =
    language === "es"
      ? "Introduce un correo electrónico válido."
      : "Please enter a valid email address.";
  const altchaErrorCopy =
    language === "es"
      ? "Completa la verificación de seguridad antes de solicitar el dossier."
      : "Please complete the security verification before requesting the dossier.";

  const altchaTitle =
    language === "es"
      ? "Protección ALTCHA sin fricción"
      : "ALTCHA frictionless protection";
  const altchaCopy =
    language === "es"
      ? "ALTCHA verifica silenciosamente en tu dispositivo sin rastrear ni mostrar badges ajenos. Mantiene fuera a los bots sin romper la experiencia de lujo."
      : "ALTCHA verifies silently on-device with zero tracking or foreign badges, blocking bots without breaking the luxury experience.";
  const altchaStrings =
    language === "es"
      ? '{"label":"Verificando...","verified":"✓ Verificado","failed":"Vuelve a intentarlo"}'
      : '{"label":"Verifying...","verified":"✓ Verified","failed":"Please try again"}';
  const consentTitle =
    language === "es" ? "Privacidad de datos" : "Data privacy";
  const consentCopy =
    language === "es"
      ? "Añade un campo de privacidad de datos cuando necesites el consentimiento explícito de tus contactos. Refuerza la confianza y mantiene la trazabilidad legal."
      : "Add a dedicated data-privacy field whenever you need your contacts' consent. It reinforces trust and keeps compliance effortless.";
  const privacyCheckboxLabel =
    language === "es"
      ? "Acepto la política de privacidad y autorizo el uso de mis datos para recibir el dossier personalizado."
      : "I accept the privacy policy and authorise the use of my data to receive the personalised dossier.";

  const focusField = (
    ref: { current: HTMLElement | null },
    field: LeadFieldKey,
    message: string
  ) => {
    setValidationMessage({ field, message });
    requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (ref.current instanceof HTMLElement) {
        ref.current.focus();
      }
    });
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const urlParams = new URLSearchParams(window.location.search);
    const utmData: Record<string, string> = {
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    };

    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();
    const trimmedEmail = formData.email.trim();
    const fallbackName = language === "es" ? "inversor" : "investor";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedFirstName) {
      focusField(firstNameRef, "firstName", fieldErrorCopy.firstName);
      return;
    }

    if (!trimmedLastName) {
      focusField(lastNameRef, "lastName", fieldErrorCopy.lastName);
      return;
    }

    if (!trimmedEmail) {
      focusField(emailRef, "email", fieldErrorCopy.email);
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      focusField(emailRef, "email", emailInvalidCopy);
      return;
    }

    const formElement = event.currentTarget;
    const formEntries = new FormData(formElement);
    const altchaPayload = formEntries.get("altcha_payload")?.toString() ?? "";
    const honeypot = formEntries.get("companyWebsite")?.toString() ?? "";

    if (!altchaPayload) {
      focusField(altchaRef, "captcha", altchaErrorCopy);
      return;
    }

    if (!privacyAccepted) {
      focusField(privacyRef, "privacy", fieldErrorCopy.privacy);
      return;
    }

    setIsSubmitting(true);
    setAutomationFeedback(null);
    setValidationMessage(null);

    try {
      const leadData: LeadAutomationPayload = {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        fullName: `${trimmedFirstName} ${trimmedLastName}`.trim(),
        email: trimmedEmail,
        language,
        utm: utmData,
        altchaPayload,
        honeypot,
      };

      const result = await orchestrateLeadAutomation(leadData);

      if (result?.pdf_url) {
        const absoluteUrl = result.pdf_url.startsWith("http")
          ? result.pdf_url
          : `${window.location.origin}${result.pdf_url}`;
        const link = document.createElement("a");
        link.href = absoluteUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setAutomationFeedback({
        type: "success",
        userName: trimmedFirstName || fallbackName,
      });
      setFormData({ firstName: "", lastName: "", email: "" });
      setPrivacyAccepted(false);

      setTimeout(() => {
        setAutomationFeedback(null);
      }, 5000);
    } catch (error) {
      console.error("Lead automation failed", error);
      setAutomationFeedback({
        type: "error",
        userName: "",
      });

      setTimeout(() => {
        setAutomationFeedback(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-light">
      <Head>
        <link
          rel="preconnect"
          href="https://js-eu1.hs-scripts.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://js-eu1.hscollectedforms.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://js-eu1.hs-analytics.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://track-eu1.hubspot.com"
          crossOrigin="anonymous"
        />
      </Head>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {(visibleSections.leadForm || privacyAccepted) && (
        <Script
          src="/vendor/altcha.js"
          type="module"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      )}
      {hasLoadedHubSpotScript && <HubSpotScript />}
      <FloatingControls
        scrollPosition={scrollPosition}
        scrollToTop={scrollToTop}
        scrollToBottom={scrollToBottom}
        language={language}
        languageToggleTitle={languageToggleTitle}
        setLanguage={setLanguage}
      />

      {/* Sticky Navigation Menu - Anclora Style */}
      <nav
        className={`landing-nav fixed top-0 left-0 right-0 z-50 bg-cream-light/98 backdrop-blur-md border-b border-brown-dark/10 shadow-sm transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="landing-nav__inner container mx-auto px-4 md:px-6">
          <div className="landing-nav__bar flex items-center justify-between h-14 md:h-16">
            {/* Logo Anclora */}
            <div className="shrink-0">
              <button
                onClick={() => scrollToSection("anclora")}
                aria-label={
                  language === "es" ? "Ir a Anclora" : "Go to Anclora"
                }
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

            {/* Desktop Menu - Centered (shows on tablet landscape and up) */}
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

            {/* Book Now Button - Desktop */}
            <div className="hidden md:block shrink-0">
              <Button
                onClick={() => scrollToSection("dossier")}
                className="bg-gold-warm hover:bg-gold-warm/90 text-brown-dark font-semibold px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm rounded-md shadow-md transition-all duration-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {language === "es" ? "Dossier Exclusivo" : "Exclusive Dossier"}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden text-brown-dark hover:text-gold-warm p-2"
              aria-label={
                showMenu ? mobileMenuLabels.close : mobileMenuLabels.open
              }
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

          {/* Mobile Menu Dropdown */}
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
                  {language === "es"
                    ? "Dossier Exclusivo"
                    : "Exclusive Dossier"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ==================== SECCIÓN: HERO ==================== */}
      <HeroSection
        animationStates={animationStates}
        scrollProgress={scrollProgress}
        heroStackRef={heroStackRef}
        heroScale={heroScale}
        language={language}
        t={t}
        pricePrefix={pricePrefix}
        priceString={priceString}
        scrollToSection={scrollToSection}
      />

      {/* ==================== SECCIÓN: WYNN EFFECT ==================== */}
      {/* Azure Marina Effect */}
      <section
        id="wynn-effect"
        ref={wynnEffectRef}
        className="relative py-20 md:py-32 bg-linear-to-br from-brown-dark via-brown-dark to-olive-brown overflow-hidden"
        style={{
          opacity: visibleSections.wynnEffect ? 1 : 0,
          transform: visibleSections.wynnEffect
            ? "translateY(0px)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${`var(--gold-warm)`} 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <LuxuryBadge
              label={
                language === "es"
                  ? "Oportunidad Histórica"
                  : "Historic Opportunity"
              }
            />
            <h2
              className="text-4xl md:text-6xl font-light text-cream-light mb-6 font-arabic"
              style={{
                opacity: visibleSections.wynnEffect ? 1 : 0,
                transform: visibleSections.wynnEffect
                  ? "translateY(0px)"
                  : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
              }}
            >
              {t.wynnEffect.title}
            </h2>
            <h3
              className="text-xl md:text-2xl text-gold-warm mb-8"
              style={{
                opacity: visibleSections.wynnEffect ? 1 : 0,
                transform: visibleSections.wynnEffect
                  ? "translateY(0px)"
                  : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
              }}
            >
              {t.wynnEffect.subtitle}
            </h3>
            <p
              className="text-cream-light/90 text-base md:text-lg leading-relaxed"
              style={{
                opacity: visibleSections.wynnEffect ? 1 : 0,
                transform: visibleSections.wynnEffect
                  ? "translateY(0px)"
                  : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
              }}
            >
              {t.wynnEffect.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 max-w-6xl mx-auto">
            {t.wynnEffect.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gold-warm/40 rounded-2xl p-8 text-center shadow-xl hover:border-gold-warm hover:shadow-2xl hover:shadow-gold-warm/30 transition-all duration-300 hover:-translate-y-2"
                style={{
                  opacity: visibleSections.wynnEffect ? 1 : 0,
                  transform: visibleSections.wynnEffect
                    ? "translateY(0px)"
                    : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
                    0.4 + index * 0.1
                  }s`,
                }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-gold-warm/20 p-4 rounded-full">
                    <stat.icon className="h-10 w-10 text-gold-warm" />
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-gold-warm mb-3">
                  {stat.value}
                </div>
                <h4 className="text-brown-dark text-lg md:text-xl font-semibold mb-2">
                  {stat.label}
                </h4>
                <p className="text-taupe-warm text-sm">{stat.sublabel}</p>
              </div>
            ))}
          </div>

          {/* Urgency Banner */}
          <div
            className="max-w-4xl mx-auto bg-linear-to-r from-gold-warm/20 via-gold-warm/30 to-gold-warm/20 border-2 border-gold-warm rounded-2xl p-8 md:p-12"
            style={{
              opacity: visibleSections.wynnEffect ? 1 : 0,
              transform: visibleSections.wynnEffect
                ? "translateY(0px)"
                : "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s",
            }}
          >
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-cream-light mb-4">
                {t.wynnEffect.urgency.title}
              </h3>
              <p className="text-cream-light/90 text-base md:text-lg leading-relaxed mb-6">
                {t.wynnEffect.urgency.description}
              </p>
              <div className="inline-block bg-brown-dark/50 rounded-lg px-6 py-3 border border-gold-warm/40">
                <p className="text-gold-warm font-semibold text-sm md:text-base tracking-wide">
                  {t.wynnEffect.urgency.countdown}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MENÚ: INVERSIÓN ==================== */}
      {/* INVESTMENT_1: OPORTUNIDAD DE INVERSIÓN */}
      <section
        id="investment"
        ref={investmentRef}
        translate="no"
        className="relative py-24 bg-white"
        style={{
          opacity: visibleSections.investment ? 1 : 0,
          transform: visibleSections.investment
            ? "translateY(0px)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-light text-brown-dark mb-6"
                style={{
                  opacity: visibleSections.investment ? 1 : 0,
                  transform: visibleSections.investment
                    ? "translateY(0px)"
                    : "translateY(20px)",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {t.investment.title}
              </h2>
              <h3
                className="text-2xl text-gold-warm mb-8"
                style={{
                  opacity: visibleSections.investment ? 1 : 0,
                  transform: visibleSections.investment
                    ? "translateY(0px)"
                    : "translateY(20px)",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                }}
              >
                {t.investment.subtitle}
              </h3>
              <p
                className="text-taupe-warm text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
                style={{
                  opacity: visibleSections.investment ? 1 : 0,
                  transform: visibleSections.investment
                    ? "translateY(0px)"
                    : "translateY(20px)",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                }}
              >
                {t.investment.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {t.investment.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-cream-light border-2 border-gold-warm/30 rounded-2xl p-6 hover:border-gold-warm hover:shadow-xl hover:shadow-gold-warm/10 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    opacity: visibleSections.investment ? 1 : 0,
                    transform: visibleSections.investment
                      ? "translateY(0px)"
                      : "translateY(30px)",
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
                      0.3 + index * 0.1
                    }s`,
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-gold-warm/20 p-3 rounded-full">
                      <stat.icon className="h-8 w-8 text-gold-warm" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gold-warm mb-2 text-center">
                    {stat.value}
                  </div>
                  <h4 className="text-brown-dark font-semibold mb-2 text-center text-sm md:text-base">
                    {stat.label}
                  </h4>
                  <p className="text-taupe-warm text-xs md:text-sm text-center leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {t.investment.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start p-5 bg-cream-light/50 rounded-xl border border-gold-warm/20 hover:bg-cream-light hover:border-gold-warm/40 transition-all duration-300"
                  style={{
                    opacity: visibleSections.investment ? 1 : 0,
                    transform: visibleSections.investment
                      ? "translateY(0px)"
                      : "translateY(20px)",
                    transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
                      0.7 + index * 0.1
                    }s`,
                  }}
                >
                  <CheckCircle2 className="h-6 w-6 text-gold-warm mr-3 shrink-0 mt-0.5" />
                  <span className="text-brown-dark text-left text-sm md:text-base">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT_2: PLAN DE PAGO */}
      <section
        className="relative py-24 bg-cream-light"
        style={{
          opacity: visibleSections.investment ? 1 : 0,
          transform: visibleSections.investment
            ? "translateY(0px)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light text-brown-dark mb-6">
                {t.paymentPlan.title}
              </h2>
              <p className="text-taupe-warm text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                {t.paymentPlan.subtitle}
              </p>
            </div>

            {/* Main Payment Structure */}
            <div className="max-w-4xl mx-auto mb-16">
              {/* 40% / 60% Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="group relative overflow-hidden text-center p-8 bg-linear-to-br from-[#f5f1ea] via-[#ede8df] to-[#e8e3d8] rounded-3xl border-2 border-gold-warm/40 shadow-lg hover:shadow-2xl hover:border-gold-warm/60 transition-all duration-500">
                  <div className="absolute inset-0 bg-linear-to-br from-gold-warm/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-gold-warm/50 to-transparent group-hover:via-gold-warm transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="text-6xl md:text-7xl font-light text-gold-warm mb-2 group-hover:text-[#8B7355] transition-colors duration-300">
                      {t.paymentPlan.mainPayment}
                    </div>
                    <p className="text-taupe-warm text-sm md:text-base mb-4 font-medium">
                      {t.paymentPlan.mainLabel}
                    </p>
                    <p className="text-brown-dark text-xs md:text-sm leading-relaxed">
                      {t.paymentPlan.description}
                    </p>
                  </div>
                </div>

                <div className="group relative overflow-hidden text-center p-8 bg-linear-to-br from-[#f5f1ea] via-[#ede8df] to-[#e8e3d8] rounded-3xl border-2 border-gold-warm/40 shadow-lg hover:shadow-2xl hover:border-gold-warm/60 transition-all duration-500">
                  <div className="absolute inset-0 bg-linear-to-br from-gold-warm/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-gold-warm/50 to-transparent group-hover:via-gold-warm transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="text-6xl md:text-7xl font-light text-gold-warm mb-2 group-hover:text-[#8B7355] transition-colors duration-300">
                      {t.paymentPlan.postHandover}
                    </div>
                    <p className="text-taupe-warm text-sm md:text-base mb-4 font-medium">
                      {t.paymentPlan.postLabel}
                    </p>
                    <p className="text-brown-dark text-xs md:text-sm leading-relaxed">
                      {t.paymentPlan.postDetails}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="mb-12">
                <div className="flex gap-0 h-16 rounded-full overflow-hidden shadow-lg border-2 border-gold-warm/20">
                  <div className="w-2/5 bg-gold-warm flex items-center justify-center">
                    <span className="text-white font-bold text-sm md:text-base">
                      40% {language === "es" ? "Ahora" : "Now"}
                    </span>
                  </div>
                  <div className="w-3/5 bg-blue-50 flex items-center justify-center">
                    <span className="text-brown-dark font-bold text-sm md:text-base">
                      60% {language === "es" ? "Post-Entrega" : "Post-Handover"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-12">
                {t.paymentPlan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden flex items-start p-6 bg-linear-to-r from-[#f5f1ea] to-[#ede8df] rounded-2xl border border-gold-warm/30 hover:border-gold-warm/60 shadow-md hover:shadow-lg transition-all duration-300"
                    style={{
                      opacity: visibleSections.investment ? 1 : 0,
                      transform: visibleSections.investment
                        ? "translateY(0px)"
                        : "translateY(20px)",
                      transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
                        1 + index * 0.1
                      }s`,
                    }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-gold-warm/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CheckCircle2 className="h-6 w-6 text-gold-warm mr-4 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-brown-dark text-left text-sm md:text-base relative z-10">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* New Premium Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.paymentPlan.cards &&
                  t.paymentPlan.cards.map((card, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden p-8 bg-linear-to-br from-[#f5f1ea] via-[#ede8df] to-[#e8e3d8] rounded-3xl border-2 border-gold-warm/40 shadow-lg hover:shadow-2xl hover:border-gold-warm/60 transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-gold-warm/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-gold-warm/50 to-transparent group-hover:via-gold-warm transition-all duration-500" />
                      <div className="relative z-10">
                        <p className="text-center text-brown-dark text-base md:text-lg font-medium leading-relaxed italic">
                          &ldquo;{card.text}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INVESTMENT_3: RESPALDADO POR LÍDERES & NOTICIAS ==================== */}
      {/* Trust & Credibility */}
      <section
        ref={trustRef}
        className="relative py-20 bg-cream-light"
        style={{
          opacity: visibleSections.trust ? 1 : 0,
          transform: visibleSections.trust
            ? "translateY(0px)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-brown-dark mb-4">
                {t.trust.title}
              </h2>
              <h3 className="text-xl text-gold-warm mb-4">
                {t.trust.subtitle}
              </h3>
              <p className="text-taupe-warm text-base md:text-lg max-w-3xl mx-auto">
                {t.trust.description}
              </p>
            </div>

            {/* Press Coverage */}
            <div className="mb-12">
              <p className="text-center text-sm text-taupe-warm mb-6 uppercase tracking-wider">
                {t.trust.partners}
              </p>

              {/* Desktop/Tablet: Horizontal Scroll */}
              <div className="hidden md:block">
                <div className="relative">
                  <div
                    className="flex gap-8 overflow-x-auto pb-4 px-0 items-stretch justify-start scrollbar-thin scrollbar-thumb-gold-warm/40 scrollbar-track-gold-warm/10"
                    style={{
                      scrollBehavior: "smooth",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    {t.trust.articles.map((article, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gold-warm/20 hover:border-gold-warm hover:shadow-xl hover:shadow-gold-warm/10 transition-all duration-300 hover:-translate-y-1 w-full min-w-[320px] max-w-xs flex flex-col shrink-0"
                        style={{
                          opacity: visibleSections.trust ? 1 : 0,
                          transform: visibleSections.trust
                            ? "translateY(0px)"
                            : "translateY(30px)",
                          transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
                            index * 0.15
                          }s`,
                        }}
                      >
                        <Image
                          src={article.image}
                          alt={article.alt}
                          width={480}
                          height={320}
                          className="w-full h-48 md:h-56 object-cover grayscale-hover rounded-xl"
                          sizes="(max-width: 768px) 80vw, 20vw"
                        />
                        <div className="mt-4 space-y-2 flex-1 flex flex-col">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brown-dark/60">
                              {article.source}
                            </p>
                            {article.date && (
                              <p className="text-xs text-taupe-warm">
                                {article.date}
                              </p>
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-brown-dark leading-snug">
                            {article.title}
                          </h4>
                          <p className="text-sm text-brown-dark/70 flex-1">
                            {article.summary}
                          </p>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold-warm hover:underline"
                          >
                            {t.trust.readMore}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 17 17 7" />
                              <path d="M7 7h10v10" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile: Vertical Scroll */}
              <div className="md:hidden">
                <div
                  className="flex flex-col gap-6 overflow-y-auto max-h-[900px] px-0 scrollbar-thin scrollbar-thumb-gold-warm/40 scrollbar-track-gold-warm/10"
                  style={{
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {t.trust.articles.map((article, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gold-warm/20 hover:border-gold-warm hover:shadow-xl hover:shadow-gold-warm/10 transition-all duration-300 hover:-translate-y-1 flex flex-col w-full"
                      style={{
                        opacity: visibleSections.trust ? 1 : 0,
                        transform: visibleSections.trust
                          ? "translateY(0px)"
                          : "translateY(30px)",
                        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
                          index * 0.15
                        }s`,
                      }}
                    >
                      <Image
                        src={article.image}
                        alt={article.alt}
                        width={480}
                        height={320}
                        className="w-full h-48 md:h-56 object-cover grayscale-hover rounded-xl"
                        sizes="(max-width: 768px) 80vw, 20vw"
                      />
                      <div className="mt-4 space-y-2 flex-1 flex flex-col">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brown-dark/60">
                            {article.source}
                          </p>
                          {article.date && (
                            <p className="text-xs text-taupe-warm">
                              {article.date}
                            </p>
                          )}
                        </div>
                        <h4 className="text-lg font-semibold text-brown-dark leading-snug">
                          {article.title}
                        </h4>
                        <p className="text-sm text-brown-dark/70 flex-1">
                          {article.summary}
                        </p>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold-warm hover:underline"
                        >
                          {t.trust.readMore}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17 17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MENÚ: FEATURES ==================== */}
      {/* Features Section - 4 Subsections */}
      <section
        id="features"
        ref={featuresRef}
        translate="no"
        className="relative py-24 bg-cream-light space-y-24"
        style={{
          opacity: visibleSections.features ? 1 : 0,
          transform: visibleSections.features
            ? "translateY(0px)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ==================== FEATURES_1: DEVELOPMENT STRUCTURE ==================== */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-brown-dark mb-4">
                {t.features.development.title}
              </h2>
              <h3 className="text-xl md:text-2xl text-gold-warm mb-6">
                {t.features.development.tagline}
              </h3>
              <div className="space-y-3 max-w-3xl mx-auto">
                {t.features.development.description.map((text, index) => (
                  <p
                    key={index}
                    className="text-taupe-warm text-base md:text-lg leading-relaxed"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-warm/30 shadow-2xl hover:border-gold-warm hover:shadow-gold-warm/20 transition-all duration-300 hover:-translate-y-2">
              <Image
                src={t.features.development.image}
                alt={t.features.development.title}
                width={1200}
                height={800}
                className="w-full h-auto object-cover grayscale-hover"
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 via-black/10 to-transparent p-6">
                <h4 className="text-white text-2xl font-semibold drop-shadow-lg">
                  {t.features.development.title}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== FEATURES_2: SPECIFICATIONS ==================== */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-brown-dark mb-4">
                {t.features.specifications.title}
              </h2>
              <h3 className="text-xl md:text-2xl text-gold-warm">
                {t.features.specifications.tagline}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.specifications.cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gold-warm/20 hover:border-gold-warm hover:shadow-xl hover:shadow-gold-warm/10 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    opacity: visibleSections.features ? 1 : 0,
                    transform: visibleSections.features
                      ? "translateY(0px)"
                      : "translateY(30px)",
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                  }}
                >
                  <h3 className="text-2xl font-semibold text-brown-dark mb-3">
                    {card.title}
                  </h3>
                  <p className="text-lg text-gold-warm mb-2 font-medium">
                    {card.size}
                  </p>
                  <p className="text-xl font-bold text-brown-dark mb-4">
                    {card.price}
                  </p>
                  <p className="text-sm text-taupe-warm leading-relaxed">
                    {card.features}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== FEATURES_3: PLAYA VIVA VIEWS ==================== */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-brown-dark mb-4">
                {t.features.azureBay.title}
              </h2>
              <h3 className="text-xl md:text-2xl text-gold-warm">
                {t.features.azureBay.tagline}
              </h3>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {t.features.azureBay.tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveAzureBayTab(index)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                    activeAzureBayTab === index
                      ? "bg-gold-warm text-brown-dark shadow-lg"
                      : "bg-cream-light text-brown-dark/70 hover:bg-cream-light/80 hover:text-brown-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-warm/30 shadow-2xl hover:border-gold-warm hover:shadow-gold-warm/20 transition-all duration-300">
              <Image
                src={t.features.azureBay.tabs[activeAzureBayTab].image}
                alt={t.features.azureBay.tabs[activeAzureBayTab].label}
                width={1200}
                height={800}
                className="w-full h-auto object-cover grayscale-hover"
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-8">
                <h4 className="text-white text-2xl md:text-3xl font-semibold mb-2 drop-shadow-lg">
                  {t.features.azureBay.tabs[activeAzureBayTab].label}
                </h4>
                <p className="text-white/90 text-base md:text-lg drop-shadow-md">
                  {t.features.azureBay.tabs[activeAzureBayTab].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== FEATURES_4: AMENITIES CAROUSEL ==================== */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-brown-dark mb-4">
                {t.features.amenities.title}
              </h2>
              <h3 className="text-xl md:text-2xl text-gold-warm">
                {t.features.amenities.tagline}
              </h3>
            </div>

            {/* Desktop: Horizontal Scroll */}
            <div className="hidden md:block">
              <div
                className="flex gap-6 overflow-x-auto pb-6 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gold-warm/40 scrollbar-track-gold-warm/10"
                style={{
                  scrollBehavior: "smooth",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {t.features.amenities.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex-none w-64 snap-center bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gold-warm/20 hover:border-gold-warm hover:shadow-xl hover:shadow-gold-warm/10 transition-all duration-300 hover:-translate-y-2"
                    style={{
                      opacity: visibleSections.features ? 1 : 0,
                      transform: visibleSections.features
                        ? "translateY(0px)"
                        : "translateY(30px)",
                      transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover grayscale-hover"
                        sizes="256px"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-brown-dark mb-3">
                        {item.title}
                      </h4>
                      <p className="text-sm text-taupe-warm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Vertical Scroll */}
            <div className="md:hidden">
              <div
                className="flex flex-col gap-6 overflow-y-auto max-h-[900px] px-0 scrollbar-thin scrollbar-thumb-gold-warm/40 scrollbar-track-gold-warm/10"
                style={{
                  scrollBehavior: "smooth",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {t.features.amenities.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gold-warm/20 hover:border-gold-warm hover:shadow-xl hover:shadow-gold-warm/10 transition-all duration-300"
                    style={{
                      opacity: visibleSections.features ? 1 : 0,
                      transform: visibleSections.features
                        ? "translateY(0px)"
                        : "translateY(30px)",
                      transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                    }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover grayscale-hover"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-brown-dark mb-3">
                        {item.title}
                      </h4>
                      <p className="text-sm text-taupe-warm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MENÚ: GALERÍA ==================== */}
      <GallerySection
        galleryRef={galleryRef}
        galleryVisible={visibleSections.gallery}
        t={t}
        language={language}
        activeGalleryTab={activeGalleryTab}
        setActiveGalleryTab={setActiveGalleryTab}
      />
      <ApartmentsSection
        apartmentsRef={apartmentsRef}
        apartmentsVisible={visibleSections.apartments}
        t={t}
        activeApartment={activeApartment}
        setActiveApartment={setActiveApartment}
        activeApartmentConfig={activeApartmentConfig}
        apartmentCopy={apartmentCopy}
        activeApartmentPrice={activeApartmentPrice}
        highlightItems={highlightItems}
        statCardBaseClasses={statCardBaseClasses}
        infoLabels={infoLabels}
        formatSizeRange={formatSizeRange}
        formatBedroomValue={formatBedroomValue}
        formatBathroomValue={formatBathroomValue}
      />

      <LocationSection
        locationRef={locationRef}
        locationVisible={visibleSections.location}
        t={t}
        language={language}
        locationView={locationView}
        setLocationView={setLocationView}
      />

      <FaqSection
        faqRef={faqRef}
        faqVisible={visibleSections.faq}
        t={t}
        activeFaq={activeFaq}
        setActiveFaq={setActiveFaq}
      />

      <LeadFormSection
        leadFormRef={leadFormRef}
        leadFormVisible={visibleSections.leadForm}
        language={language}
        t={t}
        featureColumns={featureColumns}
        altchaTitle={altchaTitle}
        altchaCopy={altchaCopy}
        consentTitle={consentTitle}
        consentCopy={consentCopy}
        renderLuxuryBadge={(label) => <LuxuryBadge label={label} />}
        handleLeadSubmit={handleLeadSubmit}
        validationMessage={validationMessage}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
        emailRef={emailRef}
        privacyRef={privacyRef}
        altchaRef={altchaRef}
        formData={formData}
        setFormData={setFormData}
        setValidationMessage={setValidationMessage}
        altchaStrings={altchaStrings}
        privacyAccepted={privacyAccepted}
        setPrivacyAccepted={setPrivacyAccepted}
        privacyCheckboxLabel={privacyCheckboxLabel}
        isSubmitting={isSubmitting}
        automationFeedback={automationFeedback}
      />

      {/* ==================== PIE DE PÁGINA: FOOTER ==================== */}
      <FooterSection
        footerRef={footerRef}
        footerVisible={visibleSections.footer}
        language={language}
      />
    </div>
  );
}





