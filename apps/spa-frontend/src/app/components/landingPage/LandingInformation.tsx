function LandingInformation() {
  return (
    <section className="bg-[#F9FAFB] md:py-16 py-10 sm:py-12 lg:py-[94px]">
      <div className="landing-container">
        <div className="flex lg:flex-row flex-col xl:gap-[200px] justify-between xl:justify-normal xl:pl-10 xl:pr-12 lg:items-start items-center">
          <div className="px-4 py-6">
            <h1 className="text-[#93989D] md:text-[46px] text-4xl font-medium md:tracking-[-0.02em] md:leading-[50px] whitespace-nowrap">
              Your data, <br />
              <span className="md:leading-[68px] md:text-[62px] text-5xl text-[#525C66]">
                your rules
              </span>
            </h1>
          </div>
          <div className="flex flex-col lg:gap-6 md:max-w-[598px]">
            <div className="md:py-6 py-4 lg:py-[38.5px] px-3 lg:px-6 flex flex-col w-full gap-6 border-b border-[#DEE4EB]">
              <h1 className="text-[#525C66] font-semibold text-2xl leading-8">
                <span className="text-[#4BB89E]">Zero Trust</span> Infra
              </h1>
              <p className="text-[#93989D] leading-[21px] tracking-[-0.02em]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in neque vel diam consequat feugiat. Suspendisse
                potenti. Nunc placerat ac elit in finibus.
              </p>
            </div>
            <div className="md:py-6 py-4 lg:py-[38.5px] px-3 lg:px-6 flex flex-col w-full gap-6 border-b border-[#DEE4EB]">
              <h1 className="text-[#525C66] font-semibold text-2xl leading-8">
                <span className="text-[#4BB89E]">Confidential</span> Computing
              </h1>
              <p className="text-[#93989D] leading-[21px] tracking-[-0.02em]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in neque vel diam consequat feugiat. Suspendisse
                potenti. Nunc placerat ac elit in finibus.
              </p>
            </div>
            <div className="md:py-6 py-4 lg:py-[38.5px] px-3 lg:px-6 flex flex-col w-full gap-6">
              <h1 className="text-[#525C66] font-semibold text-2xl leading-8">
                <span className="text-[#4BB89E]">100%</span> Open Source
              </h1>
              <p className="text-[#93989D] leading-[21px] tracking-[-0.02em]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in neque vel diam consequat feugiat. Suspendisse
                potenti. Nunc placerat ac elit in finibus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingInformation };
