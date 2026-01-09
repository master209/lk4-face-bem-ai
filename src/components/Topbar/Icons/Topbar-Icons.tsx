import { FC } from 'react';

import { IClassNameProps, compose } from '@bem-react/core';

import { cnTopbar } from '..';
import { Icon } from '../../../blocks';
import { withIconTypeLink } from '../../../blocks/Icon/_type/Icon_type_link@desktop';

import { invertIsMenuClosed } from '../../../store/main-process';
import { /*useAppSelector, */useAppDispatch } from '../../../hooks';
import { IMG_PATH } from '../../../const';

import './Topbar-Icons.scss';

const IconTypeLink = compose(withIconTypeLink)(Icon);

export const TopbarIcons: FC<IClassNameProps> = ({...props}) => {
  const dispatch = useAppDispatch();
  // const isMenuClosed = useAppSelector(getIsMenuClosed);
  const handleToggleMenu = () => dispatch(invertIsMenuClosed());
  return (
    <div {...props} className={`${cnTopbar()}__icons`}>
      <IconTypeLink
        type="link"
        src={`${IMG_PATH}toggle-menu.svg`}
        alt='toggle-menu'
        // tip={isMenuClosed ? 'Показать меню' : 'Скрыть меню'}
        onClick={() => handleToggleMenu()}
        className={cnTopbar('IconToggleMenu')}
      />
      <IconTypeLink
        type="link"
        src={`${IMG_PATH}notifications.svg`}
        alt='notifications'
        // tip="Уведомления"
        onClick={() => true}
        className={`${cnTopbar()}__icon-notifications`}
      />
    </div>
  );
};
