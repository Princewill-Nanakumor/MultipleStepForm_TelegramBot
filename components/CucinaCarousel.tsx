"use client";

import { useState } from "react";
import type { SurveyFormData, ContactFormData, FormErrors } from "@/types";
import { surveySchema, contactSchema } from "@/lib/schemas";
import {
  initialSurveyData,
  initialContactData,
  flattenZodErrors,
  FADE_DURATION,
} from "@/lib/carouselUtils";
import { SLIDES } from "./slides";
import BackgroundImage from "./BackgroundImage";
import SlideContent from "./SlideContent";
import ThankYouView from "./ThankYouView";
import SurveyCard from "./SurveyCard";

export default function CucinaCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [surveyData, setSurveyData] =
    useState<SurveyFormData>(initialSurveyData);
  const [contactData, setContactData] =
    useState<ContactFormData>(initialContactData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextSlide = () => {
    setErrors({});
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setErrors({});
  };

  const validateSlide = (slideId: number) => {
    const slide = SLIDES[slideId];
    if (slide.formType === "district") {
      const result = surveySchema.pick({ district: true }).safeParse(surveyData);
      return result.success ? null : flattenZodErrors(result.error);
    }
    if (slide.formType === "hours") {
      const result = surveySchema.pick({ hoursPerDay: true }).safeParse(surveyData);
      return result.success ? null : flattenZodErrors(result.error);
    }
    if (slide.formType === "situation") {
      const result = surveySchema.pick({ situationChange: true }).safeParse(surveyData);
      return result.success ? null : flattenZodErrors(result.error);
    }
    if (slide.formType === "schedule") {
      const result = surveySchema.pick({ predictableSchedule: true }).safeParse(surveyData);
      return result.success ? null : flattenZodErrors(result.error);
    }
    if (slide.formType === "comments") {
      const result = surveySchema.pick({ comments: true }).safeParse(surveyData);
      return result.success ? null : flattenZodErrors(result.error);
    }
    return null;
  };

  const validateAndNext = () => {
    setErrors({});
    const errs = validateSlide(activeSlide);
    if (errs) {
      setErrors(errs);
      return;
    }
    setErrors({});
    nextSlide();
  };

  const handleSlideChange = (index: number) => {
    if (index <= activeSlide) {
      setErrors({});
      setActiveSlide(index);
      return;
    }
    setErrors({});
    for (let i = activeSlide; i < index; i++) {
      const errs = validateSlide(i);
      if (errs) {
        setErrors(errs);
        setActiveSlide(i);
        return;
      }
    }
    setActiveSlide(index);
  };

  const handleSubmit = async () => {
    setErrors({});
    const result = contactSchema.safeParse({ ...contactData });
    if (!result.success) {
      setErrors(flattenZodErrors(result.error));
      return;
    }
    try {
      const res = await fetch("/api/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyData, contactData }),
      });
      const data = (await res.json()) as { success: boolean; error?: string };
      if (!data.success && data.error) {
        console.error("Submit error:", data.error);
      }
    } catch (err) {
      console.error("Failed to submit survey:", err);
    }
    setIsSubmitted(true);
  };

  const goToHomepage = () => {
    setIsSubmitted(false);
    setActiveSlide(0);
    setSurveyData(initialSurveyData);
    setContactData(initialContactData);
    setErrors({});
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundImage />

      <div className="relative flex min-h-screen items-center justify-center p-6">
        <SurveyCard
          showNavigation={!isSubmitted}
          activeSlide={activeSlide}
          totalSlides={SLIDES.length}
          onPrev={prevSlide}
          onNext={
            [1, 2, 3, 4, 5].includes(activeSlide)
              ? validateAndNext
              : nextSlide
          }
          onSlideChange={handleSlideChange}
          showPrev={activeSlide > 0}
          showNext={activeSlide < 6}
        >
          {isSubmitted ? (
            <ThankYouView onBackToHomepage={goToHomepage} />
          ) : (
            <>
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
                    onSurveyChange={(field, value) => {
                      setSurveyData((prev) => ({ ...prev, [field]: value }));
                      setErrors((prev) => ({ ...prev, [field]: undefined }));
                    }}
                    onContactChange={(field, value) => {
                      setContactData((prev) => ({ ...prev, [field]: value }));
                      setErrors((prev) => ({ ...prev, [field]: undefined }));
                    }}
                    onNext={
                      slide.id < 6
                        ? slide.formType === "district" ||
                          slide.formType === "hours" ||
                          slide.formType === "situation" ||
                          slide.formType === "schedule" ||
                          slide.formType === "comments"
                          ? validateAndNext
                          : nextSlide
                        : undefined
                    }
                    onSubmit={slide.id === 6 ? handleSubmit : undefined}
                    errors={errors}
                  />
                </div>
              ))}
            </>
          )}
        </SurveyCard>
      </div>
    </div>
  );
}
