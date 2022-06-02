import { createSlice } from "@reduxjs/toolkit";
import {MySubscription, PurchasedSubscription, SettingsPersonalInfoType} from "../types/type";
import Cookies from "js-cookie";

export type StateType = {
  users: {
    id?: number | null;
    name: string;
    email: string;
  };
  currentSubscription: PurchasedSubscription;
  //возможно, здесь было бы проще сделать subscribe?: тип (без наллов у каждого поля)
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
  currentSubscription: { price: 0, priceId: 0, title: "" },
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
    //лучше было бы типизировать все пэйлоады, чтобы не ошибиться в более сложных местах. для этого тайпскрипт и нужен
    signUp(state, action: {payload: SettingsPersonalInfoType}) {
      {
        const { username, email } = action.payload;
        state.users.name = username;
        state.users.email = email;
        //если бы везде типы соответствовали, то можно было бы через деструктуризацию сделать в нескольких редьюсерах
        //особенно в buySubscription
        //state.users = {...action.payload}
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

      state.currentSubscription = { price: 0, title: "", priceId: 0 };
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
      const { allSubscriptions } = action.payload;
      state.allSubscriptions.length === 0 &&
        allSubscriptions[0].map((subscription: MySubscription) =>
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
