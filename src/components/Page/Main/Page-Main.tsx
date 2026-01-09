import React, { FC, ReactNode, Suspense } from 'react';
import { IClassNameProps } from '@bem-react/core';

import { cnPage } from '..';
import { Content } from '../../../blocks/Content';
import { Spinner2 } from '../../../blocks/Spinner2/Spinner2';

import './Page-Main.scss';

export interface IPageMainProps extends IClassNameProps {
  children: ReactNode;
}

export const PageMain: FC<IPageMainProps> = ({children, className}) => (
  <div className={`${cnPage()}__main ${className || ''}`}>
    <Suspense fallback={<Spinner2/>}>
      <Content>
        {children}
      </Content>
    </Suspense>
  </div>
);
