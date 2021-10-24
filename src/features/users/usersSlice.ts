import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { User } from "../../app/types";

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(
    "https://mindtech-feed-task.herokuapp.com/users"
  );
  return await response.json();
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userUpdated(
      state,
      action: PayloadAction<{ id: number; username: string }>
    ) {
      const { id, username } = action.payload;
      const user = state.entities[id];
      if (user) {
        user.username = username;
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      // Use the `upsertMany` reducer as a mutating update utility
      usersAdapter.upsertMany(state, action.payload);
    },
    [fetchUsers.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { userUpdated } = usersSlice.actions;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>((state) => state.users);

export default usersSlice.reducer;
