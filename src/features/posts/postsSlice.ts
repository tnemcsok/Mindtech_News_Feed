import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

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
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: {
    [fetchPosts.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
