import { z } from "zod";
import { KYIV_DISTRICTS } from "@/components/slides";

const HOURS_OPTIONS = [
  "0–2 hours",
  "3–6 hours",
  "7–12 hours",
  "13–18 hours",
  "19–24 hours",
] as const;

const SITUATION_OPTIONS = ["Improved", "Stayed the same", "Got worse"] as const;

const SCHEDULE_OPTIONS = [
  "Yes, mostly follows timetable",
  "Sometimes",
  "No, no timetable",
] as const;

export const surveySchema = z.object({
  district: z
    .string()
    .min(1, "Please select a district")
    .refine((val) => KYIV_DISTRICTS.includes(val as (typeof KYIV_DISTRICTS)[number]), {
      message: "Please select a valid district",
    }),
  hoursPerDay: z.enum(HOURS_OPTIONS, {
    message: "Please select how many hours per day you have electricity",
  }),
  situationChange: z.enum(SITUATION_OPTIONS, {
    message: "Please select how the situation has changed",
  }),
  predictableSchedule: z.enum(SCHEDULE_OPTIONS, {
    message: "Please select whether outages follow a timetable",
  }),
  comments: z.string().max(2000, "Comments must be at most 2000 characters"),
});

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .refine(
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    "Please enter a valid email address"
  );

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100, "First name must be at most 100 characters"),
  lastName: z.string().min(1, "Last name is required").max(100, "Last name must be at most 100 characters"),
  email: emailSchema,
  phone: z.string().min(1, "Phone is required").max(20, "Phone must be at most 20 characters"),
});
