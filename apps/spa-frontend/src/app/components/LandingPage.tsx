import { LandingFeatures } from './landingPage/LandingFeatures';
import { LandingHero } from './landingPage/LandingHero';
import { LandingInformation } from './landingPage/LandingInformation';
import { LandingNavbar } from './landingPage/LandingNavbar';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      {/* <LandingConnections /> */}
      <LandingInformation />
    </div>
  );
}

export { LandingPage };
