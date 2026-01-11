import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HelmetProvider } from 'react-helmet-async';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import { InputText, withInputTextTypePhone, withInputTextTypePasswordAuth } from '../../blocks/InputText';
import {
  Form,
  FormLogo,
  FormInfo,
  FormCard,
  cnFormLayout,
  Link,
  withLinkTypeA,
} from '../../blocks';
import { Nav, IHandleClick } from '../../blocks/Nav';
import { fetchLogin } from '../../store/api-actions';
import { LoginData } from '../../types/user-data';
import { clearServerErrors } from '../../store/user-process';
import { useAppDispatch, useAppSelectors } from '../../hooks';
import { FormError, AppRoute, TITLE_FREFIX } from '../../const';
import { normPhone } from '../../helpers';

import './LoginForm.scss';

export const cnLoginForm = cn('LoginForm');
export type FormValues = LoginData;

const LinkTypeA = withLinkTypeA(Link);
const InputTextTypePhone = withInputTextTypePhone(InputText);
const InputTextTypePassword = withInputTextTypePasswordAuth(InputText);

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {serverErrors} = useAppSelectors();
  const [activeNavTab, setActiveNavTab] = useState('phone');

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

  const onSubmit: SubmitHandler<FormValues> = ({login, phone, password}: FormValues) =>
    dispatch(fetchLogin({
      password,
      login: !isPhone ? login : undefined,
      phone: isPhone ? phone && normPhone(phone) : undefined,
    }));

  const handleClick = ({ev, navItemId}: IHandleClick) => {
    ev && ev.preventDefault();
    setActiveNavTab(navItemId);
  };

  const isPhone = activeNavTab === 'phone';
  const label = isPhone ? 'Телефон' : 'Логин';

  const loginProps = {
    useFormProps: {register, errors, getValues},
    name: 'login',
    icon: 'user',
    placeholder: label,
    required: true,
    validators: {required: FormError.Required},
    error: errors.login?.message,
  };

  const phoneProps = {
    ...loginProps,
    name: 'phone',
    modtype: 'phone',
  };

  return (
    <>
      <HelmetProvider>
        <title>{TITLE_FREFIX}Вход в личный кабинет</title>
      </HelmetProvider>

      <FormCard className={cnLoginForm()}>
        <FormLogo className={cnFormLayout('Logo', ['FormCard-Item'])}/>
        <div className={cnFormLayout('Title', ['FormCard-Item'])}>
          Вход в личный кабинет
        </div>
        <Form
        className={cnFormLayout('Form')}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        >
          <Nav
            navItems={[
              {to: 'phone', text: 'Телефон'},
              {to: 'login', text: 'Логин'}
            ]}
            activeItemId={activeNavTab}
            handleClick={handleClick}
          />
          {
            isPhone
              ? <InputTextTypePhone {...phoneProps} />
              : <InputText {...loginProps} />
          }
          <InputTextTypePassword
            useFormProps = {{register, errors, getValues}}
            modtype="password"
          />

          {/*
            <div className="FormInfo">
              Нажимая кнопку «Войти», вы даете согласие на обработку <span>персональных данных</span>
            </div>
          */}
        </Form>
        <div className={cnLoginForm('RegButton', ['FormCard-Item', 'Button-Wrap'])}>
          <LinkTypeA
            href={AppRoute.Rega}
            className={cnLoginForm('RegLink', ['Button', 'Auth-Button'])}
          >
            Зарегистрироваться
          </LinkTypeA>
        </div>
        {isPhone ?
          <FormInfo className='FormCard-Item'>
            <Link
              href={AppRoute.ResetPassword}
              className={cnLoginForm('RememberLink')}
            >
              Я забыл пароль
            </Link>
          </FormInfo>
          : null}
      </FormCard>
    </>
  );
}

export default LoginForm;
