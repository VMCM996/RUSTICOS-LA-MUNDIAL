'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-JDR4X4VNZL';
const CONSENT_KEY = 'rusticos_cookie_consent_v1';

export function trackGAEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export default function GoogleAnalytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const raw = localStorage.getItem(CONSENT_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        setAnalyticsAllowed(parsed?.level === 'all');
      } catch {
        setAnalyticsAllowed(false);
      }
    };

    checkConsent();
    window.addEventListener('cookie-consent-updated', checkConsent);
    return () => window.removeEventListener('cookie-consent-updated', checkConsent);
  }, []);

  if (!analyticsAllowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
