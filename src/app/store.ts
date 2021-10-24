import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import usersSlice from "../features/users/usersSlice";
import commentsSlice from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice,
    comments: commentsSlice,
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
