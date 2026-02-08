import Image from "next/image";

export default function BackgroundImage() {
  return (
    <>
      <Image
        src="/marjan-blan-UDdkJlfn7cU-unsplash.jpg"
        alt="Background"
        fill
        className="object-cover  brightness-90"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0" aria-hidden />
    </>
  );
}
