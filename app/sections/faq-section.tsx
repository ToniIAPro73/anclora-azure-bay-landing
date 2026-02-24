import type React from "react";

type FaqSectionProps = {
  faqRef: React.RefObject<HTMLDivElement | null>;
  faqVisible: boolean;
  t: any;
  activeFaq: number | null;
  setActiveFaq: React.Dispatch<React.SetStateAction<number | null>>;
};

export function FaqSection({
  faqRef,
  faqVisible,
  t,
  activeFaq,
  setActiveFaq,
}: FaqSectionProps) {
  return (
    <section
      id="faq"
      ref={faqRef as unknown as React.RefObject<HTMLElement>}
      translate="no"
      className="relative py-12 md:py-16 bg-[#d4c5a8]"
      style={{
        opacity: faqVisible ? 1 : 0,
        transform: faqVisible ? "translateY(0px)" : "translateY(50px)",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(162,144,96,0.3) 1px, transparent 0)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-brown-dark mb-3 md:mb-4">
            {t.faq.title}
          </h2>
          <p className="text-base md:text-lg text-[#6d5d42] font-medium">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-linear-to-br from-[#f5f1ea]/95 via-white/90 to-[#ede8df]/95 border-2 border-[#A29060]/40 shadow-[0_16px_48px_rgba(162,144,96,0.25),0_0_0_1px_rgba(255,255,255,0.5)_inset] divide-y divide-[#A29060]/15 overflow-hidden">
            {t.faq.questions.map((qa: any, index: number) => (
              <div
                key={qa.question}
                className={`px-4 md:px-5 py-3 md:py-4 transition-all duration-300 cursor-default group/item relative ${
                  activeFaq === index
                    ? "bg-[#e8dcc8] shadow-[0_4px_16px_rgba(162,144,96,0.2)] scale-[1.02] z-10"
                    : "hover:bg-linear-to-r hover:from-[#A29060]/5 hover:to-transparent"
                }`}
                onMouseEnter={() => setActiveFaq(index)}
                onMouseLeave={() => setActiveFaq(null)}
                onFocus={() => setActiveFaq(index)}
                onBlur={() => setActiveFaq(null)}
                tabIndex={0}
              >
                <p
                  className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${
                    activeFaq === index ? "text-[#271c13]" : "text-[#6E5F46]"
                  }`}
                >
                  {qa.question}
                </p>
                <div
                  className={`text-[11px] md:text-xs text-[#4a3f30] leading-relaxed transition-all duration-300 ${
                    activeFaq === index
                      ? "max-h-40 opacity-100 mt-2"
                      : "max-h-0 opacity-0 mt-0 pointer-events-none"
                  }`}
                >
                  {qa.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
