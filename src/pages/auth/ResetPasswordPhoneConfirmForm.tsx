import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Tooltip } from '@yandex/ui/Tooltip/desktop/bundle';

import { InputText, withInputTextTypeSmsCode } from '../../blocks/InputText';
import { Form, FormLogo, FormInfo, Link } from '../../blocks';

import { ResetPasswordForm } from './ResetPasswordForm';
import { fetchRequestResetPasswordConfirmPhone, fetchResetPasswordSmsRepeat } from '../../store/api-actions';
import { clearServerErrors } from '../../store/user-process';

import { useIsAuthorized, useAppDispatch, useAppSelectors } from '../../hooks';
import { AppRoute } from '../../const';
import { toTimeString } from '../../helpers';

import './PhoneConfirmForm.scss';

export const cnResetPasswordPhoneConfirmForm = cn('PhoneConfirmForm');
export type FormValues = {smsCode:string};

const InputTextTypeSmsCode = withInputTextTypeSmsCode (InputText);

function ResetPasswordPhoneConfirmForm(): JSX.Element {
  const navigate = useNavigate();
  useIsAuthorized() && navigate(AppRoute.Main);

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [smsRepeatCount, setSmsRepeatCount] = useState(1); // количество повторно отправленных СМС

  const dispatch = useAppDispatch();
  const {
    requestResetPasswordResponse,
    isResetPasswordConfirmPhone,
    serverErrors,
  } = useAppSelectors();
  const {
    phone,
    phoneConfirmToken,
    smsConfirmationLifetime,
    smsConfirmationRepeat,
  } = requestResetPasswordResponse;

  const [smsRepeatTimeout, setSmsRepeatTimeout] = useState(smsConfirmationRepeat);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
    getValues,
    setValue,
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

  useEffect(() => {
    smsRepeatTimeout > 0 &&
    setTimeout(() => setSmsRepeatTimeout((prev) => prev - 1), 1000);
  }, [smsConfirmationRepeat, smsRepeatTimeout]);

  const onSubmit: SubmitHandler<FormValues> = ({smsCode}: FormValues) =>
    dispatch(fetchRequestResetPasswordConfirmPhone({
      phoneConfirmToken,
      smsCode: smsCode.replace(/\D/g, '')
    }));

  // запрос получения повторной СМС
  const handleSmsRepeat = (ev: MouseEvent) => {
    ev.preventDefault();
    dispatch(fetchResetPasswordSmsRepeat({phoneConfirmToken}));
    setSmsRepeatTimeout(smsConfirmationRepeat); // перезапускаю таймер обратного отсчета
    setSmsRepeatCount((prev) => prev + 1);
    setValue('smsCode', '');
    !!serverErrors && dispatch(clearServerErrors({}));
  };

  const isLoading = !phone || !smsConfirmationLifetime || !smsConfirmationRepeat;
  const smsTimeout = !isLoading ? toTimeString(smsRepeatTimeout) : '...';

  return (
    <div>
      {isResetPasswordConfirmPhone ? <ResetPasswordForm/> :
        <div className={cnResetPasswordPhoneConfirmForm(null, ['Auth', 'Form', 'Card'])}>
          <FormLogo/>
          <div className="FormTitle">
            Восстановление пароля
          </div>
          <div className="FormSubTitle">
            Введите код из СМС
          </div>
          <div>
            <p>СМС с кодом {smsRepeatCount > 1 && `${smsRepeatCount}-й раз `}отправлена на номер {phone}</p>
            <p>&nbsp;</p>
            <div className="FormWarning">
              <p>СМС-код действует в течение {smsConfirmationLifetime || '...'} минут</p>
            </div>
          </div>
          <Form
            submitLabel="Подтвердить"
            submitDisabled={isLoading}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          >
            <InputTextTypeSmsCode
              useFormProps = {{register, errors, getValues}}
              modtype = 'smsCode'
            />
          </Form>
          {!isLoading ?
            <div className="SmsRepeatTimeout">
              {smsRepeatTimeout > 0 ?
                <p>Отправить СМС повторно можно будет через {smsTimeout}</p> :
                <FormInfo>
                  <Link
                    href="#"
                    handleClick={handleSmsRepeat}
                  >
                    <span>Отправить СМС повторно</span>
                  </Link>
                </FormInfo>}
            </div> : null}

          <div
            ref={ref}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            <FormInfo className="NoSms">
              <Link
                href="#"
              >
                Не приходит СМС
              </Link>
            </FormInfo>
            <Tooltip view="default" size="m" anchor={ref} visible={visible}>
              Если СМС долго не приходит, вы можете позвонить в техническую поддержку по телефону 677-505
            </Tooltip>
          </div>
        </div>}
    </div>
  );
}

export default ResetPasswordPhoneConfirmForm;
