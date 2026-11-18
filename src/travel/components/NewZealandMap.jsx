"use client";
import React from 'react';

const southIslandPins = [
  {
    id: 'kaikoura',
    title: 'Kaikōura',
    sub: 'Pacific Coastline',
    left: '70.6%',
    top: '29.0%',
  },
  {
    id: 'hanmer-springs',
    title: 'Hanmer Springs',
    sub: 'Alpine Thermal Village',
    left: '61.8%',
    top: '31.5%',
  },
  {
    id: 'christchurch',
    title: 'Christchurch',
    sub: 'Canterbury Gateway',
    left: '61.52%',
    top: '39.84%',
  },
  {
    id: 'akaroa',
    title: 'Akaroa',
    sub: 'Banks Peninsula',
    left: '63.55%',
    top: '47.95%',
  },
  {
    id: 'aoraki-mount-cook',
    title: 'Aoraki / Mount Cook',
    sub: 'Southern Alps',
    left: '44.2%',
    top: '48.8%',
  },
  {
    id: 'lake-tekapo',
    title: 'Lake Tekapo',
    sub: 'Mackenzie Basin',
    left: '50.2%',
    top: '52.8%',
  },
  {
    id: 'wanaka',
    title: 'Wānaka',
    sub: 'Southern Lakes',
    left: '39.24%',
    top: '58.03%',
  },
  {
    id: 'queenstown',
    title: 'Queenstown',
    sub: 'Lake Wakatipu',
    left: '35.26%',
    top: '64.16%',
  },
  {
    id: 'fiordland',
    title: 'Fiordland',
    sub: 'Milford & Doubtful Sound',
    left: '20.68%',
    top: '74.32%',
  },
];

export default function NewZealandMap({ activeRegionId, onSelectRegion, onHoverRegion }) {
  return (
    <div className="relative w-full max-w-[920px] aspect-[3/2] mx-auto my-2 md:my-4 flex items-center justify-center select-none">
      {/* Custom South Island Topographic Map Artwork */}
      <img
        src="/South%20Island%20map.png"
        alt="South Island New Zealand Topographic Map"
        draggable={false}
        className="w-full h-full object-contain pointer-events-none select-none transition-opacity duration-500"
      />

      {/* 9 Interactive White Dots Mapped 1-to-1 with Each South Island Location Card */}
      {southIslandPins.map((pin) => {
        const active = activeRegionId === pin.id;

        return (
          <div
            key={pin.id}
            style={{ top: pin.top, left: pin.left }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectRegion(pin.id);
            }}
            onMouseEnter={() => onHoverRegion(pin.id)}
            onMouseLeave={() => onHoverRegion(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 p-2"
          >
            {active && (
              <span className="absolute inset-0 rounded-full bg-[#D4AF37]/45 animate-ping pointer-events-none" />
            )}
            <div
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 border-2 ${
                active
                  ? 'bg-[#D4AF37] border-white shadow-[0_0_20px_rgba(212,175,55,0.9)] scale-125'
                  : 'bg-white border-[#04182B]/70 shadow-[0_0_12px_rgba(255,255,255,0.75)] hover:bg-[#D4AF37] hover:border-white hover:scale-125'
              }`}
            />

            {/* Location Name Tooltip on Hover / Active */}
            <div
              className={`absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#04182B]/95 backdrop-blur-md text-white px-3 py-1.5 rounded-[4px] shadow-2xl pointer-events-none transition-all duration-200 border border-white/20 z-40 ${
                active
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-1 scale-95'
              }`}
            >
              <div className="text-xs font-medium tracking-wide">{pin.title}</div>
              <div className="text-[9px] text-[#D4AF37] tracking-wider font-light mt-0.5">
                {pin.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
