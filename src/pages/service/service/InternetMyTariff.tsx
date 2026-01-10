import React, { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

import { TITLE_FREFIX} from '../../../const';

import './InternetMyTariff.scss';

export const cnInternetMyTariff = cn('InternetMyTariff');

const InternetMyTariff: FC<IClassNameProps> = () => (
  <div className={cnInternetMyTariff()}>
    <HelmetProvider>
      <title>{TITLE_FREFIX}Мои услуги</title>
    </HelmetProvider>
    <h1>Мои услуги</h1>
  </div>
);

export default InternetMyTariff;