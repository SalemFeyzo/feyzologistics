import { LandingAbout } from "@/components/landing/landing-about";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingServices } from "@/components/landing/landing-services";
import { LandingTrust } from "@/components/landing/landing-trust";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  await params;
  return (
    <main className="min-h-screen w-full">
      <LandingNavbar />
      <LandingHero />
      <LandingServices />
      <LandingAbout />
      <LandingTrust />
      <LandingContact />
      <LandingFooter />
    </main>
  );
}
