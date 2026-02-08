import type { SlideContentProps } from "@/types";
import { KYIV_DISTRICTS } from "./slides";

const inputTertiaryFocus =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 transition-all duration-300 focus:border-(--accent-tertiary) focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-(--accent-tertiary)";
const labelBase = "mb-1.5 block text-sm font-medium text-white/90";
const btnBase =
  "inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-(--accent-primary) to-(--accent-tertiary) px-8 text-base font-semibold text-[#0d0d0d] shadow-[0_8px_16px_-6px_rgba(255,215,0,0.3)] transition-all duration-300 hover:brightness-110 active:brightness-95";

const errorText = "mt-1 text-sm text-red-400";

export default function SlideContent({
  slide,
  surveyData,
  contactData,
  onSurveyChange,
  onContactChange,
  onNext,
  onSubmit,
  errors = {},
}: SlideContentProps) {
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

      {slide.formType === "intro" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext?.();
          }}
        >
          <button type="submit" className={btnBase}>
            Get Started
          </button>
        </form>
      )}

      {slide.formType === "district" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext?.();
          }}
        >
          <label className={labelBase}>
            District <span className="text-red-400">*</span>
          </label>
          <select
            required
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
          {errors.district && <p className={errorText}>{errors.district}</p>}
          <button type="submit" className={btnBase}>
            Continue
          </button>
        </form>
      )}

      {slide.formType === "hours" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext?.();
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
                  required
                />
                <span className="text-base text-white/90">{opt}</span>
              </label>
            ))}
          </div>
          {errors.hoursPerDay && <p className={`${errorText} mb-4`}>{errors.hoursPerDay}</p>}
          <button type="submit" className={btnBase}>
            Continue
          </button>
        </form>
      )}

      {slide.formType === "situation" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext?.();
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
          {errors.situationChange && <p className={`${errorText} mb-4`}>{errors.situationChange}</p>}
          <button type="submit" className={btnBase}>
            Continue
          </button>
        </form>
      )}

      {slide.formType === "schedule" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext?.();
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
          {errors.predictableSchedule && <p className={`${errorText} mb-4`}>{errors.predictableSchedule}</p>}
          <button type="submit" className={btnBase}>
            Continue
          </button>
        </form>
      )}

      {slide.formType === "comments" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext?.();
          }}
        >
          <textarea
            placeholder="Please share any details about outages in your area."
            value={surveyData.comments}
            onChange={(e) => onSurveyChange("comments", e.target.value)}
            rows={3}
            className={`${inputTertiaryFocus} ${errors.comments ? "border-red-400" : ""} mb-4 resize-none`}
          />
          {errors.comments && <p className={`${errorText} mb-4`}>{errors.comments}</p>}
          <button type="submit" className={btnBase}>
            Continue
          </button>
        </form>
      )}

      {slide.formType === "contact" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
        >
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelBase}>First name <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="First name"
                value={contactData.firstName}
                onChange={(e) => onContactChange("firstName", e.target.value)}
                className={`${inputTertiaryFocus} ${errors.firstName ? "border-red-400" : ""}`}
              />
              {errors.firstName && <p className={errorText}>{errors.firstName}</p>}
            </div>
            <div>
              <label className={labelBase}>Last name <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="Last name"
                value={contactData.lastName}
                onChange={(e) => onContactChange("lastName", e.target.value)}
                className={`${inputTertiaryFocus} ${errors.lastName ? "border-red-400" : ""}`}
              />
              {errors.lastName && <p className={errorText}>{errors.lastName}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label className={labelBase}>Email <span className="text-red-400">*</span></label>
            <input
              type="email"
              placeholder="Email"
              value={contactData.email}
              onChange={(e) => onContactChange("email", e.target.value)}
              className={`${inputTertiaryFocus} ${errors.email ? "border-red-400" : ""}`}
            />
            {errors.email && <p className={errorText}>{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className={labelBase}>Phone <span className="text-red-400">*</span></label>
            <input
              type="tel"
              placeholder="Phone"
              value={contactData.phone}
              onChange={(e) => onContactChange("phone", e.target.value)}
              className={`${inputTertiaryFocus} ${errors.phone ? "border-red-400" : ""}`}
            />
            {errors.phone && <p className={errorText}>{errors.phone}</p>}
          </div>
          <button type="submit" className={btnBase}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
