import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingServices } from "@/components/landing/landing-services";
import { LandingAbout } from "@/components/landing/landing-about";
import { LandingTrust } from "@/components/landing/landing-trust";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingServices />
        <LandingAbout />
        <LandingTrust />
        <LandingContact />
      </main>
      <LandingFooter />
    </>
  );
}
