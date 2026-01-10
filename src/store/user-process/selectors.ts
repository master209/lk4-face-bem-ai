import { State, FormErrors } from '../../types/common';
import { RegaResponse, RequestResetPasswordResponse, SmsRepeatResponse, Balance } from '../../types/user-data';
import { AuthorizationStatus, NameSpace } from '../../const';

export const getIsCheckingAuth = (state: State): boolean => state[NameSpace.User].isCheckingAuth;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUsername = (state: State): string => state[NameSpace.User].username;
export const getShortname = (state: State): string => state[NameSpace.User].shortname;
export const getBalance = (state: State): Balance => state[NameSpace.User].balance;
export const getServerErrors = (state: State): FormErrors => state[NameSpace.User].serverErrors;
export const getRegaResponse = (state: State): RegaResponse => state[NameSpace.User].regaResponse;
export const getSmsRepeatResponse = (state: State): SmsRepeatResponse | undefined => state[NameSpace.User].smsRepeatResponse;
export const getIsRegistrationOk = (state: State): boolean => state[NameSpace.User].isRegistrationOk;
export const getIsPhoneNotConfirmed = (state: State): boolean | undefined => state[NameSpace.User].isPhoneNotConfirmed;

export const getIsResetPassword = (state: State): boolean | undefined => state[NameSpace.User].isResetPassword;
export const getRequestResetPasswordResponse = (state: State): RequestResetPasswordResponse => state[NameSpace.User].requestResetPasswordResponse;
export const getIsResetPasswordConfirmPhone = (state: State): boolean | undefined => state[NameSpace.User].isResetPasswordConfirmPhone;
