import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface IUser {
  userEncryptedToken: string | null;
}

const initialState: IUser = {
  userEncryptedToken: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEncryptedToken: (state, action: PayloadAction<string>) => {
      state.userEncryptedToken = action.payload;
    },
    removeEncryptedToken: (state) => {
      state.userEncryptedToken = null;
    }
  }
});

export const { setUserEncryptedToken, removeEncryptedToken } =
  userSlice.actions;

export const selectUserToken = (state: AppState) =>
  state.user.userEncryptedToken;

export default userSlice.reducer;
