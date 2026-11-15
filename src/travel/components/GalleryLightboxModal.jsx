"use client";
import React, { useEffect } from 'react';

export default function GalleryLightboxModal({ photo, onClose }) {
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#001f36]/80 backdrop-blur-md p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full flex flex-col items-center"
      >
        {/* Close Button at top-right corner just outside the image */}
        <button
          onClick={onClose}
          type="button"
          className="absolute -top-11 right-0 sm:-right-8 text-white/80 hover:text-white text-2xl p-2 cursor-pointer transition-colors focus:outline-none select-none"
          aria-label="Close Lightbox"
        >
          ✕
        </button>

        {/* Large Centered Image */}
        <img
          src={photo.src}
          alt={photo.alt || photo.caption}
          className="max-w-4xl w-full max-h-[75vh] object-contain rounded-[2px] shadow-2xl select-none"
        />

        {/* Caption Centered Below Image */}
        <p className="mt-4 text-white text-sm md:text-base font-sans tracking-wide text-center max-w-2xl drop-shadow-sm">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}
