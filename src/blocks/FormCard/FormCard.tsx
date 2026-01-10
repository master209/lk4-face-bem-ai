import React, { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

import { IClassNameProps } from '@bem-react/core';

import './FormCard.scss';

export const cnFormCard = cn('FormCard');

interface IFormCardProps extends IClassNameProps {
  children: ReactNode;
}

export const FormCard: FC<IFormCardProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cnFormCard(null, [className])}
    {...props}
  >
    {children}
  </div>
);