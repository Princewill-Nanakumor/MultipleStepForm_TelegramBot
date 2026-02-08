import type { Slide } from "@/types";

export const SLIDES: Slide[] = [
  {
    id: 0,
    tag: "AI PRODUCT BRIEFING",
    tagDot: "#40E0D0",
    title: (
      <>
        The newsletter for{" "}
        <span className="bg-linear-to-br from-(--accent-primary) to-(--accent-tertiary) bg-clip-text text-transparent">
          AI Builders
        </span>
      </>
    ),
    content:
      "Fresh recipes, emerging trends, and the latest developments in artificial intelligence — served straight to your inbox.",
    form: true,
  },
  {
    id: 1,
    tag: "ABOUT US",
    tagDot: "#50C8F6",
    title: (
      <>
        What is{" "}
        <span className="bg-linear-to-br from-(--accent-primary) to-(--accent-tertiary) bg-clip-text text-transparent">
          cucina <span className="font-bold">labs</span>?
        </span>
      </>
    ),
    content: (
      <>
        <span className="text-white">cucina <span className="font-bold">labs</span></span>{" "}
        is a test kitchen for AI builders. We experiment with AI tools and explore emerging trends. Daily insights are on the menu with recipes coming soon.
        <br /><br />
        <span className="text-white/90 font-medium">Let&apos;s cook.</span>
      </>
    ),
    cta: "Let's cook.",
  },
];
