import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../reduxSlices/userSlice';
import fileReducer from '../reduxSlices/storageSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    files: fileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
