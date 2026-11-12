'use client';

import { useEffect } from 'react';

const REVEAL_SELECTORS = [
  '.hero-dual-copy',
  '.hero-photo-card',
  '.quick-finder-tabs',
  '.quick-finder-box',
  '.brand-poster-card',
  '.featured-header',
  '.catalog-filter-strip',
  '.editorial-vehicle-card',
  '.promo-panoramic-content',
  '.trust-item-v2',
  '.events-header-row',
  '.event-card',
  '.finance-section .section-header',
  '.finance-card',
  '.finance-summary',
  '.location-header-row',
  '.map-frame-card',
  '.location-details-card',
  '#test-drive .section-header',
  '.info-card',
  '.form-card',
  '.footer-grid-v2 > div',
].join(', ');

export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observedElements = new WeakSet();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('scroll-in-view');
            el.classList.remove('scroll-out-top', 'scroll-out-bottom');
          } else {
            el.classList.remove('scroll-in-view');
            if (entry.boundingClientRect.top < 0) {
              el.classList.add('scroll-out-top');
              el.classList.remove('scroll-out-bottom');
            } else {
              el.classList.add('scroll-out-bottom');
              el.classList.remove('scroll-out-top');
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-40px 0px -40px 0px',
      }
    );

    const registerElements = () => {
      const nodes = document.querySelectorAll(REVEAL_SELECTORS);
      nodes.forEach((node) => {
        if (observedElements.has(node)) return;
        observedElements.add(node);
        node.classList.add('scroll-reveal-item');

        // Stagger siblings inside grids (cards, posters, trust items, footer columns)
        const parent = node.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((child) =>
            child.matches(
              '.hero-photo-card, .brand-poster-card, .editorial-vehicle-card, .trust-item-v2, .event-card, .footer-grid-v2 > div'
            )
          );
          const idx = siblings.indexOf(node);
          if (idx > 0) {
            node.style.setProperty('--reveal-delay', `${Math.min(idx * 85, 340)}ms`);
          }
        }

        const rect = node.getBoundingClientRect();
        const inInitialViewport =
          rect.top < window.innerHeight - 30 && rect.bottom > 30;
        if (inInitialViewport) {
          node.classList.add('scroll-in-view');
        } else if (rect.top < 0) {
          node.classList.add('scroll-out-top');
        } else {
          node.classList.add('scroll-out-bottom');
        }

        io.observe(node);
      });
    };

    registerElements();

    const mo = new MutationObserver(() => {
      registerElements();
    });

    mo.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
