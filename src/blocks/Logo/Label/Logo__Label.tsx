import { FC } from 'react';
import { IClassNameProps } from '@bem-react/core';

import { cnLogo } from '../../Logo';

import './Logo__Label.scss';

interface ILogoLabelProps extends IClassNameProps {
  label?: string;
}

export const LogoLabel: FC<ILogoLabelProps> = ({label}) => (
  <span className={`${cnLogo()}__label`}>
    {label}
  </span>
);