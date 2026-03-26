"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/Hero/HeroSection"),
  { ssr: false }
);
const FlywheelScrollytelling = dynamic(
  () => import("@/components/Flywheel/FlywheelScrollytelling"),
  { ssr: false }
);
const LeagueSpotlight = dynamic(
  () => import("@/components/League/LeagueSpotlight"),
  { ssr: false }
);
const XPPhilosophy = dynamic(
  () => import("@/components/XPPhilosophy/XPPhilosophy"),
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
      <FlywheelScrollytelling />
      <LeagueSpotlight />
      <XPPhilosophy />
      <ConceptAnimation />
      <WaitlistSection />
      <GravityFooter />
    </main>
  );
}
