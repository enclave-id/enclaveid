import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { PersonalityContent } from './PersonalityContent';

function Tabs() {
  return (
    <Tab.Group>
      <Tab.List className="border-b border-[#E5E8EE]">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                'text-sm leading-4 pl-[18px] pr-[19px] py-3 transition-colors relative focus:outline-none',
                selected
                  ? 'font-medium text-greenBg tabButtonSelected'
                  : 'font-normal text-passiveLinkColor'
              )}
            >
              Personality
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                'text-sm leading-4 pl-[18px] pr-[19px] py-3 transition-colors relative focus:outline-none',
                selected
                  ? 'font-medium text-greenBg tabButtonSelected'
                  : 'font-normal text-passiveLinkColor'
              )}
            >
              Politics
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                'text-sm leading-4 pl-[18px] pr-[19px] py-3 transition-colors relative focus:outline-none',
                selected
                  ? 'font-medium text-greenBg tabButtonSelected'
                  : 'font-normal text-passiveLinkColor'
              )}
            >
              Career
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                'text-sm leading-4 pl-[18px] pr-[19px] py-3 transition-colors relative focus:outline-none',
                selected
                  ? 'font-medium text-greenBg tabButtonSelected'
                  : 'font-normal text-passiveLinkColor'
              )}
            >
              Non-Latent
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="pt-3.5">
        <Tab.Panel>
          <PersonalityContent />
        </Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
        <Tab.Panel>Content 4</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export { Tabs };
