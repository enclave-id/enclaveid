import { Link } from 'react-router-dom';

function LandingHero() {
  return (
    <section className="bg-white lg:pt-8 md:pt-7 pt-4 pb-14 md:pb-[72px] lg:pb-[84px]">
      <div className="landing-container">
        <div className="flex lg:flex-row flex-col items-center md:gap-8 sm:gap-6 gap-4 lg:gap-10">
          <div className="lg:max-w-[624px] lg:text-left text-center w-full flex flex-col gap-9">
            <h1 className="text-passiveLinkColor font-medium text-3xl md:text-4xl lg:text-[46px] lg:leading-[60px] lg:-tracking-[0.02em]">
              Unleash the true power of your data
            </h1>
            <p className="text-passiveLinkColor md:text-xl text-lg lg:text-[22px] lg:-tracking-[0.02em] lg:leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              in neque vel diam consequat feugiat. Suspendisse potenti. Nunc
              placerat ac elit in finibus.
            </p>
            <div className="flex items-center lg:justify-start justify-center gap-3.5">
              <Link to="/login">
                <button className="py-3 px-7 outline outline-1 outline-[#E5E8EE] rounded-full text-passiveLinkColor text-[22px] leading-[26px] -tracking-[0.02em]">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="py-3 px-7 bg-greenBg text-white text-[22px] leading-[26px] -tracking-[0.02em] rounded-full">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full min-h-[413px] wobble-image">
            <img
              src="/hero.webp"
              alt="hero"
              style={{
                clipPath: 'inset(0px 0px 100px 0px round 10px)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingHero };
