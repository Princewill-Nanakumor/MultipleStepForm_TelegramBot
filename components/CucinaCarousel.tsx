"use client";

import Image from "next/image";
import { useState } from "react";
import type { SurveyFormData, ContactFormData } from "@/types";
import { SLIDES } from "./slides";
import BackgroundImage from "./BackgroundImage";
import SlideContent from "./SlideContent";
import CarouselNavigation from "./CarouselNavigation";

const initialSurveyData: SurveyFormData = {
  district: "",
  hoursPerDay: "",
  situationChange: "",
  predictableSchedule: "",
  comments: "",
};

const initialContactData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function CucinaCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [surveyData, setSurveyData] =
    useState<SurveyFormData>(initialSurveyData);
  const [contactData, setContactData] =
    useState<ContactFormData>(initialContactData);
  const FADE_DURATION = 500;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleSubmit = () => {
    console.log("Survey data:", surveyData);
    console.log("Contact data:", contactData);
    alert("Thank you! Your response has been recorded.");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundImage />

      <div className="relative flex min-h-screen items-center justify-center p-6">
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
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className={`absolute inset-0 flex transition-opacity ease-in-out ${
                  slide.id === activeSlide
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                } ${
                  slide.formType === "contact"
                    ? "items-start overflow-y-auto"
                    : "items-center"
                }`}
                style={{ transitionDuration: `${FADE_DURATION}ms` }}
              >
                <SlideContent
                  slide={slide}
                  surveyData={surveyData}
                  contactData={contactData}
                  onSurveyChange={(field, value) =>
                    setSurveyData((prev) => ({ ...prev, [field]: value }))
                  }
                  onContactChange={(field, value) =>
                    setContactData((prev) => ({ ...prev, [field]: value }))
                  }
                  onNext={slide.id < 6 ? nextSlide : undefined}
                  onSubmit={slide.id === 6 ? handleSubmit : undefined}
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
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
    </div>
  );
}
