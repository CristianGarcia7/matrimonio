'use client';

import { useEffect, useState } from 'react';

import { GALLERY_TRACK_ID } from '../gallery-photos';

// Tracks which photo of the mobile carousel is centred.
export function useGalleryDots() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = document.getElementById(GALLERY_TRACK_ID);
    if (!track) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const items = Array.from(track.children);
          setActiveIndex(items.indexOf(entry.target));
        }
      },
      { root: track, threshold: 0.6 }
    );
    for (const item of Array.from(track.children)) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  const goToPhoto = (index: number) => {
    const track = document.getElementById(GALLERY_TRACK_ID);
    const item = track?.children.item(index);
    item?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  return { activeIndex, goToPhoto };
}
