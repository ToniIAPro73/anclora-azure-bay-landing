import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://azurebay-meridiangroup.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "Azure Bay | Caso de estudio inmobiliario premium (Portfolio)",
  description:
    "Azure Bay es un caso de estudio de portfolio: landing inmobiliaria premium con copy bilingue, estructura de conversion y automatizacion de lead magnet.",
  generator: "Next.js",
  keywords:
    "inversión inmobiliaria Dubai, Vista Marina, Costa del Sol Premium, Azure Bay, propiedades lujo Emiratos, real estate investment Ras Al Khaimah, seafront apartments UAE",
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/?lang=en",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Azure Bay",
    title:
      "Azure Bay | Caso de estudio inmobiliario premium (Portfolio)",
    description:
      "Proyecto ficticio para portfolio: diseno premium, narrativa de inversion y captacion automatizada para el sector inmobiliario.",
    images: [
      {
        url: "/assets/imagenes/hero-background.png",
        width: 1200,
        height: 630,
        alt: "Azure Bay - caso de estudio inmobiliario premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Azure Bay | Caso de estudio inmobiliario premium",
    description:
      "Landing inmobiliaria ficticia para portfolio con enfoque en diseno, conversion y automatizacion.",
    images: ["/assets/imagenes/hero-background.png"],
  },
  // Icons are provided via the App Router file convention:
  // app/favicon.ico, app/icon.png (32x32) and app/apple-icon.png (180x180),
  // generated from the project icon (public/icon.svg) per
  // docs/standards/ANCLORA_BRANDING_FAVICON_SPEC.md
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical resources for performance */}
        <link
          rel="preconnect"
          href="https://js-eu1.hs-scripts.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/vendor/altcha.js"
          as="script"
          crossOrigin="anonymous"
        />
        <meta name="google" content="notranslate" />
        <meta
          name="description"
          content="Azure Bay es un caso de estudio inmobiliario ficticio para portfolio, centrado en diseno premium, UX de conversion y automatizacion de captacion."
        />
        <meta
          property="og:description"
          content="Caso de estudio de portfolio: landing inmobiliaria premium con estructura de captacion y experiencia visual de alta gama."
        />
        <meta
          name="twitter:description"
          content="Proyecto ficticio de portfolio para demostrar diseno web premium y ejecucion tecnica en real estate."
        />
      </head>
      <body
        className={`font-sans antialiased`}
        translate="no"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
