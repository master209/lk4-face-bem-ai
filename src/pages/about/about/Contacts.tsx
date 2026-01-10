import React, { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

import { Link } from '../../../blocks';
import { TITLE_FREFIX} from '../../../const';

import './Contacts.scss';

export const cnContacts = cn('Contacts');

const Contacts: FC<IClassNameProps> = () => (
  <div className={cnContacts()}>
    <HelmetProvider>
      <title>{TITLE_FREFIX}Контакты</title>
    </HelmetProvider>
    <h1>Контакты</h1>
    <div>
      <p>ООО Рога и копыта»</p>
      <p>Адрес: г. Барнаульск</p>
      <p>Тел.: <Link href="tel:+78499777500" className={cnContacts('Link')}>8 (849-9) 777-500</Link></p>
    </div>
  </div>
);

export default Contacts;
