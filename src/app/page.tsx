"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/Hero/HeroSection"),
  { ssr: false }
);
const ConceptAnimation = dynamic(
  () => import("@/components/ConceptAnimation/ConceptAnimation"),
  { ssr: false }
);
const WaitlistSection = dynamic(
  () => import("@/components/Waitlist/WaitlistSection"),
  { ssr: false }
);
const GravityFooter = dynamic(
  () => import("@/components/GravityFooter/GravityFooter"),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ConceptAnimation />
      <WaitlistSection />
      <GravityFooter />
    </main>
  );
}
