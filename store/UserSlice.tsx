import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  users: {
    id?: number;
    name: string;
    email: string;
  };
};

export const initialState: StateType = {
  users: { name: "", email: "" },
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    signUp(state, action) {
      {
        const { username, email } = action.payload;
        state.users.name = username;
        state.users.email = email;
      }
    },
    signIn(state, action) {
      const { id, username, email } = action.payload.user;
      state.users.name = username;
      state.users.email = email;
      state.users.id = id;
    },
  },
});

export const { signUp, signIn } = userSlice.actions;

export default userSlice.reducer;
