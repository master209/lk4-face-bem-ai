import React, { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

import { TITLE_FREFIX} from '../../../const';

import './InternetTariffs.scss';

export const cnInternetTariffs = cn('InternetTariffs');

const InternetTariffs: FC<IClassNameProps> = () => (
  <div className={cnInternetTariffs()}>
    <HelmetProvider>
      <title>{TITLE_FREFIX}Тарифы</title>
    </HelmetProvider>
    <h1>Тарифы</h1>
  </div>
);

export default InternetTariffs;