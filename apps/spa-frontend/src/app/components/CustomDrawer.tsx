import { ReactNode } from 'react';
import { Drawer } from 'vaul';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function CustomDrawer({
  title,
  children,
  isOpen,
  setIsDrawerOpen,
}: {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  setIsDrawerOpen: (boolean) => void;
}) {
  return (
    <Drawer.Root
      shouldScaleBackground
      open={isOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-xl max-h-[91%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="bg-white rounded-t-xl flex-1 flex overflow-auto">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex items-center justify-between py-4 px-5">
                <span className="opacity-0"></span>
                <Drawer.Title className="text-passiveLinkColor text-lg leading-[21px] font-semibold">
                  {title}
                </Drawer.Title>
                <button onClick={() => setIsDrawerOpen(false)}>
                  <ChevronDownIcon className="text-passiveLinkColor w-5 h-5" />
                </button>
              </div>
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export { CustomDrawer };
