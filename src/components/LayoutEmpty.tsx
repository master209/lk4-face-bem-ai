import { FC, ReactNode } from 'react';
import { IClassNameProps } from '@bem-react/core';

import { PageMain } from './Page';

import './Page/Page.scss';

export interface IPageProps extends IClassNameProps {
  children: ReactNode;
}

export const LayoutEmpty: FC<IPageProps> = ({children}) => {
  return (
    <div className="App Container">
       <PageMain className="PageEmpty">{children}</PageMain>
    </div>
  );
};
