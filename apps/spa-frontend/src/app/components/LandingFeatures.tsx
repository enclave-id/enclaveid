function LandingFeatures() {
  return (
    <section className="features-gradient-bg lg:pt-20 md:pt-16 md:pb-28 lg:pb-32 pt-12 pb-24">
      <div className="landing-container">
        <div className="lg:grid lg:grid-cols-3 gap-4 lg:gap-5 flex flex-wrap items-center justify-center">
          <article className="flex flex-col md:gap-12 gap-10 lg:gap-16 md:max-w-[424px] w-full">
            <div className="flex flex-col md:gap-6 gap-5 lg:gap-7">
              <h4 className="text-center text-[#FFB45C] font-bold text-[28px] leading-9 -tracking-[0.02em]">
                Life Journeys
              </h4>
              <p className="line-clamp-3 text-center text-lg leading-6 -tracking-[0.02em] text-white font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in neque vel diam consequat feugiat. Suspendisse
                potenti.
              </p>
            </div>
            <div className="min-h-[200px] border border-[#DFDFDF] rounded-xl w-full"></div>
          </article>
          <article className="flex flex-col md:gap-12 gap-10 lg:gap-16 md:max-w-[424px] w-full">
            <div className="flex flex-col md:gap-6 gap-5 lg:gap-7">
              <h4 className="text-center text-[#FFB45C] font-bold text-[28px] leading-9 -tracking-[0.02em]">
                Personality and Morality
              </h4>
              <p className="line-clamp-3 text-center text-lg leading-6 -tracking-[0.02em] text-white font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in neque vel diam consequat feugiat. Suspendisse
                potenti.
              </p>
            </div>
            <div className="min-h-[200px] border border-[#DFDFDF] rounded-xl w-full"></div>
          </article>
          <article className="flex flex-col md:gap-12 gap-10 lg:gap-16 md:max-w-[424px] w-full">
            <div className="flex flex-col md:gap-6 gap-5 lg:gap-7">
              <h4 className="text-center text-[#FFB45C] font-bold text-[28px] leading-9 -tracking-[0.02em]">
                Career and Interests
              </h4>
              <p className="line-clamp-3 text-center text-lg leading-6 -tracking-[0.02em] text-white font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in neque vel diam consequat feugiat. Suspendisse
                potenti.
              </p>
            </div>
            <div className="min-h-[200px] border border-[#DFDFDF] rounded-xl w-full"></div>
          </article>
        </div>
      </div>
    </section>
  );
}

export { LandingFeatures };
