function LandingInformation() {
  return (
    <section className="bg-white lg:pt-20 md:pt-16 md:pb-28 lg:pb-32 pt-12 pb-24">
      <div className="landing-container">
        <div className="flex flex-col gap-[59px]">
          <h1 className="text-passiveLinkColor font-medium text-3xl md:text-4xl lg:text-[46px] lg:leading-[60px] lg:-tracking-[0.02em] text-center">
            Your Data Your Rules
          </h1>
          <div className="flex lg:flex-row flex-col items-center gap-[73px]">
            <div className="max-w-[586px] w-full">
              <div className="flex flex-col gap-[60px]">
                <div className="flex flex-col gap-3">
                  <h4 className="text-passiveLinkColor leading-3 text-[28px] font-medium -tracking-[0.02em]">
                    Zero Trust Infra
                  </h4>
                  <p className="text-passiveLinkColor -tracking-[0.02em] text-lg leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas in neque vel diam consequat feugiat. Suspendisse
                    potenti. Nunc placerat ac elit in finibus.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-passiveLinkColor leading-3 text-[28px] font-medium -tracking-[0.02em]">
                    Confidential Computing
                  </h4>
                  <p className="text-passiveLinkColor -tracking-[0.02em] text-lg leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas in neque vel diam consequat feugiat. Suspendisse
                    potenti. Nunc placerat ac elit in finibus.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-passiveLinkColor leading-3 text-[28px] font-medium -tracking-[0.02em]">
                    100% Open Source
                  </h4>
                  <p className="text-passiveLinkColor -tracking-[0.02em] text-lg leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas in neque vel diam consequat feugiat. Suspendisse
                    potenti. Nunc placerat ac elit in finibus.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full ">
              <img
                src="/architecture.svg"
                alt="architecture"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingInformation };
