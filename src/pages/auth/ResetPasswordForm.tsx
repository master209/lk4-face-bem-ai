import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { useForm, SubmitHandler } from 'react-hook-form';

import { InputText, withInputTextTypePassword } from '../../blocks/InputText';
import {
  Form,
  FormLogo,
  FormCard,
  cnFormLayout,
}  from '../../blocks';

import { ResetPasswordOk } from './ResetPasswordOk';
import { fetchResetPassword } from '../../store/api-actions';
import { clearServerErrors } from '../../store/user-process';
import { RegaData } from '../../types/user-data';

import {useIsAuthorized, useAppDispatch, useAppSelectors} from '../../hooks';
import { AppRoute, FormError } from '../../const';

import './ResetPasswordForm.scss';

export const cnResetPasswordForm = cn('ResetPasswordForm');
export type FormValues = RegaData;

const InputTextTypePassword = withInputTextTypePassword(InputText);

export function ResetPasswordForm(): JSX.Element {
  const navigate = useNavigate();
  useIsAuthorized() && navigate(AppRoute.Main);

  const dispatch = useAppDispatch();
  const {serverErrors, isResetPassword, requestResetPasswordResponse: {phoneConfirmToken}} = useAppSelectors();

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

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) =>
    dispatch(fetchResetPassword({phoneConfirmToken, password}));

  const password = getValues().password;
  const passwordRepeat = getValues().passwordRepeat;

  // возвращает message для ошибки типа PasswordsMustMatch
  const passwordsMustMatchErrorMessage = () =>
    (!!password || !!passwordRepeat) // если есть что-то в пароле или в его повторе
    && password !== passwordRepeat // но при этом эти значения различны
      ? FormError['PasswordsMustMatch'] // то выводим message ошибки
      : '';

  return (
    <div>
      {isResetPassword ? <ResetPasswordOk/> :
        <FormCard className={cnResetPasswordForm()}>
          <FormLogo className={cnFormLayout('Logo', ['FormCard-Item'])}/>
          <div className={cnFormLayout('Title', ['FormCard-Item'])}>
            Введите новый пароль
          </div>
          <Form
            className={cnFormLayout('Form')}
            submitLabel="Сохранить"
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          >
            <InputTextTypePassword
              useFormProps = {{register, errors, getValues}}
              modtype="password"
              validators={{
                validate: {PasswordsMustMatch: (val: string) => // УСЛОВИЯ ВАЛИДНОГО ЗНАЧЕНИЯ:
                  // https://codesandbox.io/s/react-hook-form-custom-validation-8kuu7
                  (val === passwordRepeat && !!passwordRepeat) // когда пароли совпали + в passwordRepeat НЕ пусто
                  || !passwordRepeat // + ИЛИ когда в повторе пустое значение
                }
              }}
            />
            <InputTextTypePassword
              useFormProps = {{register, errors, getValues}}
              name="passwordRepeat"
              modtype="password"
              placeholder="Повтор пароля"
              validators={{
                validate: {PasswordsMustMatch: (val: string) =>
                  (val === password && !!password) // когда пароли совпали + в password НЕ пусто
                  || !password // + ИЛИ когда в password пустое значение
                }
              }}
              error={errors.passwordRepeat?.message || passwordsMustMatchErrorMessage()}
            />
          </Form>
        </FormCard>}
    </div>
  );
}
