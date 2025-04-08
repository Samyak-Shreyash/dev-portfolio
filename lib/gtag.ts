// lib/gtag.ts

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, string>) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Track pageviews
export const pageview = (url: string) => {
  if (!GA_ID) return;
  window.gtag('config', GA_ID, {
    page_path: url,
  });
};
