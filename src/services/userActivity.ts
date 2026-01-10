// время UNIX-time, когда пора разлогинивать в случае превышения порога бездействия разлогинивание (в мин)
const USER_INACTIVITY_LOGOUT_TIME = 'LK_GALS__USER_INACTIVITY_LOGOUT_TIME';

export const getLogoutTime = (): number | undefined => {
  const LogoutTime = localStorage.getItem(USER_INACTIVITY_LOGOUT_TIME);
  return LogoutTime ? +LogoutTime : undefined;
};

export const saveLogoutTime = (logoutTime: number): void => {
  localStorage.setItem(USER_INACTIVITY_LOGOUT_TIME, logoutTime.toString());
  return
};

export const dropLogoutTime = (): void => {
  localStorage.removeItem(USER_INACTIVITY_LOGOUT_TIME);
};
