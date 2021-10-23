import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Post } from "../../app/types";
import { createEntityAdapter } from "@reduxjs/toolkit";

// const postsAdapter = createEntityAdapter<Post>();

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

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostsByUser = (state: RootState, userId: number) =>
  state.posts.posts.filter((post: Post) => post.userId === userId);

// Selectors
// export const {
//   selectAll: selectAllPosts,
//   selectById: selectPostById,
//   selectIds: selectPostIds,
// } = postsAdapter.getSelectors<any>((state) => state.posts);

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state: RootState, userId: number) => userId],
//   (posts, userId) => posts.filter((post) => post.userId === userId)
// );

export default postsSlice.reducer;
