export const SITE_URL = "https://azurebay-meridiangroup.vercel.app/";

export const ALTCHA_TRANSLATIONS: Record<
  "es" | "en",
  {
    label: string;
    verified: string;
    failed: string;
  }
> = {
  es: {
    label: "Verificación privada (ALTCHA)",
    verified: "✓ Verificado",
    failed: "Intenta nuevamente",
  },
  en: {
    label: "Private verification (ALTCHA)",
    verified: "✓ Verified",
    failed: "Try again",
  },
};

export type LeadAutomationPayload = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  language: "es" | "en";
  page?: string;
  timestamp?: string;
  dossierFileName?: string;
  utm: Record<string, string>;
  workflow?: string;
  altchaPayload: string;
};

export type LeadAutomationResult = {
  success: boolean;
  hubspot_success?: boolean;
  pdf_success?: boolean;
  pdf_url?: string | null;
  message?: string;
};

export type LeadFieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "privacy"
  | "captcha";
