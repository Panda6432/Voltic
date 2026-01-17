import React from "react";

export default function EventCardSkeleton() {
  return (
    <div className="relative w-[350px] h-[450px] md:w-[420px] md:h-[600px] border border-white/10 bg-neutral-900 flex-shrink-0 animate-pulse overflow-hidden">
      {/* Background Placeholder (Darker grey to mimic image load) */}
      <div className="absolute inset-0 bg-white/5"></div>

      {/* CONTENT PLACEHOLDERS */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start transform translate-y-4">
        
        {/* Category Badge Placeholder */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-24 bg-white/10 rounded-sm"></div>
          <div className="h-6 w-16 bg-white/10 rounded-sm"></div>
        </div>

        {/* Date + Location Placeholder */}
        <div className="h-4 w-48 bg-white/10 mb-4 rounded-sm"></div>

        {/* Title Placeholder (2 lines to look realistic) */}
        <div className="h-8 w-3/4 bg-white/20 mb-2 rounded-sm"></div>
        <div className="h-8 w-1/2 bg-white/20 mb-6 rounded-sm"></div>

        {/* Arrow Circle Placeholder */}
        <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5"></div>
      </div>
    </div>
  );
}