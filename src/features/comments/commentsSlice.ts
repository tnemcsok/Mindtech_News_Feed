import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { Comment } from "../../app/types";

const commentsAdapter = createEntityAdapter<Comment>();

const initialState = commentsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId: number) => {
    const response = await fetch(
      `https://mindtech-feed-task.herokuapp.com/comments/?postId=${postId}`
    );
    return await response.json();
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [fetchComments.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      commentsAdapter.upsertMany(state, action.payload);
    },
    [fetchComments.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const { selectAll: selectAllComments } =
  commentsAdapter.getSelectors<any>((state) => state.comments);

export const selectCommentsByPostID = createSelector(
  [selectAllComments, (state: RootState, postId: number) => postId],
  (comments, postId) => comments.filter((comment) => comment.postId === postId)
);

export default commentsSlice.reducer;
