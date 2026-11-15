"use client";
import React, { useState } from 'react';
import { useFooterGallery } from '../data/footerGalleryData';
import GalleryLightboxModal from './GalleryLightboxModal';

export default function FooterGalleryMarquee() {
  const { photos } = useFooterGallery();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Duplicate photos for seamless infinite horizontal loop
  const marqueeItems = [...photos, ...photos];

  return (
    <>
      <div className="w-full overflow-hidden select-none py-2">
        <div className="flex items-end pt-28 pb-6 gap-5 lg:gap-6 w-max animate-marquee">
          {marqueeItems.map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              onClick={() => setSelectedPhoto(photo)}
              className="relative w-[320px] sm:w-[370px] lg:w-[410px] h-[300px] sm:h-[340px] lg:h-[360px] shrink-0 group cursor-pointer"
            >
              <div className="absolute bottom-0 left-0 right-0 w-full h-full group-hover:h-[132%] rounded-[4px] overflow-hidden shadow-lg group-hover:shadow-2xl z-10 group-hover:z-20 transition-[height,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-[#001f36]/10">
                <img
                  src={photo.src}
                  alt={photo.alt || photo.caption}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 block pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                  <span className="text-white text-xs sm:text-sm font-light line-clamp-1 drop-shadow-md">
                    {photo.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GalleryLightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}
