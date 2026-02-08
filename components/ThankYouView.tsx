type ThankYouViewProps = {
  onBackToHomepage: () => void;
};

export default function ThankYouView({ onBackToHomepage }: ThankYouViewProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 py-8 text-center">
      <div className="rounded-full bg-(--accent-tertiary)/20 p-4">
        <svg
          className="h-12 w-12 text-(--accent-tertiary)"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2
        className="font-serif text-2xl font-semibold text-white sm:text-3xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Thank you!
      </h2>
      <p className="max-w-md text-base text-white/80 sm:text-lg">
        Your response has been recorded successfully. We appreciate your
        participation in the Electricity Availability Survey.
      </p>
      <button
        type="button"
        onClick={onBackToHomepage}
        className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-(--accent-primary) to-(--accent-tertiary) px-8 text-base font-semibold text-[#0d0d0d] shadow-[0_8px_16px_-6px_rgba(255,215,0,0.3)] transition-all duration-300 hover:brightness-110 active:brightness-95"
      >
        Back to Homepage
      </button>
    </div>
  );
}
