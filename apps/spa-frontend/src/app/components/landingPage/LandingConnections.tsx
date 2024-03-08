function LandingConnections() {
  return (
    <section className="bg-white lg:pt-8 pt-14 pb-14 md:pb-[72px] lg:pb-[84px]">
      <div className="landing-container">
        <div className="flex lg:flex-row flex-col items-center md:gap-8 sm:gap-6 gap-4 lg:gap-9">
          <div className="lg:max-w-[624px] lg:text-left text-center w-full flex flex-col gap-9">
            <h1 className="text-[#6C7A8A] font-medium text-3xl md:text-4xl lg:text-[46px] lg:leading-[60px] lg:-tracking-[0.02em]">
              Create deep connections
            </h1>
            <p className="text-[#6C7A8A] md:text-xl text-lg lg:text-[28px] lg:-tracking-[0.02em] lg:leading-9">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              in neque vel diam consequat feugiat. Suspendisse potenti. Nunc
              placerat ac elit in finibus.
            </p>
          </div>
          <div className="w-full min-h-[413px]">
            <img
              src="/connections.png"
              alt="connections"
              style={{
                clipPath: 'inset(3px round 10px)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingConnections };
