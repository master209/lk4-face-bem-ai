import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import { SubmitButton } from '../../blocks/SubmitButton/SubmitButton';
import { FormLogo } from '../../blocks';
import { resetState } from '../../store/user-process';

import { useAppDispatch } from '../../hooks';
import { APIRoute } from '../../const';

import './RegistrationOk.scss';

export const cnRegistrationOk = cn('RegistrationOk');

function RegistrationOk(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={cnRegistrationOk(null, ['Auth', 'Form', 'Card'])}>
      <FormLogo/>
      <h2 className="FormTitle">
        Регистрация успешно завершена
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

export default RegistrationOk;
