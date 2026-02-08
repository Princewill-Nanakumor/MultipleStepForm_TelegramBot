import { ReactNode } from "react";

export type Slide = {
  id: number;
  tag: string;
  tagDot: string;
  title: ReactNode;
  content: ReactNode;
  formType?: "intro" | "district" | "hours" | "situation" | "schedule" | "comments" | "contact";
};

export type SurveyFormData = {
  district: string;
  hoursPerDay: string;
  situationChange: string;
  predictableSchedule: string;
  comments: string;
};

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type SlideContentProps = {
  slide: Slide;
  surveyData: SurveyFormData;
  contactData: ContactFormData;
  onSurveyChange: (field: keyof SurveyFormData, value: string) => void;
  onContactChange: (field: keyof ContactFormData, value: string) => void;
  onNext?: () => void;
  onSubmit?: () => void;
};

export type CarouselNavigationProps = {
  activeSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
};
