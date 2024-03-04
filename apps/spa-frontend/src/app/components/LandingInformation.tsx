function LandingInformation() {
  return (
    <section className="features-gradient-bg lg:pt-20 md:pt-16 md:pb-28 lg:pb-32 pt-12 pb-24">
      <div className="landing-container">
        <div className="flex flex-col gap-[59px]">
          <h2 className="text-white lg:-tracking-[0.02em] text-center text-3xl lg:text-[46px] lg:leading-[60px]">
            Your data, your rules
          </h2>
          <div className="flex lg:flex-row flex-col items-center gap-[73px]">
            <div className="max-w-[586px] w-full">
              <div className="flex flex-col gap-[60px]">
                <div className="flex flex-col gap-3">
                  <h4 className="text-[#FFB45C] leading-3 text-[28px] font-bold -tracking-[0.02em]">
                    Zero Trust Infra
                  </h4>
                  <p className="text-white -tracking-[0.02em] text-lg leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas in neque vel diam consequat feugiat. Suspendisse
                    potenti. Nunc placerat ac elit in finibus.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-[#FFB45C] leading-3 text-[28px] font-bold -tracking-[0.02em]">
                    Confidential Computing
                  </h4>
                  <p className="text-white -tracking-[0.02em] text-lg leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas in neque vel diam consequat feugiat. Suspendisse
                    potenti. Nunc placerat ac elit in finibus.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-[#FFB45C] leading-3 text-[28px] font-bold -tracking-[0.02em]">
                    100% Open Source
                  </h4>
                  <p className="text-white -tracking-[0.02em] text-lg leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas in neque vel diam consequat feugiat. Suspendisse
                    potenti. Nunc placerat ac elit in finibus.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                <div className="data-card-bg min-h-[200px] flex items-center justify-center rounded-xl text-white -tracking-[0.02em] leading-9 font-medium text-[28px] w-full">
                  IPFS
                </div>
                <div className="data-card-bg min-h-[200px] flex items-center justify-center rounded-xl text-white -tracking-[0.02em] leading-9 font-medium text-[28px] w-full">
                  AKS-CC
                </div>
                <div className="data-card-bg min-h-[200px] flex items-center justify-center rounded-xl text-white -tracking-[0.02em] leading-9 font-medium text-[28px] w-full">
                  DCT
                </div>
                <div className="data-card-bg min-h-[200px] flex items-center justify-center rounded-xl text-white -tracking-[0.02em] leading-9 font-medium text-[28px] w-full">
                  DCT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingInformation };
