export const IS_COOKIES_DONE = 'LK_GALS__IS_COOKIES_DONE';

// Пользователю уже показали уведомление о куках?
export const isCookiesDone = (): boolean => !!localStorage.getItem(IS_COOKIES_DONE);

// Да, пользователю уже показали уведомление о куках
export const saveCookiesDone = (): void => localStorage.setItem(IS_COOKIES_DONE, '1');
