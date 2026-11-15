"use client";

import { useState, useEffect } from 'react';

export const defaultFooterGallery = [
  {
    id: 'fg-1',
    src: 'travel3.jpeg',
    caption: 'Aoraki / Mount Cook — Private Alpine Helicopter Encounter',
    alt: 'Aoraki Mount Cook',
  },
  {
    id: 'fg-2',
    src: 'travel5.jpeg',
    caption: 'Milford Sound / Piopiotahi — Private Fiordland Sanctuary',
    alt: 'Milford Sound Fjord',
  },
  {
    id: 'fg-3',
    src: 'travel12.jpg',
    caption: 'Queenstown — Exclusive Lakeside Residence & Dining',
    alt: 'Queenstown Lake & Alps',
  },
  {
    id: 'fg-4',
    src: 'travel15.jpeg',
    caption: 'Akaroa & Banks Peninsula — Secluded Coastal Retreat',
    alt: 'Banks Peninsula Sanctuary',
  },
  {
    id: 'fg-5',
    src: '/travel14.jpg',
    caption: 'Southern Alps — Bespoke Glacier Landing Experience',
    alt: 'Southern Alps Glacier',
  },
  {
    id: 'fg-6',
    src: 'travel4.jpeg',
    caption: 'Marlborough Sounds — Superyacht Anchorage in Secluded Bays',
    alt: 'Marlborough Sounds',
  },
];

export function useFooterGallery() {
  const [photos, setPhotos] = useState(defaultFooterGallery);

  useEffect(() => {
    // Dynamic folder-based fetch from public/footer-gallery/gallery.json
    fetch('/footer-gallery/gallery.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, index) => ({
            id: item.id || `fg-${index + 1}`,
            src: item.src,
            caption: item.caption || 'New Zealand Luxury Expedition',
            alt: item.alt || item.caption || 'Ammar Expedition',
          }));
          setPhotos(formatted);
        }
      })
      .catch(() => {
        // Fallback gracefully to defaultFooterGallery
      });
  }, []);

  return { photos };
}
