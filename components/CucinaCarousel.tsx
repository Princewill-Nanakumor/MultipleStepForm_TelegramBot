"use client";

import { useState } from "react";
import { SLIDES } from "./slides";
import BackgroundImage from "./BackgroundImage";
import SlideContent from "./SlideContent";
import CarouselNavigation from "./CarouselNavigation";

export default function CucinaCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [email, setEmail] = useState("");
  const FADE_DURATION = 800;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundImage />

      <div className="relative flex min-h-screen items-center justify-center p-6">
        <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-[#0d0d0d]/56 px-6 py-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8 md:p-10 lg:p-12">
          <div
            className="pointer-events-none absolute -top-28 right-0 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(74,95,217,0.25)_0%,transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(155,242,202,0.2)_0%,transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent"
            aria-hidden
          />

          {/* Slide track - fade transition */}
          <div className="relative z-10 min-h-88 overflow-hidden sm:min-h-96 md:min-h-100">
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity ease-in-out ${
                  slide.id === activeSlide
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                style={{ transitionDuration: `${FADE_DURATION}ms` }}
              >
                <SlideContent
                  slide={slide}
                  email={email}
                  onEmailChange={setEmail}
                />
              </div>
            ))}
          </div>

          <CarouselNavigation
            activeSlide={activeSlide}
            totalSlides={SLIDES.length}
            onPrev={prevSlide}
            onNext={nextSlide}
            onSlideChange={setActiveSlide}
          />
        </div>
      </div>
    </div>
  );
}
