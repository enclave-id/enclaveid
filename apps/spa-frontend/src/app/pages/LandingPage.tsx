import { LandingConnections } from '../components/landingPage/LandingConnections';
import { LandingFeatures } from '../components/landingPage/LandingFeatures';
import { LandingFooter } from '../components/landingPage/LandingFooter';
import { LandingHero } from '../components/landingPage/LandingHero';
import { LandingInformation } from '../components/landingPage/LandingInformation';
import { LandingNavbar } from '../components/landingPage/LandingNavbar';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingConnections />
      <LandingInformation />
      <LandingFooter />
    </div>
  );
}
