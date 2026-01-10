import { createSlice } from '@reduxjs/toolkit';
import { Toast } from '../../types/common';
import { NameSpace } from '../../const';

export type MainProcess = {
  isMenuClosed: boolean;
  activeTopbarMenuId: string;
  activePageMenu: {
    id: string;
    link: string;
  };
  toastMain: Toast;
};

const initialState: MainProcess = {
  isMenuClosed: false,
  activeTopbarMenuId: '',
  activePageMenu: {
    id:'',
    link: ''
  },
  toastMain: {
    type: '',
    text: '',
  },
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    invertIsMenuClosed: (state) => { // инвертирует значение isMenuClosed
      state.isMenuClosed = !state.isMenuClosed;
    },
    setIsMenuClosed: (state, {payload}) => { // явное значение для isMenuClosed
      state.isMenuClosed = payload;
    },
    setActivePageMenuId: (state, {payload: {navItemId}}) => {
      if (state.activePageMenu['id'] !== navItemId) {
        state.activePageMenu = {id:navItemId as string, link: state.activePageMenu.link};
        state.activeTopbarMenuId = '-'; // сбрасываем значения в прочих меню
      }
    },
    setActivePageMenuLink: (state, {payload: {navLinkId}}) => {
      if (state.activePageMenu['link'] !== navLinkId) {
        const id = state.activePageMenu['id'];
        state.activePageMenu = {id, link: navLinkId as string};
      }
    },
  },
});

export const {
  invertIsMenuClosed,
  setIsMenuClosed,
  setActivePageMenuId,
  setActivePageMenuLink,
} = mainProcess.actions;
