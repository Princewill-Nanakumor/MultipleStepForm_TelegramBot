import type { SurveyFormData, ContactFormData, FormErrors } from "@/types";

export const initialSurveyData: SurveyFormData = {
  district: "",
  hoursPerDay: "",
  situationChange: "",
  predictableSchedule: "",
  comments: "",
};

export const initialContactData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const FADE_DURATION = 800;

export function flattenZodErrors(err: {
  flatten: () => { fieldErrors: Record<string, string[]> };
}): FormErrors {
  const flattened = err.flatten();
  const result: FormErrors = {};
  for (const [key, messages] of Object.entries(flattened.fieldErrors)) {
    if (messages && messages.length > 0) result[key] = messages[0];
  }
  return result;
}
