import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
  },
  reducers: {
    setUserId: (state) => {
      state.userId = state;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
