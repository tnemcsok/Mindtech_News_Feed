import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { Post } from "../../app/types";

const initialState = {
  posts: [],
  status: "idle",
  error: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(
    "https://mindtech-feed-task.herokuapp.com/posts"
  );
  return await response.json();
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostsByUser = (state: RootState, userId: number) =>
  state.posts.posts.filter((post: Post) => post.userId === userId);

export const selectPostById = (state: RootState, postId: number) =>
  state.posts.posts.filter((post: Post) => post.id === postId);

export default postsSlice.reducer;
