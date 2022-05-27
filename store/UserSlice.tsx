import { createSlice } from "@reduxjs/toolkit";
import { MySubscription, PurchasedSubscription } from "../types/type";
import Cookies from "js-cookie";

export type StateType = {
  users: {
    id?: number | null;
    name: string;
    email: string;
  };
  currentSubscription: PurchasedSubscription;
  subscribe: {
    userId: number | null;
    productId: number | null;
    currentPeriodStart: number | null;
    currentPeriodEnd: number | null;
    status: string;
    id: number | null;
  };
  allSubscriptions: MySubscription[];
};

export const initialState: StateType = {
  users: { name: "", email: "" },
  currentSubscription: {},
  subscribe: {
    userId: null,
    productId: null,
    currentPeriodEnd: null,
    currentPeriodStart: null,
    status: "",
    id: null,
  },
  allSubscriptions: [],
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
      state.currentSubscription.title = title;
      state.currentSubscription.price = price;
      state.currentSubscription.priceId = id + 1;
    },
    logOut(state, action) {
      state.users.name = "";
      state.users.email = "";
      state.users.id = null;
      Cookies.set("username", "");
      Cookies.set("token", "");

      state.currentSubscription = {};
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
    codeActivate(state, action) {
      const { id, status, origin } = action.payload;
      state.allSubscriptions.map((subscription) =>
        subscription.codes.map((code) => {
          if (code.id === id) {
            code.status = status;
            code.origin = origin;
          }
        })
      );
    },
    getAllSubscription(state, action) {
      const { datas } = action.payload;
      state.allSubscriptions.length === 0 &&
        datas[0].map((subscription: MySubscription) =>
          state.allSubscriptions.push(subscription)
        );
    },
  },
});

export const {
  signUp,
  signIn,
  addSubscription,
  logOut,
  buySubscription,
  codeActivate,
  getAllSubscription,
} = userSlice.actions;

export default userSlice.reducer;
