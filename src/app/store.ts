import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice,
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
