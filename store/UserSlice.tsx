import { createSlice } from "@reduxjs/toolkit";

export type StateType = {
  users: {
    id?: number;
    name: string;
    email: string;
  };
  subscriptions: { title: string; price: number }[];
};

export const initialState: StateType = {
  users: { name: "", email: "" },
  subscriptions: [],
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
    addSubscription(state, action) {
      const { title, price } = action.payload;
      state.subscriptions.push({ title: title, price: price });
    },
  },
});

export const { signUp, signIn, addSubscription } = userSlice.actions;

export default userSlice.reducer;
