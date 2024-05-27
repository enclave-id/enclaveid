function LandingInformation() {
  return (
    <section className="bg-[#F9FAFB] md:py-16 py-10 sm:py-12 lg:py-[94px]">
      <div className="landing-container">
        <div className="flex lg:flex-row flex-col xl:gap-[200px] justify-between xl:justify-normal xl:pl-10 xl:pr-12 items-center">
          <div className="px-4 py-6">
            <h1 className="text-[#93989D] md:text-[54px] text-4xl font-medium md:tracking-[-0.02em] md:leading-[50px] whitespace-nowrap">
              Your data <br />
              <span className="md:leading-[68px] md:text-[62px] text-5xl text-[#525C66]">
                Your rules
              </span>
            </h1>
          </div>
          <div className="flex flex-col lg:gap-6 md:max-w-[598px]">
            <div className="md:py-6 py-4 lg:py-[38.5px] px-3 lg:px-6 flex flex-col w-full gap-6 border-b border-[#DEE4EB]">
              <h1 className="text-[#525C66] font-semibold text-2xl leading-8">
                <span className="text-[#4BB89E]">Zero Trust</span>{' '}
                Infrastructure
              </h1>
              <p className="text-[#93989D] leading-[21px] tracking-[-0.02em]">
                EnclaveID runs on <b>AMD SEV-SNP</b> capable hardware - hence
                "enclave" in the name - which guarantess that your data is
                inaccessible by any other software or human (except you), not
                even by the infrastructure provider!
              </p>
            </div>
            <div className="md:py-6 py-4 lg:py-[38.5px] px-3 lg:px-6 flex flex-col w-full gap-6">
              <h1 className="text-[#525C66] font-semibold text-2xl leading-8">
                <span className="text-[#4BB89E]">100%</span> Open Source
              </h1>
              <p className="text-[#93989D] leading-[21px] tracking-[-0.02em]">
                Every single component of EnclaveID is publicly available on
                GitHub and the build pipeline is <b>fully reproducible</b>.
                Thanks to remote <b>attestation</b>, this means that you can
                trust that whatever is in the code is what is running in our
                Kubernetes cluster, much like an Ethereum smart contract.
              </p>
            </div>
            <div className="md:py-6 py-4 lg:py-[38.5px] px-3 lg:px-6 flex flex-col w-full gap-6 border-t border-[#DEE4EB]">
              <h1 className="text-[#525C66] font-semibold text-2xl leading-8">
                <span className="text-[#4BB89E]">Community</span> Owned
              </h1>
              <p className="text-[#93989D] leading-[21px] tracking-[-0.02em]">
                EnclaveID is a community-owned project with the goal of{' '}
                <b>empowering individuals</b> for a flourishing democratic
                society. Our code is a reflection of the will of such
                individuals, so contributions and feedback are strongly
                encouraged!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingInformation };
