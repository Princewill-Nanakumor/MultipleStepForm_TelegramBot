import type { Slide } from "@/types";

export const KYIV_DISTRICTS = [
  "Holosiivskyi ",
  "Darnytskyi ",
  "Desnianskyi ",
  "Dniprovskyi ",
  "Obolonskyi ",
  "Pecherskyi ",
  "Podilskyi ",
  "Sviatoshynskyi ",
  "Solomianskyi ",
  "Shevchenkivskyi ",
  "Sofiivska Borshchahivka",
  "Petropavlivska Borshchahivka",
  "Chabany",
  "Vyshneve",
  "Boiarka",
  "Hostomel",
  "Irpin",
  "Horenychi",
  "Lyutizh",
  "Borshchahivka",
] as const;

export const SLIDES: Slide[] = [
  {
    id: 0,
    tag: "ELECTRICITY SURVEY",
    tagDot: "#FFD700",
    title: (
      <>
        Light{" "}
        <span className="bg-linear-to-br from-(--accent-primary) via-white/90 to-(--accent-tertiary) bg-clip-text text-transparent">
          Availability Survey
        </span>
      </>
    ),
    content: (
      <>
        <span className="font-medium text-white">
          Electricity Availability Survey – Kyiv
        </span>
        <br />
        <br />
        We are collecting information about electricity availability across Kyiv
        districts to gain a clearer understanding of the current situation. Your
        participation will help us better understand the challenges residents
        face and support efforts to advocate for improved services. This survey
        will take only a few minutes to complete. Thank you for contributing to
        this important initiative.
      </>
    ),
    formType: "intro",
  },
  {
    id: 1,
    tag: "QUESTION 1",
    tagDot: "#FFD700",
    title: "Which district?",
    content: "Select your district from the list below.",
    formType: "district",
  },
  {
    id: 2,
    tag: "QUESTION 2",
    tagDot: "#FFD700",
    title: "Hours of Electricity",
    content: "On average, how many hours per day do you have electricity?",
    formType: "hours",
  },
  {
    id: 3,
    tag: "QUESTION 3",
    tagDot: "#FFD700",
    title: "Situation Change",
    content: "Has the situation changed in the past 2 weeks?",
    formType: "situation",
  },
  {
    id: 4,
    tag: "QUESTION 4",
    tagDot: "#FFD700",
    title: "Timetable Schedule?",
    content: "Do outages follow a timetable schedule?",
    formType: "schedule",
  },
  {
    id: 5,
    tag: "OPTIONAL",
    tagDot: "#0057B7",
    title: "Additional Comments",
    content: "Share any details about outages in your area.",
    formType: "comments",
  },
  {
    id: 6,
    tag: "CONTACT",
    tagDot: "#0057B7",
    title: (
      <>
        Stay in Touch{" "}
        <span className="bg-linear-to-br from-(--accent-primary) via-white/90 to-(--accent-tertiary) bg-clip-text text-transparent"></span>
      </>
    ),
    content:
      "If you'd like updates about this survey or related reports, please leave your contact details.",
    formType: "contact",
  },
];
