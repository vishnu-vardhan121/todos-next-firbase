import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
