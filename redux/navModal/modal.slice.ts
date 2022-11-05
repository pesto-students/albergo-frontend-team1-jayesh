import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface INavModal {
  isNavModalOpen: boolean;
  type: 'login' | 'signup';
}

const initialState: INavModal = {
  isNavModalOpen: false,
  type: 'login'
};

export const navModalSlice = createSlice({
  name: 'navModal',
  initialState,
  reducers: {
    toggleNavModal: (state) => {
      state.isNavModalOpen = !state.isNavModalOpen;
    },
    setNavModalType: (state, action: PayloadAction<'login' | 'signup'>) => {
      state.type = action.payload;
    }
  }
});

export const { toggleNavModal, setNavModalType } = navModalSlice.actions;

export const selectIsNavModalOpen = (state: AppState) =>
  state.navModal.isNavModalOpen;

export default navModalSlice.reducer;
