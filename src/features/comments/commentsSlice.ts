import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Comment } from "../../app/types";

const commentsAdapter = createEntityAdapter<Comment>();

const initialState = commentsAdapter.getInitialState();

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(
      "https://mindtech-feed-task.herokuapp.com/comments"
    );
    return await response.json();
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.fulfilled.type]: commentsAdapter.setAll,
  },
});

export const { selectAll: selectAllComments } =
  commentsAdapter.getSelectors<any>((state) => state.comments);

export const selectCommentsByPostID = createSelector(
  [selectAllComments, (state: RootState, postId: number) => postId],
  (comments, postId) => comments.filter((comment) => comment.postId === postId)
);

export default commentsSlice.reducer;
