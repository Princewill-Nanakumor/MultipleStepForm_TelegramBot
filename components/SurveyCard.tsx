import Image from "next/image";
import type { ReactNode } from "react";
import CarouselNavigation from "./CarouselNavigation";

type SurveyCardProps = {
  children: ReactNode;
  showNavigation: boolean;
  activeSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
  showPrev: boolean;
  showNext: boolean;
};

export default function SurveyCard({
  children,
  showNavigation,
  activeSlide,
  totalSlides,
  onPrev,
  onNext,
  onSlideChange,
  showPrev,
  showNext,
}: SurveyCardProps) {
  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-[#0d0d0d]/56 px-5 py-6 shadow-[0_32px_64px_-16px_rgba(0,87,183,0.15)] backdrop-blur-2xl sm:px-6 sm:py-7 md:px-8 md:py-8">
      <div
        className="pointer-events-none absolute -top-28 right-0 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(0,87,183,0.3)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.25)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"
        aria-hidden
      />

      <div className="absolute right-4 top-4 z-20 h-12 w-12 overflow-hidden rounded-full border-2 border-white/30 shadow-lg sm:h-14 sm:w-14">
        <Image
          src="/Flag_of_Ukraine_(with_coat_of_arms).svg"
          alt="Ukraine flag"
          width={56}
          height={56}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 flex min-h-112 flex-col overflow-hidden sm:min-h-120 md:min-h-128">
        {children}
      </div>

      {showNavigation && (
        <div className="mt-4">
          <CarouselNavigation
            activeSlide={activeSlide}
            totalSlides={totalSlides}
            onPrev={onPrev}
            onNext={onNext}
            onSlideChange={onSlideChange}
            showPrev={showPrev}
            showNext={showNext}
          />
        </div>
      )}
    </div>
  );
}
