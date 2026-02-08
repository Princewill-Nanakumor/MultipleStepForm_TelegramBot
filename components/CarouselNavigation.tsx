import type { CarouselNavigationProps } from "@/types";

export default function CarouselNavigation({
  activeSlide,
  totalSlides,
  onPrev,
  onNext,
  onSlideChange,
}: CarouselNavigationProps) {
  return (
    <div className="relative z-10 mt-6 flex w-full items-center justify-between sm:mt-8">
      <button
        onClick={onPrev}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:-translate-x-0.5 hover:bg-white/20 sm:h-10 sm:w-10"
        aria-label="Previous slide"
      >
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${
              index === activeSlide
                ? "h-1.5 w-6 bg-[var(--accent-primary)] sm:h-2 sm:w-8"
                : "h-1.5 w-1.5 bg-white/30 hover:bg-white/50 sm:h-2 sm:w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:translate-x-0.5 hover:bg-white/20 sm:h-10 sm:w-10"
        aria-label="Next slide"
      >
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
