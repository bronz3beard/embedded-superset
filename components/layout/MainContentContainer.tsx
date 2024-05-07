import { ReactNode, forwardRef } from 'react';

type ChatContainerProps = {
  children: ReactNode;
  showDrawer?: boolean;
};

const MainContentContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ children, showDrawer }, ref) => {
    return (
      <main
        role="main"
        className="transition-width relative top-0 flex h-screen w-full flex-1 flex-col items-stretch overflow-hidden overscroll-y-contain"
      >
        <div ref={ref} className="h-full flex-1 overflow-hidden">
          <div className="mb-4 flex h-full flex-col overflow-x-auto">
            <div className="flex h-full flex-col items-center overflow-y-hidden text-base">
              <div className="dark:bg-primary-background group mb-0 h-full w-full overflow-y-scroll">
                <div
                  className={`max-w-screen m-auto flex h-full text-base ${
                    showDrawer ? 'md:ml-64' : 'md:ml-0'
                  }`}
                >
                  <div className="relative flex h-full w-full flex-col gap-1 md:gap-2">
                    <div className="flex h-full min-h-min flex-col items-start gap-4 whitespace-pre-wrap">
                      <div className="h-full w-full break-words text-white dark:text-gray-100">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
);

MainContentContainer.displayName = 'MainContentContainer';

export default MainContentContainer;
