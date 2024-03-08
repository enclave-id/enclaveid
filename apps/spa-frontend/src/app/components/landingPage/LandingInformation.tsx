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
