import { FC } from 'react';

import { IClassNameProps } from '@bem-react/core';
import { classnames } from '@bem-react/classnames';
import { useRegistry } from '@bem-react/di';

import { cnTopbar, TopbarIcons } from '.';

import './Topbar.scss';

export const Topbar: FC<IClassNameProps> = ({className, ...props}) => {
  const { TopbarLogo } = useRegistry<any>(cnTopbar());

  return (
    <div
      {...props}
      className={cnTopbar({}, [classnames('Wrap', className)])}
    >
      <TopbarLogo/>
      <TopbarIcons/>
    </div>
  );
};
