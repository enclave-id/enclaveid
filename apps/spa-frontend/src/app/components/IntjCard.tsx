function IntjCard() {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <span className="text-[#6C7A8A] text-lg leading-[21px] text-center">
        MBTI
      </span>
      <article className="border border-[#E5E8EE] rounded-3xl bg-white">
        <div className="flex flex-col gap-[5px] px-3 pt-[9px] pb-[15px] ">
          <h1 className="text-[64px] leading-[75px] text-[#30A78A] text-center">
            INTJ
          </h1>
          <p className="text-[#6C7A8A] leading-[22px] px-3">
            Introverted, Intuitive, Thinking and Judging. It indicates a person
            who is energized by spending time alone, prioritizes ideas and
            concepts over facts and details, makes decisions based on logic and
            reason and prefers to be spontaneous and flexible.
          </p>
        </div>
      </article>
    </div>
  );
}

export { IntjCard };
