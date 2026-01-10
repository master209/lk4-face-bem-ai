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
      <p>ООО «Галс-телеком»</p>
      <p>ИНН: 6454130467</p>
      <p>Юр. адрес: 410004, г.Саратов, ул.Чернышевского, зд.88. стр.1</p>
      <p>Адрес офиса: г.Саратов, пл.Ильинская, зд. 1В, оф.21</p>
      <p>Тел.: <Link href="tel:+78452677502" className={cnContacts('Link')}>8 (845-2) 677-502</Link></p>
      <p>Эл. почта: <Link href="mailto:service@gals-telecom.ru">service@gals-telecom.ru</Link></p>
    </div>
  </div>
);

export default Contacts;
