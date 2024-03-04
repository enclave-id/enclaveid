import { LandingConnections } from './LandingConnections';
import { LandingFeatures } from './LandingFeatures';
import { LandingHero } from './LandingHero';
import { LandingInformation } from './LandingInformation';
import { LandingNavbar } from './LandingNavbar';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingConnections />
      <LandingInformation />
    </div>
  );
}

export { LandingPage };
