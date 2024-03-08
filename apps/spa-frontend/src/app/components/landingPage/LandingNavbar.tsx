import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

function LandingNavbar() {
  return (
    <section className="bg-white py-[38px]">
      <div className="flex items-center justify-between landing-container">
        <Logo />
        <div className="md:flex hidden items-center lg:gap-9 md:gap-5 xl:gap-11">
          <div className="flex items-top gap-6 text-black ">
            <a
              href="https://discord.gg/BftCHbV4TW"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/discord.svg" alt="discord" width="40" />
            </a>
            <a
              href="https://github.com/enclave-id/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/github.svg" alt="github" width="40" />
            </a>
          </div>
          <div className="pl-1 flex items-center gap-3">
            <Link to="/login">
              <button className="py-3 px-7 outline outline-1 outline-[#E5E8EE] rounded-full text-[#6C7A8A] text-base leading-[18px] -tracking-[0.02em]">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="py-3 px-7 bg-[#2FA68A] text-white text-base leading-[18px] -tracking-[0.02em] rounded-full">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingNavbar };
