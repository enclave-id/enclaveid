import { LandingConnections } from './landingPage/LandingConnections';
import { LandingFeatures } from './landingPage/LandingFeatures';
import { LandingFooter } from './landingPage/LandingFooter';
import { LandingHero } from './landingPage/LandingHero';
import { LandingInformation } from './landingPage/LandingInformation';
import { LandingNavbar } from './landingPage/LandingNavbar';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <LandingHero />
      <div className="flex items-center justify-center relative z-20 -mt-[275px]">
        <img src="./hero.png" alt="" />
      </div>
      <LandingFeatures />
      <LandingConnections />
      <LandingInformation />
      <LandingFooter />
    </div>
  );
}

export { LandingPage };
