import React, { FC } from 'react';
import { IClassNameProps } from '@bem-react/core';

import { getBalance } from '../../../store/user-process';
import { useAppSelector } from '../../../hooks';
import { cnTopbar } from '..';

import './Topbar-Balance.scss';

export const TopbarBalance: FC<IClassNameProps> = (props) => {
  const {sum, time} = useAppSelector(getBalance);

  return (
    <div className={cnTopbar('Balance')}{...props}>
      <p className="Sum-Label">баланс: <span className="Sum">{sum} ₽</span></p>
      <p className="Time">{time ? `актуально на ${time}` : null}</p>
    </div>
  );
};
