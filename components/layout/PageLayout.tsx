import { FC, ReactNode } from 'react';
import MainContentContainer from './MainContentContainer';

type PageLayoutProps = { children: ReactNode };

const PageLayout: FC<PageLayoutProps> = ({ children }: PageLayoutProps) => {
  return <MainContentContainer>{children}</MainContentContainer>;
};

export default PageLayout;
