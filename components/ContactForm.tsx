import type { ContactFormData, FormErrors } from "@/types";

const inputTertiaryFocus =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 transition-all duration-300 focus:border-(--accent-tertiary) focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-(--accent-tertiary)";
const labelBase = "mb-1.5 block text-sm font-medium text-white/90";
const btnBase =
  "inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-(--accent-primary) to-(--accent-tertiary) px-8 text-base font-semibold text-[#0d0d0d] shadow-[0_8px_16px_-6px_rgba(255,215,0,0.3)] transition-all duration-300 hover:brightness-110 active:brightness-95";

const errorText = "mt-1 text-sm text-red-400";

type ContactFormProps = {
  contactData: ContactFormData;
  onContactChange: (field: keyof ContactFormData, value: string) => void;
  onSubmit: () => void;
  errors?: FormErrors;
  isSubmitting?: boolean;
};

export default function ContactForm({
  contactData,
  onContactChange,
  onSubmit,
  errors = {},
  isSubmitting = false,
}: ContactFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="mb-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelBase}>
            First name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="First name"
            value={contactData.firstName}
            onChange={(e) => onContactChange("firstName", e.target.value)}
            className={`${inputTertiaryFocus} ${errors.firstName ? "border-red-400" : ""}`}
          />
          {errors.firstName && (
            <p className={errorText}>{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className={labelBase}>
            Last name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Last name"
            value={contactData.lastName}
            onChange={(e) => onContactChange("lastName", e.target.value)}
            className={`${inputTertiaryFocus} ${errors.lastName ? "border-red-400" : ""}`}
          />
          {errors.lastName && (
            <p className={errorText}>{errors.lastName}</p>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label className={labelBase}>
          Email <span className="text-red-400">*</span>
        </label>
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
        <label className={labelBase}>
          Phone <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          placeholder="Phone"
          value={contactData.phone}
          onChange={(e) => onContactChange("phone", e.target.value)}
          className={`${inputTertiaryFocus} ${errors.phone ? "border-red-400" : ""}`}
        />
        {errors.phone && <p className={errorText}>{errors.phone}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${btnBase} disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting…
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
