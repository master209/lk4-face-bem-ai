import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import { SubmitButton } from '../../blocks/SubmitButton/SubmitButton';
import { FormLogo } from '../../blocks';
import { resetState } from '../../store/user-process';

import { useAppDispatch } from '../../hooks';
import { APIRoute } from '../../const';

import './RegistrationOk.scss';

export const cnResetPasswordOk = cn('ResetPasswordOk');

export function ResetPasswordOk(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={cnResetPasswordOk(null, ['Auth', 'Form', 'Card'])}>
      <FormLogo/>
      <h2 className="FormTitle">
        Пароль был успешно изменен
      </h2>
      <SubmitButton
        onClick={() => {
          dispatch(resetState());
          navigate(APIRoute.Login);
        }}
      >
        Войти в личный кабинет
      </SubmitButton>
    </div>
  );
}
