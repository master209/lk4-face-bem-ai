import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IClassNameProps, compose } from '@bem-react/core';

import { cnTopbar } from '..';
import { Icon } from '../../../blocks';
import { withIconTypeLink } from '../../../blocks/Icon/_type/Icon_type_link@desktop';

import { fetchLogout } from '../../../store/api-actions';
import { getShortname } from '../../../store/user-process';
import { setActivePageMenuId, setActivePageMenuLink } from '../../../store/main-process';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { IMG_PATH, AppRoute } from '../../../const';

import './Topbar-User.scss';

const IconTypeLink = compose(withIconTypeLink)(Icon);

export const TopbarUser: FC<IClassNameProps> = ({...props}) => {
  const shortname = useAppSelector(getShortname);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(fetchLogout());
    dispatch(setActivePageMenuId('')); // выход из меню и подменю по выходу из системы
    dispatch(setActivePageMenuLink({navLinkId: ''}));
  };

  return (
    <div {...props} className={cnTopbar('User')}>
      <div
        {...props} className={cnTopbar('Username')}
        onClick={() => navigate(AppRoute.UserProfile)}
      >
        {shortname}
      </div>
      <IconTypeLink
        type="link"
        src={`${IMG_PATH}exit-door.svg`}
        alt='cart'
        tip="Выход"
        href="/#"
        onClick={() => handleLogout()}
        className={cnTopbar('IconExit')}
      />
    </div>
  );
};
