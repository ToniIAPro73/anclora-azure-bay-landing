import type React from "react";
import Image from "next/image";

type LocationSectionProps = {
  locationRef: React.RefObject<HTMLDivElement | null>;
  locationVisible: boolean;
  t: any;
  language: "es" | "en";
  locationView: "map" | "collage";
  setLocationView: React.Dispatch<React.SetStateAction<"map" | "collage">>;
};

export function LocationSection({
  locationRef,
  locationVisible,
  t,
  language,
  locationView,
  setLocationView,
}: LocationSectionProps) {
  return (
    <section
      id="location"
      ref={locationRef as unknown as React.RefObject<HTMLElement>}
      className="relative py-24 bg-cream-light"
      style={{
        opacity: locationVisible ? 1 : 0,
        transform: locationVisible ? "translateY(0px)" : "translateY(50px)",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-light text-brown-dark mb-4">
              {t.location.title}
            </h2>
            <h3 className="text-xl text-gold-warm mb-4">{t.location.subtitle}</h3>
            <p className="text-taupe-warm text-base leading-relaxed max-w-4xl mx-auto">
              {t.location.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {t.location.stats.map((stat: any, index: number) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-[#f5f1ea] via-[#ede8df] to-[#e8e3d8] p-6 md:p-8 border border-gold-warm/40 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-gold-warm/60"
              >
                <div className="absolute inset-0 bg-linear-to-br from-gold-warm/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-gold-warm/50 to-transparent group-hover:via-gold-warm transition-all duration-500" />
                <div className="relative z-10 text-center">
                  <div className="text-4xl md:text-5xl font-light text-gold-warm mb-3 group-hover:text-[#8B7355] transition-colors duration-300">
                    {stat.number}
                  </div>
                  <p className="text-sm md:text-base font-medium text-brown-dark leading-snug">
                    {language === "es" ? stat.label : stat.labelEn}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px rounded-full bg-linear-to-r from-transparent via-gold-warm/30 to-transparent group-hover:via-gold-warm/60 transition-all duration-500" />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setLocationView("collage")}
              className={`px-8 py-3.5 rounded-[20px] font-medium text-sm transition-all duration-300 shadow-md ${
                locationView === "collage"
                  ? "bg-[#9d8c5f] text-[#3a2f1f] shadow-lg"
                  : "bg-[#e3ded4] text-[#5a4f3d] hover:bg-[#d8d3c9]"
              }`}
            >
              Azure Bay District
            </button>
            <button
              onClick={() => setLocationView("map")}
              className={`px-8 py-3.5 rounded-[20px] font-medium text-sm transition-all duration-300 shadow-md ${
                locationView === "map"
                  ? "bg-[#9d8c5f] text-[#3a2f1f] shadow-lg"
                  : "bg-[#e3ded4] text-[#5a4f3d] hover:bg-[#d8d3c9]"
              }`}
            >
              {language === "es" ? "Mapa del Área" : "Area Map"}
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-warm/30 transition-all duration-300 hover:-translate-y-2 hover:border-gold-warm hover:shadow-gold-warm/20">
            {locationView === "map" ? (
              <Image
                src={`/assets/imagenes/Ubicacion_Azurebay_${language}.webp`}
                alt={language === "es" ? "Mapa de ubicación Azure Bay" : "Azure Bay Area Map"}
                className="w-full h-auto object-cover grayscale-hover"
                width={1200}
                height={800}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            ) : (
              <Image
                src="/assets/imagenes/Collage_Azurebay.webp"
                alt="Azure Bay Collage"
                className="w-full h-auto object-cover grayscale-hover"
                width={1200}
                height={900}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
