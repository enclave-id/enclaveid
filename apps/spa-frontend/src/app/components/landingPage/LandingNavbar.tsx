import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { DiscordIcon, GithubIcon } from '../Icons';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

function LandingNavbar() {
  let x = true;
  if (x) {
    return (
      <header className="bg-[#32433F] py-6">
        <nav className="landing-container">
          <div className="flex items-center justify-between xl:pl-10 xl:pr-12">
            <Logo isSmall={true} />
            <div className="lg:flex items-center gap-6 hidden">
              <button className="px-5 py-2.5 leading-3 text-lg font-medium tracking-[-0.02em] text-greenBg bg-greenBg/10 rounded-full">
                Home
              </button>
              <button className="text-lg font-medium tracking-[-0.02em] leading-3 text-[#B5BBBB]">
                About
              </button>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/BftCHbV4TW"
                target="_blank"
                rel="noreferrer"
                className="text-greenBg"
              >
                <DiscordIcon />
              </a>
              <a
                href="https://github.com/enclave-id/"
                target="_blank"
                rel="noreferrer"
                className="text-greenBg"
              >
                <GithubIcon />
              </a>
              <Link to="/login" className="lg:block hidden">
                <button className="w-[109px] h-10 flex items-center justify-center border border-greenBg text-greenBg rounded-lg text-sm font-medium leading-3">
                  Log In
                </button>
              </Link>
              <Link to="/signup" className="lg:block hidden">
                <button className="w-[109px] h-10 flex items-center justify-center gap-1 bg-greenBg rounded-lg">
                  <span className="text-white text-sm font-medium leading-3">
                    Sign Up
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-white" />
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }

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
