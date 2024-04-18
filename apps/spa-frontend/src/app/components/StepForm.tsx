import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Link } from './Link';
import { Logo } from './Logo';
import { CheckmarkIcon } from './Icons';

const options = [
  'Disagree strongly',
  'Disagree moderately',
  'Disagree a little',
  'Neither agree nor disagree',
  'Agree a little',
  'Agree moderately',
  'Agree strongly',
];

const questions = [
  {
    id: 1,
    statement: 'I see myself as extraverted and enthusiastic.',
  },
  {
    id: 2,
    statement: 'I am reliable, I always keep my promises.',
  },
  {
    id: 3,
    statement: 'I get nervous easily, often feel blue.',
  },
  {
    id: 4,
    statement: 'I see myself as extraverted and enthusiastic.',
  },
  {
    id: 5,
    statement: 'I am reliable, I always keep my promises.',
  },
  {
    id: 6,
    statement: 'I get nervous easily, often feel blue.',
  },
];

type Steps = 'onboarding' | 'steps' | 'final';

const StepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [steps, setSteps] = useState<Steps>('onboarding');

  const handleSelectOption = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: option }));
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const currentQuestion = questions.find((q) => q.id === currentStep);

  if (steps === 'onboarding') {
    return (
      <div className="flex flex-col gap-9 max-w-[478px]">
        <h2 className="text-passiveLinkColor font-medium text-4xl leading-[42px] -tracking-[0.02em] text-center">
          Take the TIPI test
        </h2>
        <div className="bg-white border border-[#E5E8EE] px-[29px] pt-[42px] pb-5 rounded-xl">
          <p className="text-passiveLinkColor leading-[22px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget
            condimentum augue. Aenean elementum commodo varius.
            <br />
            <br />
            It takes <span className="font-bold">around 3 minutes</span> and
            will{' '}
            <span className="font-bold">
              make your results much more interesting.
            </span>
          </p>
          <div className="mt-8 flex flex-col gap-4 items-center">
            <Button
              label="Take the test"
              onClick={() => setSteps('steps')}
              fullWidth
            />
            <Link underlined href="/dashboard">
              Skip
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (steps === 'final') {
    return (
      <div className="flex flex-col gap-14 items-center max-w-[478px] w-full mx-auto">
        <Logo />
        <div className="bg-white border border-[#E5E8EE] py-10 rounded-xl flex flex-col items-center gap-6 w-full">
          <div
            className="w-[90px] h-[90px] rounded-full bg-[#EAF9F6] flex items-center justify-center"
            style={{
              boxShadow:
                '0px 0.717742px 1.43548px rgba(0, 0, 0, 0.06), 0px 0.717742px 2.15323px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CheckmarkIcon />
          </div>
          <h3 className="text-center text-passiveLinkColor text-2xl leading-[34px] -tracking-[0.02em] font-medium">
            Your test is done! <br /> We’re redirecting you now...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[557px] w-full mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          className="flex flex-col gap-2.5"
          key={currentQuestion.id}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="flex flex-col gap-[21px]">
            <h2 className="text-passiveLinkColor font-medium text-2xl leading-7 -tracking-[0.02em] text-center">
              Ten-Item Personality Inventory
            </h2>
            <p className="text-passiveLinkColor leading-[22px] text-center">
              {currentQuestion.id} out of {questions.length}
            </p>
          </div>
          {currentQuestion && (
            <div className="bg-white border border-[#E5E8EE] py-10 rounded-xl">
              <div className="flex flex-col gap-10 max-w-[406px] w-full mx-auto">
                <h4 className="text-center text-passiveLinkColor text-lg leading-[25px]">
                  “{currentQuestion.statement}”
                </h4>
                <div className="flex flex-col gap-3 max-w-[406px] w-full mx-auto">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      style={{
                        boxShadow:
                          '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                      className={`bg-white pt-[13px] pb-3 text-passiveLinkColor leading-5 text-center hover:bg-[#EAF9F6] transition-colors rounded-md focus:outline focus:outline-greenBg`}
                      onClick={() => handleSelectOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                  {currentQuestion.id === questions.length && (
                    <Button label="Submit" onClick={() => setSteps('final')} />
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StepForm;
