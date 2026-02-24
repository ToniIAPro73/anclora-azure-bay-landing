import type React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
type ApartmentsSectionProps = {
  apartmentsRef: React.RefObject<HTMLDivElement | null>;
  apartmentsVisible: boolean;
  t: any;
  activeApartment: "studio" | "oneBed" | "twoBed" | "threeBed";
  setActiveApartment: React.Dispatch<React.SetStateAction<"studio" | "oneBed" | "twoBed" | "threeBed">>;
  activeApartmentConfig: {
    image: string;
    sizeSqftRange: [number, number];
    bedrooms: number;
    bathrooms: number;
  };
  apartmentCopy: {
    label: string;
    headline: string;
    description: string;
    highlights: string[];
    parking: string;
  };
  activeApartmentPrice: string;
  highlightItems: string[];
  statCardBaseClasses: string;
  infoLabels: {
    size: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    parking: string;
  };
  formatSizeRange: (range: [number, number]) => string;
  formatBedroomValue: (count: number) => string;
  formatBathroomValue: (count: number) => string;
};
export function ApartmentsSection({
  apartmentsRef,
  apartmentsVisible,
  t,
  activeApartment,
  setActiveApartment,
  activeApartmentConfig,
  apartmentCopy,
  activeApartmentPrice,
  highlightItems,
  statCardBaseClasses,
  infoLabels,
  formatSizeRange,
  formatBedroomValue,
  formatBathroomValue,
}: ApartmentsSectionProps) {
  return (      <section
        id="apartments"
        ref={apartmentsRef as unknown as React.RefObject<HTMLElement>}
        translate="no"
        className="relative py-24 bg-linear-to-br from-cream-light via-white to-cream-light"
        style={{
          opacity: apartmentsVisible ? 1 : 0,
          transform: apartmentsVisible
            ? "translateY(0px)"
            : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-light text-brown-dark mb-4">
                {t.apartments.title}
              </h2>
              <h3 className="text-xl text-gold-warm mb-4">
                {t.apartments.subtitle}
              </h3>
              <p className="text-taupe-warm text-base md:text-lg max-w-3xl mx-auto">
                {t.apartments.description}
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {(["studio", "oneBed", "twoBed", "threeBed"] as const).map(
                (key) => (
                  <button
                    key={key}
                    onClick={() => setActiveApartment(key)}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                      activeApartment === key
                        ? "bg-gold-warm text-brown-dark shadow-lg"
                        : "bg-cream-light text-brown-dark/70 hover:bg-cream-light/80 hover:text-brown-dark"
                    }`}
                  >
                    {t.apartments.tabs[key].label}
                  </button>
                )
              )}
            </div>

            <div className="space-y-10">
              <div
                className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border-2 border-gold-warm/30 shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                style={{
                  opacity: apartmentsVisible ? 1 : 0,
                  transform: apartmentsVisible
                    ? undefined
                    : "translateY(30px)",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Image
                  src={activeApartmentConfig.image}
                  alt={apartmentCopy.headline}
                  width={1600}
                  height={1000}
                  unoptimized
                  className="w-full h-full object-cover grayscale-hover"
                  sizes="(max-width: 768px) 100vw, 75vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 via-black/10 to-transparent p-6">
                  <p className="text-sm text-white uppercase tracking-[0.3em]">
                    {apartmentCopy.label}
                  </p>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-brown-dark/10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
                <div className="flex-1 space-y-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-brown-dark/60">
                    {apartmentCopy.label}
                  </p>
                  <h3 className="text-2xl md:text-4xl font-light text-brown-dark">
                    {apartmentCopy.headline}
                  </h3>
                  <p className="text-brown-dark/80 text-base md:text-lg">
                    {apartmentCopy.description}
                  </p>
                  <div className="space-y-3 pt-4">
                    {highlightItems.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-gold-warm/20 rounded-full p-1 mt-0.5">
                          <CheckCircle2 className="h-4 w-4 text-gold-warm" />
                        </div>
                        <p className="text-brown-dark/80 text-sm">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={statCardBaseClasses}>
                    <p className="text-xs uppercase tracking-[0.3em] text-brown-dark/50 mb-1">
                      {infoLabels.size}
                    </p>
                    <p className="text-lg font-semibold text-brown-dark">
                      {formatSizeRange(activeApartmentConfig.sizeSqftRange)}
                    </p>
                  </div>
                  <div className={statCardBaseClasses}>
                    <p className="text-xs uppercase tracking-[0.3em] text-brown-dark/50 mb-1">
                      {infoLabels.price}
                    </p>
                    <p className="text-lg font-semibold text-brown-dark">
                      {activeApartmentPrice}
                    </p>
                  </div>
                  <div className={statCardBaseClasses}>
                    <p className="text-xs uppercase tracking-[0.3em] text-brown-dark/50 mb-1">
                      {infoLabels.bedrooms}
                    </p>
                    <p className="text-lg font-semibold text-brown-dark">
                      {formatBedroomValue(activeApartmentConfig.bedrooms)}
                    </p>
                  </div>
                  <div className={statCardBaseClasses}>
                    <p className="text-xs uppercase tracking-[0.3em] text-brown-dark/50 mb-1">
                      {infoLabels.bathrooms}
                    </p>
                    <p className="text-lg font-semibold text-brown-dark">
                      {formatBathroomValue(activeApartmentConfig.bathrooms)}
                    </p>
                  </div>
                  <div className={`${statCardBaseClasses} sm:col-span-2`}>
                    <p className="text-xs uppercase tracking-[0.3em] text-brown-dark/50 mb-1">
                      {infoLabels.parking}
                    </p>
                    <p className="text-lg font-semibold text-brown-dark">
                      {apartmentCopy.parking}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

