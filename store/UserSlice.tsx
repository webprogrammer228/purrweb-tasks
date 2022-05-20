import { createSlice } from "@reduxjs/toolkit";

export type StateType = {
  users: {
    id?: number | null;
    name: string;
    email: string;
  };
  subscriptions: {
    title?: string;
    price?: number;
    priceId?: number | undefined;
  };
  subscribe: {
    userId: number | null;
    productId: number | null;
    currentPeriodStart: number | null;
    currentPeriodEnd: number | null;
    status: string;
    id: number | null;
  };
};

export const initialState: StateType = {
  users: { name: "", email: "" },
  subscriptions: {},
  subscribe: {
    userId: null,
    productId: null,
    currentPeriodEnd: null,
    currentPeriodStart: null,
    status: "",
    id: null,
  },
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
      const { title, price, id } = action.payload;
      state.subscriptions.title = title;
      state.subscriptions.price = price;
      state.subscriptions.priceId = id + 1;
    },
    logOut(state, action) {
      state.users.name = "";
      state.users.email = "";
      state.users.id = null;

      state.subscriptions = {};
    },
    buySubscription(state, action) {
      const {
        id,
        userId,
        productId,
        currentPeriodStart,
        currentPeriodEnd,
        status,
      } = action.payload.subscribe;
      state.subscribe.id = id;
      state.subscribe.userId = userId;
      state.subscribe.productId = productId;
      state.subscribe.currentPeriodStart = currentPeriodStart;
      state.subscribe.currentPeriodEnd = currentPeriodEnd;
      state.subscribe.status = status;
    },
  },
});

export const { signUp, signIn, addSubscription, logOut, buySubscription } =
  userSlice.actions;

export default userSlice.reducer;
