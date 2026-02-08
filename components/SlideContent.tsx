import type { SlideContentProps } from "@/types";
import SurveyFormStep from "./SurveyFormStep";
import ContactForm from "./ContactForm";

export default function SlideContent({
  slide,
  surveyData,
  contactData,
  onSurveyChange,
  onContactChange,
  onNext,
  onSubmit,
  errors = {},
  isSubmitting = false,
}: SlideContentProps) {
  const isSurveyStep =
    slide.formType === "intro" ||
    slide.formType === "district" ||
    slide.formType === "hours" ||
    slide.formType === "situation" ||
    slide.formType === "schedule" ||
    slide.formType === "comments";

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,87,183,0.5)] bg-[linear-gradient(135deg,rgba(0,87,183,0.2),rgba(255,255,255,0.08))] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white/95">
          <span className="h-1 w-1 animate-pulse rounded-full bg-(--accent-tertiary)" />
          {slide.tag}
        </span>
      </div>

      <h1
        className="mb-4 font-serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {slide.title}
      </h1>

      <div className="mb-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
        {slide.content}
      </div>

      {isSurveyStep && slide.formType && (
        <SurveyFormStep
          formType={slide.formType}
          surveyData={surveyData}
          onSurveyChange={onSurveyChange}
          onNext={onNext!}
          errors={errors}
        />
      )}

      {slide.formType === "contact" && onSubmit && (
        <ContactForm
          contactData={contactData}
          onContactChange={onContactChange}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
