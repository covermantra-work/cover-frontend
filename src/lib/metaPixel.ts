/**
 * Meta (Facebook) Pixel Tracking Helper
 * Pixel ID: 813644905109442
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export interface MetaLeadParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  status?: boolean;
  [key: string]: any;
}

/**
 * Fires standard 'Lead' event to Meta Pixel
 * Essential for Ads Manager conversion tracking & campaign optimization
 */
export const trackMetaLead = (params?: MetaLeadParams) => {
  if (typeof window === "undefined") return;

  try {
    const fbq = window.fbq;
    const payload = {
      content_name: params?.content_name || "Loan Lead",
      content_category: params?.content_category || "Personal Loan",
      currency: params?.currency || "INR",
      ...(params?.value ? { value: params.value } : {}),
      status: params?.status ?? true,
      ...params,
    };

    if (typeof fbq === "function") {
      fbq("track", "Lead", payload);
      console.log("🎯 [Meta Pixel] Tracked 'Lead' event:", payload);
    } else {
      // Fallback in case fbq queue is not yet initialized
      window._fbq = window._fbq || [];
      if (typeof window._fbq.push === "function") {
        window._fbq.push(["track", "Lead", payload]);
      }
      console.warn("⚠️ [Meta Pixel] fbq not fully initialized yet, queued event");
    }
  } catch (err) {
    console.error("❌ [Meta Pixel] Lead tracking error:", err);
  }
};

/**
 * Fires any standard Meta Pixel event (e.g. CompleteRegistration, Contact, etc.)
 */
export const trackMetaEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  try {
    const fbq = window.fbq;
    if (typeof fbq === "function") {
      if (params) {
        fbq("track", eventName, params);
      } else {
        fbq("track", eventName);
      }
      console.log(`🎯 [Meta Pixel] Tracked '${eventName}' event:`, params);
    }
  } catch (err) {
    console.error(`❌ [Meta Pixel] Event '${eventName}' error:`, err);
  }
};
