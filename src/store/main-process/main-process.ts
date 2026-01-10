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
    setActiveTopbarMenuId: (state, {payload: {navItemId}}) => {
      if (state.activeTopbarMenuId !== navItemId) {
        state.activeTopbarMenuId = navItemId as string;
        state.activePageMenu = {id:'', link:''}; // сбрасываем значения в прочих меню
      }
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
    setToastText: (state, {payload}) => {
      state.toastMain = payload;
    },
  },
/*
  extraReducers(builder) {
    builder
      .addCase(fetchLoadOffers.pending, (state) => {
        state.isOffersLoading = true;
        state.areOffersLoaded = false;
      })
  }
*/
});

export const {
  invertIsMenuClosed,
  setIsMenuClosed,
  setActiveTopbarMenuId,
  setActivePageMenuId,
  setActivePageMenuLink,
  setToastText,
} = mainProcess.actions;
