import type { Slide, SurveyFormData, FormErrors } from "@/types";
import { KYIV_DISTRICTS } from "./slides";

const inputTertiaryFocus =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 transition-all duration-300 focus:border-(--accent-tertiary) focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-(--accent-tertiary)";
const labelBase = "mb-1.5 block text-sm font-medium text-white/90";
const btnBase =
  "inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-(--accent-primary) to-(--accent-tertiary) px-8 text-base font-semibold text-[#0d0d0d] shadow-[0_8px_16px_-6px_rgba(255,215,0,0.3)] transition-all duration-300 hover:brightness-110 active:brightness-95";

const errorText = "mt-1 text-sm text-red-400";

type SurveyFormStepProps = {
  formType: NonNullable<Slide["formType"]>;
  surveyData: SurveyFormData;
  onSurveyChange: (field: keyof SurveyFormData, value: string) => void;
  onNext: () => void;
  errors?: FormErrors;
};

export default function SurveyFormStep({
  formType,
  surveyData,
  onSurveyChange,
  onNext,
  errors = {},
}: SurveyFormStepProps) {
  if (formType === "intro") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <button type="submit" className={btnBase}>
          Get Started
        </button>
      </form>
    );
  }

  if (formType === "district") {
    return (
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <label className={labelBase}>
          District <span className="text-red-400">*</span>
        </label>
        <select
          value={surveyData.district}
          onChange={(e) => onSurveyChange("district", e.target.value)}
          className={`${inputTertiaryFocus} ${errors.district ? "border-red-400" : ""} mb-4 cursor-pointer`}
        >
          <option value="">Select district</option>
          {KYIV_DISTRICTS.map((d) => (
            <option key={d} value={d} className="bg-[#1a1a1a] text-white">
              {d}
            </option>
          ))}
        </select>
        {errors.district && (
          <p className={`${errorText} mb-4`}>{errors.district}</p>
        )}
        <button type="submit" className={btnBase}>
          Continue
        </button>
      </form>
    );
  }

  if (formType === "hours") {
    return (
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <label className={`${labelBase} mb-2 block`}>
          Hours per day <span className="text-red-400">*</span>
        </label>
        <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1">
          {[
            "0–2 hours",
            "3–6 hours",
            "7–12 hours",
            "13–18 hours",
            "19–24 hours",
          ].map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="hoursPerDay"
                value={opt}
                checked={surveyData.hoursPerDay === opt}
                onChange={() => onSurveyChange("hoursPerDay", opt)}
                className="h-4 w-4 accent-(--accent-primary)"
              />
              <span className="text-base text-white/90">{opt}</span>
            </label>
          ))}
        </div>
        {errors.hoursPerDay && (
          <p className={`${errorText} mb-4`}>{errors.hoursPerDay}</p>
        )}
        <button type="submit" className={btnBase}>
          Continue
        </button>
      </form>
    );
  }

  if (formType === "situation") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="mb-4 space-y-1">
          {["Improved", "Stayed the same", "Got worse"].map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="situationChange"
                value={opt}
                checked={surveyData.situationChange === opt}
                onChange={() => onSurveyChange("situationChange", opt)}
                className="h-4 w-4 accent-(--accent-primary)"
              />
              <span className="text-base text-white/90">{opt}</span>
            </label>
          ))}
        </div>
        {errors.situationChange && (
          <p className={`${errorText} mb-4`}>{errors.situationChange}</p>
        )}
        <button type="submit" className={btnBase}>
          Continue
        </button>
      </form>
    );
  }

  if (formType === "schedule") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="mb-4 space-y-1">
          {[
            "Yes, mostly follows timetable",
            "Sometimes",
            "No, no timetable",
          ].map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="predictableSchedule"
                value={opt}
                checked={surveyData.predictableSchedule === opt}
                onChange={() => onSurveyChange("predictableSchedule", opt)}
                className="h-4 w-4 accent-(--accent-primary)"
              />
              <span className="text-base text-white/90">{opt}</span>
            </label>
          ))}
        </div>
        {errors.predictableSchedule && (
          <p className={`${errorText} mb-4`}>{errors.predictableSchedule}</p>
        )}
        <button type="submit" className={btnBase}>
          Continue
        </button>
      </form>
    );
  }

  if (formType === "comments") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <textarea
          placeholder="Please share any details about outages in your area."
          value={surveyData.comments}
          onChange={(e) => onSurveyChange("comments", e.target.value)}
          rows={3}
          className={`${inputTertiaryFocus} ${errors.comments ? "border-red-400" : ""} mb-4 resize-none`}
        />
        {errors.comments && (
          <p className={`${errorText} mb-4`}>{errors.comments}</p>
        )}
        <button type="submit" className={btnBase}>
          Continue
        </button>
      </form>
    );
  }

  return null;
}
