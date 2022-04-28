import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userVotes: 0,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserVotes: (state, action) => {
      state.userVotes = action.payload;
    },
  },
});

export const { setUserId, setUserVotes } = userSlice.actions;

export default userSlice.reducer;
