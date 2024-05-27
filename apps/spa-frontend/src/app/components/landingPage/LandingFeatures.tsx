function LandingFeatures() {
  return (
    <section className="lg:pt-40 md:pt-16 md:pb-28 lg:pb-32 pt-12 pb-24">
      <div className="landing-container">
        <div className="flex flex-col gap-10 w-full xl:pl-10 xl:pr-12">
          <div className="flex md:flex-row flex-col md:gap-0 gap-4 md:items-end md:justify-between">
            <div className="md:max-w-[469px] flex flex-col gap-4">
              <h1 className="text-[#525C66] tracking-[-0.02em] font-medium lg:text-[32px] lg:leading-[42px] text-2xl">
                Discover what your data says about you <img src="/logos.png" />
              </h1>

              <p className="text-[#8793A0] tracking-[-0.02em] text-sm leading-[18px]">
                The new privacy laws enable you to materialize the most
                comprehensive dataset of your identity to date, from your Google
                search history to your conversations with ChatGPT. Combined with
                the latest advancements in cognitive science, NLP, and privacy
                tech, you can now gain invaluable insights from this data, all
                while preserving anonymity and confidentiality.
              </p>
            </div>
            {/* <div>
              <Button label="Join Us Now!" />
            </div> */}
          </div>
          <div className="flex gap-6 w-full xl:flex-row flex-col items-center">
            <div className="flex xl:max-w-[521px] max-w-[679px] bg-[#F9FAFB] border border-[#E0E9F1] rounded-2xl overflow-hidden gap-2 flex-col w-full shrink-0 max-h-[608px]">
              <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-greenBg/10 flex items-center justify-center">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_773_100)">
                        <path
                          d="M5.87393 5.53359C5.31666 5.53359 4.86328 5.98697 4.86328 6.5443C4.86328 7.10157 5.31666 7.55495 5.87393 7.55495C6.43126 7.55495 6.88464 7.10157 6.88464 6.5443C6.88464 5.98697 6.43126 5.53359 5.87393 5.53359Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M21.3329 27.5416C21.798 26.4196 21.2655 25.133 20.1435 24.668C19.0215 24.2029 17.7349 24.7355 17.2698 25.8575C16.8048 26.9795 17.3373 28.2661 18.4593 28.7311C19.5813 29.1962 20.8678 28.6636 21.3329 27.5416Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M15.3598 26.6955C15.3598 26.4688 15.3802 26.2469 15.4172 26.0306H4.02079C3.0951 26.0306 2.34196 25.2774 2.34196 24.3517C2.34196 23.4259 3.0951 22.6728 4.02079 22.6728H11.8771C13.6634 22.6728 15.1167 21.2195 15.1167 19.4333C15.1167 17.647 13.6634 16.1937 11.8771 16.1937H8.4175L7.37886 17.9302H11.8771C12.7059 17.9302 13.3802 18.6044 13.3802 19.4333C13.3802 20.2621 12.7059 20.9363 11.8771 20.9363H4.02079C2.1376 20.9363 0.605469 22.4685 0.605469 24.3517C0.605469 26.2349 2.1376 27.767 4.02079 27.767H15.5094C15.4127 27.4261 15.3598 27.0669 15.3598 26.6955Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M29.3925 14.6757C29.3788 14.3337 29.1652 14.0316 28.8474 13.9044L19.6185 10.2128C19.351 10.1059 19.0478 10.1385 18.8093 10.3001C18.5707 10.4616 18.4277 10.7309 18.4277 11.019V22.8564C18.7071 22.7933 18.9973 22.7588 19.2954 22.7588C19.594 22.7588 19.8845 22.7934 20.1642 22.8566V19.8297L28.9109 15.4882C29.2176 15.3361 29.4062 15.0178 29.3925 14.6757Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M11.2418 6.44356C11.2418 3.50319 8.85815 1.11953 5.91778 1.11953C2.97741 1.11953 0.59375 3.50319 0.59375 6.44356V6.46564C0.59375 7.52843 0.878117 8.57184 1.41735 9.4877L5.46884 16.3686C5.65223 16.6801 6.10219 16.6817 6.28772 16.3715L10.3972 9.50091C10.9499 8.5769 11.2418 7.52029 11.2418 6.44356ZM5.87592 9.29785C4.36115 9.29785 3.12878 8.06548 3.12878 6.55071C3.12878 5.03594 4.36115 3.80357 5.87592 3.80357C7.39069 3.80357 8.62306 5.03594 8.62306 6.55071C8.62306 8.06553 7.39069 9.29785 5.87592 9.29785Z"
                          fill="#2FA68A"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_773_100">
                          <rect
                            width="28.8"
                            height="28.8"
                            fill="white"
                            transform="translate(0.599609 0.599998)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="text-[#525C66] leading-3 font-semibold tracking-[-0.02em]">
                    Life Journeys
                  </h2>
                </div>
                <p className="text-[#8793A0] tracking-[-0.02em] leading-5">
                  Every time you message a friend, look up something on Reddit,
                  or even just scroll though your Instagram feed, you are
                  evolving your understanding of the world. Sometimes we get
                  stuck without realizing it, and EnclaveID can help you zoom
                  back and work out the bigger picture.
                </p>
              </div>
              <div className="flex xl:flex-1 items-end justify-end">
                <img
                  src="/f1.png"
                  alt=""
                  className="max-h-[345px] max-w-[481px] w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-[679px]">
              <div className="bg-[#F9FAFB] border border-[#E0E9F1] rounded-2xl overflow-hidden flex xl:flex-row flex-col gap-2 min-h-[292px]">
                <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-greenBg/10 flex items-center justify-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_773_116)">
                          <path
                            d="M12.1267 12.8539C10.4153 12.8563 8.94067 14.0602 8.5957 15.7363H15.6581C15.3132 14.06 13.8384 12.8561 12.1267 12.8539Z"
                            fill="#2FA68A"
                          />
                          <path
                            d="M14.2904 9.25017C14.2904 10.4439 13.3225 11.4118 12.1287 11.4118C10.9347 11.4118 9.9668 10.4439 9.9668 9.25017C9.9668 8.05617 10.9347 7.08828 12.1287 7.08828C13.3225 7.08828 14.2904 8.05617 14.2904 9.25017Z"
                            fill="#2FA68A"
                          />
                          <path
                            d="M28.7901 25.7354L22.6899 19.6352C21.8477 20.8166 20.8145 21.8498 19.6328 22.692L25.7333 28.7925C26.5909 29.623 27.9596 29.6013 28.7901 28.7435C29.6022 27.9052 29.6022 26.5737 28.7901 25.7354Z"
                            fill="#2FA68A"
                          />
                          <path
                            d="M23.659 12.1299C23.6592 5.76225 18.4974 0.600218 12.1297 0.599998C5.76208 0.599779 0.599829 5.76159 0.599609 12.1293C0.59939 18.4969 5.7612 23.6592 12.1289 23.6594H12.1293C18.4939 23.6521 23.6518 18.4945 23.659 12.1299ZM16.4529 17.174H7.80575C7.40805 17.1742 7.08527 16.8521 7.08505 16.4541C7.08505 16.4539 7.08505 16.4537 7.08505 16.4532C7.09186 14.5713 8.14853 12.8504 9.82416 11.9932C8.29486 10.7199 8.08722 8.44818 9.36032 6.91889C10.6334 5.38959 12.9054 5.18195 14.4347 6.45504C15.964 7.72814 16.1716 10.0001 14.8983 11.5294C14.7581 11.6977 14.603 11.8531 14.4347 11.9932C16.1101 12.8504 17.167 14.5715 17.1736 16.4537C17.1738 16.8514 16.8514 17.174 16.4537 17.174C16.4535 17.174 16.4531 17.174 16.4529 17.174Z"
                            fill="#2FA68A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_773_116">
                            <rect
                              width="28.8"
                              height="28.8"
                              fill="white"
                              transform="translate(0.599609 0.599998)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h2 className="text-[#525C66] leading-3 font-semibold tracking-[-0.02em]">
                      Personality and Morality
                    </h2>
                  </div>
                  <p className="text-[#8793A0] xl:max-w-[292px] w-full tracking-[-0.02em] leading-5">
                    Understand your fundamental personality traits and core values
                    and how they shape your interactions with others.
                  </p>
                </div>
                <div className="flex items-end justify-end flex-1 shrink-0 min-w-[304px]">
                  <img src="/f2.png" alt="" />
                </div>
              </div>
              <div className="bg-[#F9FAFB] border border-[#E0E9F1] rounded-2xl overflow-hidden flex xl:flex-row flex-col gap-2 min-h-[292px]">
                <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-greenBg/10 flex items-center justify-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.4503 20.9516L14.1797 21.7822L15.001 22.7342L15.8224 21.7822L15.5517 20.9516C15.365 20.9702 15.1877 20.9795 15.001 20.9795C14.8143 20.9795 14.637 20.9702 14.4503 20.9516Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M20.1804 18.4906C19.4524 19.4053 18.4911 20.1146 17.3804 20.544L17.7537 21.7013C17.8564 22.0186 17.7911 22.3546 17.5764 22.6066L15.7097 24.7813C15.5324 24.9867 15.271 25.1079 15.0004 25.1079C14.7298 25.1079 14.4684 24.9867 14.2911 24.7813L12.4244 22.6066C12.2097 22.3546 12.1444 22.0186 12.2471 21.7013L12.6204 20.544C11.5097 20.1146 10.5484 19.4053 9.82041 18.4906C8.78442 19.2746 8.17773 20.4973 8.17773 21.804V26.6666C8.17773 27.18 8.59775 27.6 9.11107 27.6H20.8897C21.4031 27.6 21.8231 27.18 21.8231 26.6666V21.804C21.8231 20.4973 21.2164 19.2746 20.1804 18.4906Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M13.1996 18.7603C13.7595 18.9937 14.3662 19.115 15.0009 19.115C17.5797 19.1314 19.7976 16.9847 19.7889 14.3176C19.7889 11.6763 17.6422 9.52969 15.0009 9.52969C12.3595 9.52969 10.2129 11.6763 10.2129 14.3176C10.2129 16.3243 11.4542 18.051 13.1996 18.7603Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M13.6165 5.84166L14.0675 5.39048V7.13399C14.0675 7.64988 14.4854 8.06732 15.0008 8.06732C15.5162 8.06732 15.9341 7.64988 15.9341 7.13399V5.39048L16.3851 5.84166C16.9216 6.37856 17.8395 5.99854 17.8395 5.23947C17.8395 5.01354 17.7497 4.79684 17.59 4.63711L15.6031 2.6503C15.2705 2.31762 14.7311 2.31762 14.3984 2.6503L12.4116 4.63711C12.2518 4.79684 12.1621 5.01354 12.1621 5.23947C12.1621 5.99854 13.0799 6.37856 13.6165 5.84166Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M8.80948 9.5435C8.99177 9.72579 9.23057 9.81694 9.46938 9.81694C9.70818 9.81694 9.94698 9.7258 10.1293 9.5435C10.4939 9.17892 10.4939 8.5883 10.1293 8.22371L8.8967 6.99114L9.53449 6.99131C10.2936 6.99153 10.6739 6.07375 10.1371 5.53702C9.9774 5.37723 9.76064 5.28751 9.53472 5.28751H6.72492C6.25444 5.28751 5.87305 5.66895 5.87305 6.13943V8.94918C5.87305 9.1751 5.96283 9.3918 6.12256 9.55154C6.65929 10.0883 7.57708 9.70802 7.57685 8.94895L7.57668 8.3107L8.80948 9.5435Z"
                          fill="#2FA68A"
                        />
                        <path
                          d="M23.2774 5.28751H20.4676C20.2417 5.28751 20.025 5.37723 19.8652 5.53702C19.3285 6.07375 19.7088 6.99153 20.4678 6.99131L21.1056 6.99114L19.873 8.22371C19.5085 8.5883 19.5085 9.17892 19.873 9.5435C20.0553 9.72579 20.2941 9.81694 20.5329 9.81694C20.7717 9.81694 21.0105 9.7258 21.1928 9.5435L22.4256 8.3107L22.4255 8.94895C22.4252 9.70802 23.343 10.0883 23.8798 9.55154C24.0395 9.3918 24.1293 9.1751 24.1293 8.94918V6.13943C24.1293 5.66895 23.7479 5.28751 23.2774 5.28751Z"
                          fill="#2FA68A"
                        />
                      </svg>
                    </div>
                    <h2 className="text-[#525C66] leading-3 font-semibold tracking-[-0.02em]">
                      Career and Interests
                    </h2>
                  </div>
                  <p className="text-[#8793A0] xl:max-w-[292px] w-full tracking-[-0.02em] leading-5">
                    Gain insights on on your professional life and hobbies, and
                    which of your strengths you can leverage to get the most out
                    of them.
                  </p>
                </div>
                <div className="flex items-end justify-end flex-1 shrink-0 min-w-[304px]">
                  <img src="/f3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingFeatures };
