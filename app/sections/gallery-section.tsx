import type React from "react";
import Image from "next/image";
type GallerySectionProps = {
  galleryRef: React.RefObject<HTMLDivElement | null>;
  galleryVisible: boolean;
  t: any;
  language: "es" | "en";
  activeGalleryTab: "servicios" | "interior" | "sitios" | "video";
  setActiveGalleryTab: React.Dispatch<React.SetStateAction<"servicios" | "interior" | "sitios" | "video">>;
};
export function GallerySection({
  galleryRef,
  galleryVisible,
  t,
  language,
  activeGalleryTab,
  setActiveGalleryTab,
}: GallerySectionProps) {
  return (      <section
        id="gallery"
        ref={galleryRef as unknown as React.RefObject<HTMLElement>}
        className="relative py-24 bg-white"
        style={{
          opacity: galleryVisible ? 1 : 0,
          transform: galleryVisible
            ? "translateY(0px)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-brown-dark mb-6">
              {t.gallery.title}
            </h2>
            <h3 className="text-2xl text-gold-warm mb-6">
              {t.gallery.subtitle}
            </h3>
            <p className="text-taupe-warm text-base md:text-lg leading-relaxed">
              {t.gallery.description}
            </p>
          </div>

          {/* Gallery Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setActiveGalleryTab("servicios")}
              className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                activeGalleryTab === "servicios"
                  ? "bg-gold-warm text-brown-dark shadow-lg"
                  : "bg-cream-light text-brown-dark/70 hover:bg-cream-light/80 hover:text-brown-dark"
              }`}
            >
              {language === "es"
                ? "Servicios e Instalaciones"
                : "Services & Facilities"}
            </button>
            <button
              onClick={() => setActiveGalleryTab("interior")}
              className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                activeGalleryTab === "interior"
                  ? "bg-gold-warm text-brown-dark shadow-lg"
                  : "bg-cream-light text-brown-dark/70 hover:bg-cream-light/80 hover:text-brown-dark"
              }`}
            >
              {language === "es" ? "Interiores" : "Interiors"}
            </button>
            <button
              onClick={() => setActiveGalleryTab("sitios")}
              className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                activeGalleryTab === "sitios"
                  ? "bg-gold-warm text-brown-dark shadow-lg"
                  : "bg-cream-light text-brown-dark/70 hover:bg-cream-light/80 hover:text-brown-dark"
              }`}
            >
              {language === "es" ? "Sitios de Interés" : "Points of Interest"}
            </button>
            <button
              onClick={() => setActiveGalleryTab("video")}
              className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                activeGalleryTab === "video"
                  ? "bg-gold-warm text-brown-dark shadow-lg"
                  : "bg-cream-light text-brown-dark/70 hover:bg-cream-light/80 hover:text-brown-dark"
              }`}
            >
              {language === "es" ? "Video" : "Video"}
            </button>
          </div>

          {/* Servicios e Instalaciones */}
          {activeGalleryTab === "servicios" && (
            <div className="max-w-6xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border-2 border-gold-warm/30 shadow-2xl hover:border-gold-warm hover:shadow-gold-warm/20 transition-all duration-300 hover:-translate-y-2">
                <Image
                  src="/assets/imagenes/Collage-servicios-instalaciones.webp"
                  alt="Servicios e Instalaciones - Azure Bay"
                  className="w-full h-auto object-cover grayscale-hover"
                  width={1210}
                  height={968}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
              </div>
            </div>
          )}

          {/* Interior */}
          {activeGalleryTab === "interior" && (
            <div className="max-w-6xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border-2 border-gold-warm/30 shadow-2xl hover:border-gold-warm hover:shadow-gold-warm/20 transition-all duration-300 hover:-translate-y-2">
                <Image
                  src={
                    language === "es"
                      ? "/assets/imagenes/collage-interiores-es.png"
                      : "/assets/imagenes/collage-interiores-en.png"
                  }
                  alt={
                    language === "es"
                      ? "Collage de interiores"
                      : "Interiors collage"
                  }
                  className="w-full h-auto object-cover grayscale-hover"
                  width={1210}
                  height={968}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
              </div>
            </div>
          )}

          {/* Sitios de Interés */}
          {activeGalleryTab === "sitios" && (
            <div className="max-w-6xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border-2 border-gold-warm/30 shadow-2xl hover:border-gold-warm hover:shadow-gold-warm/20 transition-all duration-300 hover:-translate-y-2">
                <Image
                  src={
                    language === "es"
                      ? "/assets/imagenes/Collage_Sitios_Interes_Mejorado-es.webp"
                      : "/assets/imagenes/Collage_Sitios_Interes_Mejorado-en.webp"
                  }
                  alt={
                    language === "es"
                      ? "Sitios de interes cercanos a Azure Bay"
                      : "Points of interest near Azure Bay"
                  }
                  className="w-full h-auto object-cover grayscale-hover"
                  width={1210}
                  height={968}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
              </div>
            </div>
          )}

          {/* Video */}
          {activeGalleryTab === "video" && (
            <div className="max-w-6xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden border-2 border-gold-warm/40 shadow-2xl bg-black aspect-video">
                <iframe
                  src={`https://player.cloudinary.com/embed/?cloud_name=dt6lzvqqk&public_id=${language === "es" ? "video_promocional_es_bixeaq" : "video_promocional_en_cszixb"}&profile=cld-default`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={language === "es" ? "Video promocional Azure Bay" : "Azure Bay Promotional Video"}
                />
              </div>
            </div>
          )}
        </div>
      </section>
  );
}

