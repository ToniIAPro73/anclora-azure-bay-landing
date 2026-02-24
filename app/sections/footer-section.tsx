import type { RefObject } from "react";
import Image from "next/image";

type FooterSectionProps = {
  footerRef: RefObject<HTMLDivElement | null>;
  footerVisible: boolean;
  language: "es" | "en";
};

export function FooterSection({
  footerRef,
  footerVisible,
  language,
}: FooterSectionProps) {
  return (
    <section
      id="anclora"
      ref={footerRef as unknown as RefObject<HTMLElement>}
      className="relative py-16 md:py-20 bg-[#f8f5f0]"
      style={{
        opacity: footerVisible ? 1 : 0,
        transform: footerVisible ? "translateY(0px)" : "translateY(30px)",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-4 md:mb-6 space-y-2">
            <div className="group relative inline-flex items-center justify-center px-5 md:px-6 lg:px-7 py-6 md:py-7">
              <div
                className="pointer-events-none absolute inset-0 rounded-[26px] bg-linear-to-br from-[#fdf8ef] via-[#f4e8d5] to-[#e8dcc8] shadow-[0_20px_50px_rgba(34,24,14,0.22)] border border-[#e0d2b8]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6 md:-top-7 w-[82%] max-w-[420px] aspect-3/1 bg-linear-to-b from-[#f7ead3] via-[#f0e2c1] to-transparent shadow-[0_18px_34px_-18px_rgba(34,24,14,0.35)] rounded-t-[22px]"
                style={{ clipPath: "polygon(50% 0%, 100% 100%, 0 100%)" }}
                aria-hidden="true"
              />
              <Image
                src="/assets/imagenes/anclora.webp"
                alt="Anclora Private Estates"
                width={320}
                height={200}
                className="relative z-10 h-40 md:h-52 lg:h-64 object-contain w-auto grayscale-group-hover transition-all duration-500 ease-out drop-shadow-2xl group-hover:-translate-y-2 group-hover:drop-shadow-[0_18px_45px_rgba(34,24,14,0.28)]"
                sizes="(max-width: 768px) 60vw, 25vw"
              />
            </div>
          </div>

          <div className="text-center mb-4 md:mb-5">
            <h2 className="text-2xl md:text-3xl font-medium text-[#5a4f3d] tracking-[0.15em] uppercase">
              ANCLORA PRIVATE ESTATES
            </h2>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <p className="text-sm md:text-base text-[#6E5F46] leading-relaxed">
              {language === "es"
                ? "Anclora Private Estates es una firma boutique especializada en inversiones inmobiliarias de ultra-lujo en los mercados más exclusivos del mundo. Nos dedicamos a identificar oportunidades únicas que combinan rentabilidad excepcional con activos tangibles de primer nivel."
                : "Anclora Private Estates is a boutique firm specializing in ultra-luxury real estate investments in the world's most exclusive markets. We are dedicated to identifying unique opportunities that combine exceptional returns with prime tangible assets."}
            </p>
            <p className="text-sm md:text-base text-[#6E5F46] leading-relaxed">
              {language === "es"
                ? "Nuestra filosofía se centra en ofrecer acceso privilegiado a desarrollos premium antes de que lleguen al mercado general, permitiendo a nuestros clientes posicionarse estratégicamente en ubicaciones de alto crecimiento."
                : "Our philosophy focuses on providing privileged access to premium developments before they reach the general market, enabling our clients to strategically position themselves in high-growth locations."}
            </p>
          </div>

          <div className="bg-[#e8dcc8] py-10 md:py-12 px-6 md:px-8 rounded-2xl">
            <div className="text-center mb-10 md:mb-12">
              <h3 className="text-xl md:text-2xl font-light text-[#271c13] tracking-wide uppercase">
                {language === "es" ? "Nuestros Principios" : "Our Principles"}
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <p className="text-lg md:text-xl font-medium text-[#A29060] mb-2 uppercase tracking-wide">
                  {language === "es" ? "Exclusividad" : "Exclusivity"}
                </p>
                <p className="text-xs md:text-sm text-[#6E5F46] leading-relaxed">
                  {language === "es"
                    ? "Acceso a oportunidades selectas"
                    : "Access to select opportunities"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-medium text-[#A29060] mb-2 uppercase tracking-wide">
                  {language === "es" ? "Transparencia" : "Transparency"}
                </p>
                <p className="text-xs md:text-sm text-[#6E5F46] leading-relaxed">
                  {language === "es"
                    ? "Claridad en cada operación"
                    : "Clarity in every transaction"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-medium text-[#A29060] mb-2 uppercase tracking-wide">
                  {language === "es" ? "Visión" : "Vision"}
                </p>
                <p className="text-xs md:text-sm text-[#6E5F46] leading-relaxed">
                  {language === "es"
                    ? "Anticipación a mercados emergentes"
                    : "Anticipating emerging markets"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-medium text-[#A29060] mb-2 uppercase tracking-wide">
                  {language === "es" ? "Compromiso" : "Commitment"}
                </p>
                <p className="text-xs md:text-sm text-[#6E5F46] leading-relaxed">
                  {language === "es"
                    ? "Acompañamiento personalizado"
                    : "Personalized guidance"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
