import { State, Toast } from '../../types/common';
import { NameSpace } from '../../const';

export const getIsMenuClosed = (state: State): boolean => state[NameSpace.Main].isMenuClosed;
export const getActiveTopbarMenuId = (state: State): string => state[NameSpace.Main].activeTopbarMenuId;
export const getActivePageMenu = (state: State): {id:string; link: string} => state[NameSpace.Main].activePageMenu;
export const getToastText = (state: State): Toast => state[NameSpace.Main].toastMain;
