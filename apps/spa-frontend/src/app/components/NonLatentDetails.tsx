import { Tab } from '@headlessui/react';
import { NonLatentCard } from './NonLatentCard';
import { Stepper } from './Stepper';
import { Button } from './Button';

const data = [
  {
    title: 'Repairing the e-shifter on your VanMoof S3',
    description:
      'The VanMoof e-shifter is known to cause problems. Have you considered switching to an analog shifter?',
    content: 'Card Content1',
  },
  {
    title: 'Repairing the e-shifter on your VanMoof S3',
    description:
      'Your Oura readings are normal. Your chest pain while running is likely due to GERD rather than heart disease.',
    content: 'Card Content2',
  },
  {
    title: 'Unsuccessful dating streak',
    description:
      'Seems like your past few dates haven’t been going as expected. There are some common traits that perhaps you should avoid.',
    content: 'Card Content3',
  },
];
const steps = [
  { label: 'Step one on the journey' },
  { label: 'Step two on the journey' },
  { label: 'Step three on the journey' },
];

function NonLatentDetails() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="pt-[21px] pb-[13px] leading-[21.11px] text-lg text-passiveLinkColor text-center border-b w-full border-[#E5E8EE]">
        Life Journeys
      </h1>
      <Tab.Group>
        <div className="flex xl:flex-row flex-col-reverse gap-[18px] w-full">
          <Tab.List className="flex flex-col gap-4 shrink-0">
            {data.map((card, index) => (
              <Tab key={index} className="w-full focus-visible:outline-none">
                {({ selected }) => (
                  <NonLatentCard {...card} isSelected={selected} />
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="w-full">
            {data.map((card, index) => (
              <Tab.Panel key={index} className="size-full">
                <div className="border border-[#E5E8EE] bg-[#F3F5F7] pt-5 pb-3.5 px-2.5 rounded-xl flex flex-col gap-[60px] h-full">
                  <Stepper steps={steps} />
                  <div className="text-passiveLinkColor bg-white px-3.5 pt-5 pb-4 border border-[#E5E8EE] h-full flex flex-col justify-between">
                    <p className="text-passiveLinkColor leading-[22px]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque leo lorem, pellentesque at rutrum sit amet,
                      dignissim at ex. Mauris suscipit est quis sem rhoncus
                      aliquam vel et erat. Sed eget commodo ipsum, maximus
                      facilisis diam. Vestibulum aliquet elit quam, eget viverra
                      erat pretium vitae. <br /> <br /> Nunc consequat tempor
                      velit ac suscipit. Suspendisse potenti. Nulla tincidunt
                      elit arcu, nec rhoncus ipsum fermentum at. Quisque
                      vehicula viverra tellus, ac finibus felis porttitor a.
                      Donec condimentum sem laoreet eros malesuada, non
                      hendrerit enim consectetur. Nulla in lacus non odio
                      interdum feugiat vitae in libero.
                    </p>
                    <div className="flex items-center justify-center">
                      <Button label="Expand" size="large" />
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}

export { NonLatentDetails };
