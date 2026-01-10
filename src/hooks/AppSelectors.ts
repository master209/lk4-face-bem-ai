import {useAppSelector} from '.';

import {
  getAuthorizationStatus,
  getIsCheckingAuth,
  getServerErrors,
  getUsername,
  getShortname,
  getRegaResponse,
  getSmsRepeatResponse,
  getIsRegistrationOk,
  getIsResetPassword,
  getIsResetPasswordConfirmPhone,
  getIsPhoneNotConfirmed,
  getRequestResetPasswordResponse,
} from '../store/user-process';

import {
  getActiveTopbarMenuId,
  getActivePageMenu,
  getToastText,
} from '../store/main-process';


export const useAppSelectors = () => {
  const isCheckingAuth = useAppSelector(getIsCheckingAuth);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const username = useAppSelector(getUsername);
  const shortname = useAppSelector(getShortname);
  const serverErrors = useAppSelector(getServerErrors);
  const regaResponse = useAppSelector(getRegaResponse);
  const requestResetPasswordResponse = useAppSelector(getRequestResetPasswordResponse);
  const smsRepeatResponse = useAppSelector(getSmsRepeatResponse);
  const isRegistrationOk = useAppSelector(getIsRegistrationOk);
  const isResetPassword = useAppSelector(getIsResetPassword);
  const isResetPasswordConfirmPhone = useAppSelector(getIsResetPasswordConfirmPhone);
  const isPhoneNotConfirmed = useAppSelector(getIsPhoneNotConfirmed);

  const activeTopbarMenuId = useAppSelector(getActiveTopbarMenuId);
  const activePageMenu = useAppSelector(getActivePageMenu);
  const toastMain = useAppSelector(getToastText);

  return {
    isCheckingAuth,
    authorizationStatus,
    username,
    shortname,
    serverErrors,
    regaResponse,
    requestResetPasswordResponse,
    smsRepeatResponse,
    isRegistrationOk,
    isResetPassword,
    isResetPasswordConfirmPhone,
    isPhoneNotConfirmed,
    activeTopbarMenuId,
    activePageMenu,
    toastMain
  };
};
