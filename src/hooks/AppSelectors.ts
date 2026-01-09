import {useAppSelector} from '.';

import {
  getActiveTopbarMenuId,
  getActivePageMenu,
  getToastText,
} from '../store/main-process';


export const useAppSelectors = () => {
  const activeTopbarMenuId = useAppSelector(getActiveTopbarMenuId);
  const activePageMenu = useAppSelector(getActivePageMenu);
  const toastMain = useAppSelector(getToastText);

  return {
    activeTopbarMenuId,
    activePageMenu,
    toastMain
  };
};
