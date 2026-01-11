import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { cn } from '@bem-react/classname';
import { useForm, SubmitHandler } from 'react-hook-form';

import { InputCheckbox } from '../../blocks/InputCheckbox';
import { InputText, withInputTextTypePhone, withInputTextTypePassword } from '../../blocks/InputText';
import {
  Form,
  FormLogo,
  FormInfo,
  Link,
  FormCard,
  cnFormLayout,
} from '../../blocks';

import { fetchRega } from '../../store/api-actions';
import { clearServerErrors } from '../../store/user-process';
import { AuthData } from '../../types/user-data';

import { useIsAuthorized, useAppDispatch, useAppSelectors } from '../../hooks';
import { DOC_PATH, AppRoute, FormError, TITLE_FREFIX } from '../../const';
import { normPhone } from '../../helpers';

import './RegaForm.scss';

export const cnRegaForm = cn('RegaForm');
export type FormValues = AuthData;

const InputTextTypePhone = withInputTextTypePhone(InputText);
const InputTextTypePassword = withInputTextTypePassword(InputText);

function RegaForm(): JSX.Element {
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

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) =>
    dispatch(fetchRega({...data, phone: normPhone(data.phone)}));

  const password = getValues().password;
  const passwordRepeat = getValues().passwordRepeat;

  // возвращает message для ошибки типа PasswordsMustMatch
  const passwordsMustMatchErrorMessage = () =>
    (!!password || !!passwordRepeat) // если есть что-то в пароле или в его повторе
    && password !== passwordRepeat // но при этом эти значения различны
      ? FormError['PasswordsMustMatch'] // то выводим message ошибки
      : '';

  return (
    <>
      <HelmetProvider>
        <title>{TITLE_FREFIX}Регистрация</title>
      </HelmetProvider>

      <FormCard className={cnRegaForm()}>
        <FormLogo className={cnFormLayout('Logo', ['FormCard-Item'])}/>
        <div className={cnFormLayout('Title', ['FormCard-Item'])}>
          Регистрация
        </div>
        <Form
          className={cnFormLayout('Form')}
          submitLabel="Зарегистрироваться"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        >
          <InputText
            useFormProps = {{register, errors, getValues}}
            name="lastname"
            icon="user"
            placeholder="Фамилия"
            required
            validators={{required: FormError.Required}}
            error={errors.lastname?.message}
          />
          <InputText
            useFormProps = {{register, errors, getValues}}
            name="firstname"
            icon="user"
            placeholder="Имя"
            required
            validators={{required: FormError.Required}}
            error={errors.firstname?.message}
          />
          <InputTextTypePhone
            useFormProps = {{register, errors, getValues}}
            modtype = 'phone'
          />
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
          <InputCheckbox
            register={register}
            name="confirm"
            label={
              <FormInfo>
                Принимаю&nbsp;
                <Link
                  className="Link"
                  target="_blank"
                  href={`${DOC_PATH}oferta_6454130467.docx`}
                >
                  пользовательское соглашение
                </Link>
              </FormInfo>
            }
            withLabel
            validators={{required: 'Необходимо подтвердить согласие'}}
            error={errors.confirm?.message}
          />
        </Form>
        <FormInfo className={cnFormLayout('Info', ['FormCard-Item'])}>
          <Link
            href={AppRoute.Login}
            handleClick={() => true}
          >
            Я уже зарегистрирован
          </Link>
        </FormInfo>
      </FormCard>
    </>
  );
}

export default RegaForm;
