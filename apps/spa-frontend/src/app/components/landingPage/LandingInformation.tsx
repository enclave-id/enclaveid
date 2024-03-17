function LandingInformation() {
  let x = true;

  if (x) {
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
                    EnclaveID is built under the assumption that no one except
                    the owner can be trusted with highly sensitive data, not
                    even EnclaveID! For example, the web app is sourcemapped and
                    deployed on IPFS so that we can't even change the code to
                    steal your credentials if we wanted to.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-passiveLinkColor leading-3 text-[28px] font-medium -tracking-[0.02em]">
                    Confidential Computing
                  </h4>
                  <p className="text-passiveLinkColor -tracking-[0.02em] text-lg leading-6">
                    EnclaveID is built on Intel SGX and AWS Nitro, which allow
                    to run the backend code in a secure and isolated
                    environment. No one can see your data, not even if someone
                    were to steal the physical server.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-passiveLinkColor leading-3 text-[28px] font-medium -tracking-[0.02em]">
                    100% Open Source
                  </h4>
                  <p className="text-passiveLinkColor -tracking-[0.02em] text-lg leading-6">
                    The core of EnclaveID is completely open source, which
                    paired with the zero trust infra, allows both humans and
                    machines to verify that the data is being handled for its
                    intended purpose.
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
