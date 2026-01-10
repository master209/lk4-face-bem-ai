import React, { FC, MouseEvent } from 'react';

import { IClassNameProps } from '@bem-react/core';

import { Logo } from '../../../blocks/Logo';
import { cnTopbar } from '..';

import { IMG_PATH } from '../../../const';
import { setActivePageMenuId, setActivePageMenuLink } from '../../../store/main-process';
import { useAppDispatch } from '../../../hooks';

import './Topbar-Logo.scss';

export const TopbarLogo: FC<IClassNameProps> = (props) => {
  const dispatch = useAppDispatch();

  // сворачивание развенутых пунктов меную по клику на лого
  const handleClick = (ev: MouseEvent) => {
    dispatch(setActivePageMenuId(''));
    dispatch(setActivePageMenuLink({navLinkId: ''}));
  };

  return (
    <div className={cnTopbar('Logo')}{...props}>
      <Logo
        src={`${IMG_PATH}logo.png`}
        handleClick={handleClick}
      />
    </div>
  );
};
