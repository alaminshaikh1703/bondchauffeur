"use client";
import React from 'react';
import { nzSvgViewBox, nzRegions, nzPins } from '../data/nzGeoPaths';

export default function NewZealandMap({ activeRegionId, onSelectRegion, onHoverRegion }) {
  const isAct = (id) => activeRegionId === id;

  return (
    <div className="relative w-full max-w-[1150px] h-[520px] md:h-[640px] mx-auto my-8 md:my-12 flex items-center justify-center select-none">
      <svg
        viewBox={nzSvgViewBox}
        className="w-full h-full drop-shadow-sm overflow-visible"
        style={{ maxHeight: '100%' }}
      >
        {/* Subtle Regional Boundary Grid Detail Lines */}
        <g stroke="#D8C8B6" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.45">
          <line x1="80" y1="1180" x2="420" y2="1180" />
          <line x1="220" y1="920" x2="620" y2="920" />
          <line x1="480" y1="580" x2="880" y2="580" />
          <line x1="560" y1="300" x2="820" y2="300" />
        </g>

        {/* 16 Real Cartographic Regional Polygons grouped into 4 Territories */}
        <g className="transition-all duration-300">
          {nzRegions.map((region) => {
            const active = isAct(region.territory);
            return (
              <path
                key={region.key}
                d={region.d}
                onClick={() => onSelectRegion(region.territory)}
                onMouseEnter={() => onHoverRegion(region.territory)}
                onMouseLeave={() => onHoverRegion(null)}
                className="cursor-pointer transition-all duration-500 ease-out"
                style={{
                  fill: active ? '#C9B396' : '#E5DACB',
                  stroke: active ? '#C59B27' : '#EFE7DC',
                  strokeWidth: active ? 1.8 : 0.75,
                  filter: active ? 'drop-shadow(0 0 12px rgba(197, 155, 39, 0.45))' : 'none',
                }}
              />
            );
          })}
        </g>

        {/* Lake Taupō iconic inland volcanic lake cutout */}
        <ellipse
          cx="762"
          cy="442"
          rx="20"
          ry="24"
          fill="#F2EBE3"
          stroke="#C8B8A6"
          strokeWidth="0.8"
          className="pointer-events-none"
        />
      </svg>

      {/* Kudanil-Style Map Pin Badges on Each Region */}
      {nzPins.map((pin) => {
        const active = isAct(pin.id);
        return (
          <div
            key={pin.id}
            style={{ top: pin.top, left: pin.left }}
            onClick={(e) => { e.stopPropagation(); onSelectRegion(pin.id); }}
            onMouseEnter={() => onHoverRegion(pin.id)}
            onMouseLeave={() => onHoverRegion(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
          >
            {active && (
              <span className="absolute -inset-2.5 rounded-full bg-[#C59B27]/30 animate-ping pointer-events-none" />
            )}
            <div
              className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition-all duration-300 border shadow-md ${
                active
                  ? 'bg-[#8C6D3F] border-[#D4AF37] text-white shadow-[0_4px_16px_rgba(212,175,55,0.45)] scale-110 z-30'
                  : 'border-[#B8A692]/60 bg-[#F2EBE3]/80 text-[#8C7A65] hover:bg-white hover:text-[#8C6D3F] hover:scale-105 z-20'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
            </div>

            {/* Hover Tooltip Pill */}
            <div
              className={`absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-persian text-light px-3 py-1.5 rounded-[4px] shadow-xl pointer-events-none transition-all duration-300 border border-persian/20 ${
                active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
              }`}
            >
              <div className="text-xs font-medium tracking-wide">{pin.title}</div>
              <div className="text-[9px] text-accent tracking-wider font-light mt-0.5">{pin.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
