import { ReactNode } from "react";

export type Slide = {
  id: number;
  tag: string;
  tagDot: string;
  title: ReactNode;
  content: ReactNode;
  cta?: string;
  form?: boolean;
};

export type SlideContentProps = {
  slide: Slide;
  email: string;
  onEmailChange: (value: string) => void;
};

export type CarouselNavigationProps = {
  activeSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
};
