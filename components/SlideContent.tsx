import type { SlideContentProps } from "@/types";

export default function SlideContent({
  slide,
  email,
  onEmailChange,
}: SlideContentProps) {
  return (
    <div className="w-full">
      {/* Tag - matches reference styling */}
      <div className="mb-4 flex items-center gap-2 sm:mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(60,53,242,0.4)] bg-[linear-gradient(135deg,rgba(60,53,242,0.18),rgba(74,95,217,0.18))] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-(--accent-primary) sm:px-4 sm:py-2 sm:text-xs">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--accent-primary) sm:h-2 sm:w-2" />
          {slide.tag}
        </span>
      </div>

      {/* Title - Playfair Display serif */}
      <h1
        className="mb-4 whitespace-nowrap font-serif text-3xl font-normal leading-[1.15] tracking-[-0.03em] text-white pt-1 sm:mb-6 sm:text-4xl md:text-5xl "
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {slide.title}
      </h1>

      {/* Content */}
      <div className="mb-6 max-w-xl text-sm leading-relaxed text-white/75 sm:mb-8 sm:text-base md:mb-10 md:text-lg lg:mb-12 lg:text-xl">
        {slide.content}
      </div>

      {/* Form or content-only (CTA embedded in content for About Us) */}
      {slide.form ? (
        <form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="h-12 w-full rounded-full border border-white/20 bg-white/5 px-4 text-white placeholder:text-white/40 transition-all duration-300 focus:border-(--accent-primary) focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-(--accent-primary) sm:h-14 sm:px-6 sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-br from-(--accent-primary) to-[#7ce8b5] px-6 font-semibold text-[#0d0d0d] shadow-[0_12px_24px_-8px_rgba(155,242,202,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(155,242,202,0.5)] hover:brightness-110 active:translate-y-0 active:brightness-95 sm:h-14 sm:px-8 sm:text-base"
            >
              Sign Up
            </button>
          </div>
          <p className="mt-4 whitespace-nowrap text-xs text-white/55 sm:mt-6 sm:text-sm">
            Join the kitchen. By clicking &apos;Sign Up&apos; you agree to our{" "}
            <a
              href="/privacy"
              className="text-(--accent-primary) hover:underline"
            >
              privacy policy
            </a>
            .
          </p>
        </form>
      ) : null}
    </div>
  );
}
