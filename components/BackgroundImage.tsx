import Image from "next/image";

export default function BackgroundImage() {
  return (
    <>
      <Image
        src="/iuliu-illes-JubMDAhWdo8-unsplash.jpg"
        alt="Background"
        fill
        className="object-cover grayscale brightness-75"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0" aria-hidden />
    </>
  );
}
