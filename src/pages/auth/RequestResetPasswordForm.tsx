import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { cn } from '@bem-react/classname';
import { useForm, SubmitHandler } from 'react-hook-form';

import { InputText, withInputTextTypePhone } from '../../blocks/InputText';
import {
  Form,
  FormLogo,
  FormInfo,
  Link,
} from '../../blocks';

import { fetchRequestResetPassword } from '../../store/api-actions';
import { clearServerErrors } from '../../store/user-process';

import { useIsAuthorized, useAppDispatch, useAppSelectors } from '../../hooks';
import { AppRoute, TITLE_FREFIX } from '../../const';
import { normPhone } from '../../helpers';

import './RequestResetPasswordForm.scss';

export const cnResetPasswordForm = cn('RequestResetPasswordForm');
export type FormValues = {phone: string};

const InputTextTypePhone = withInputTextTypePhone(InputText);

function RequestResetPasswordForm(): JSX.Element {
  const navigate = useNavigate();
  useIsAuthorized() && navigate(AppRoute.Main);

  const dispatch = useAppDispatch();
  const {serverErrors} = useAppSelectors();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
    getValues,
  } = useForm<FormValues>({mode: 'onTouched'});

  // при заходе на страницу очищаю ошибки, пришедшие от сервера
  useEffect(() => {
    !!serverErrors && dispatch(clearServerErrors({}));
  }, []);

  useEffect(() => {
    serverErrors &&
    Object.entries(serverErrors).map(([field, message]) =>
      setError(field as keyof FormValues, { type: 'ServerError', message: message })
    );
  }, [setError, serverErrors]);

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log('onSubmi() data: ', data);

    dispatch(fetchRequestResetPassword({...data, phone: normPhone(data.phone)}));
  };

  return (
    <p className={cnResetPasswordForm(null, ['Auth', 'Form', 'Card'])}>
      <HelmetProvider>
        <title>{TITLE_FREFIX}Восстановление пароля</title>
      </HelmetProvider>
      <FormLogo/>
      <div className="FormTitle">
        Восстановление пароля
      </div>
      <Form
        submitLabel="Отправить"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      >
        <FormInfo>Для продолжения введите свой телефон</FormInfo>
        <InputTextTypePhone
          useFormProps = {{register, errors, getValues}}
          modtype = 'phone'
        />
      </Form>
      <FormInfo>
        <Link
          href={AppRoute.Login}
          handleClick={() => true}
        >
          Я вспомнил пароль
        </Link>
      </FormInfo>
    </p>
  );
}

export default RequestResetPasswordForm;
