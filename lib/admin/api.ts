const BASE = "/api/admin";

async function req<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}`);
  return res.json();
}

export const api = {
  // Hero
  getHero: () => req("/hero"),
  saveHero: (d: unknown) => req("/hero", "PUT", d),

  // Firm Overview
  getFirm: () => req("/firm-overview"),
  saveFirm: (d: unknown) => req("/firm-overview", "PUT", d),

  // Home Content
  getHomeContent: () => req("/home-content"),
  saveHomeContent: (d: unknown) => req("/home-content", "PUT", d),

  // Services (list)
  getServices: () => req("/services"),
  createService: (d: unknown) => req("/services", "POST", d),
  updateService: (id: number, d: unknown) => req(`/services/${id}`, "PATCH", d),

  deleteService: (id: number) => req(`/services/${id}`, "DELETE"),

  // Services Page
  getServicesPage: () => req("/services-page"),
  saveServicesPage: (d: unknown) => req("/services-page", "PUT", d),

  // Industries (list)
  getIndustries: () => req("/industries"),
  createIndustry: (d: unknown) => req("/industries", "POST", d),
  updateIndustry: (id: number, d: unknown) =>
    req(`/industries/${id}`, "PATCH", d),

  deleteIndustry: (id: number) => req(`/industries/${id}`, "DELETE"),

  // Industries Page
  getIndustriesPage: () => req("/industries-page"),
  saveIndustriesPage: (d: unknown) => req("/industries-page", "PUT", d),

  // Cases (list)
  getCases: () => req("/cases"),
  createCase: (d: unknown) => req("/cases", "POST", d),
  updateCase: (id: number, d: unknown) => req(`/cases/${id}`, "PATCH", d),
  deleteCase: (id: number) => req(`/cases/${id}`, "DELETE"),

  // Cases Page
  getCasesPage: () => req("/cases-page"),
  saveCasesPage: (d: unknown) => req("/cases-page", "PUT", d),

  // Why Pillars
  getWhy: () => req("/why-pillars"),
  saveWhy: (d: unknown) => req("/why-pillars", "PUT", d),

  // Principles
  getPrinciples: () => req("/principles"),
  savePrinciples: (d: unknown) => req("/principles", "PUT", d),

  // Stats
  getStats: () => req("/stats"),
  saveStats: (d: unknown) => req("/stats", "PUT", d),

  // About
  getAbout: () => req("/about"),
  saveAbout: (d: unknown) => req("/about", "PUT", d),

  // Footer
  getFooter: () => req("/footer"),
  saveFooter: (d: unknown) => req("/footer", "PUT", d),

  // Privacy
  getPrivacy: () => req("/privacy"),
  savePrivacy: (d: unknown) => req("/privacy", "PUT", d),

  // Terms
  getTerms: () => req("/terms"),
  saveTerms: (d: unknown) => req("/terms", "PUT", d),

  // Contact
  getContactPage: () => req("/contact-page"),
  saveContactPage: (d: unknown) => req("/contact-page", "PUT", d),
};

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Upload failed");
  }

  const data = await res.json();
  return data.url;
}
