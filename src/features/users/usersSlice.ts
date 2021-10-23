import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../app/types";

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(
    "https://mindtech-feed-task.herokuapp.com/users"
  );
  return await response.json();
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.type]: usersAdapter.setAll,
  },
});

// Selectors
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>((state) => state.users);

export default usersSlice.reducer;
