import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import navModalReducer from './navModal/modal.slice';

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      navModal: navModalReducer
    }
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
