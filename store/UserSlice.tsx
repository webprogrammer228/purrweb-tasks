import {createSlice} from "@reduxjs/toolkit";
import {
  AddedSubscription,
  AuthInputs,
  Code,
  LoginResponseType,
  MySubscription,
  PurchasedSubscription,
  Subscribe,
  SubscribeType,
} from "../types/type";
import Cookies from "js-cookie";
import {CookiesEnum, setTokenToCookies} from "../utils/utils";

export type StateType = {
  users: {
    id?: number | null;
    username: string;
    email: string;
  };
  currentSubscription: PurchasedSubscription;
  //возможно, здесь было бы проще сделать subscribe?: тип (без наллов у каждого поля)
  subscribe?: Subscribe;
  allSubscriptions: MySubscription[];
};

export const initialState: StateType = {
  users: { username: "", email: "" },
  currentSubscription: { price: 0, priceId: 0, title: "" },
  allSubscriptions: [],
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    //лучше было бы типизировать все пэйлоады, чтобы не ошибиться в более сложных местах. для этого тайпскрипт и нужен
    signUp(state, action: { payload: Omit<AuthInputs, "token" | "password"> }) {
      {
        state.users = { ...action.payload };
        //если бы везде типы соответствовали, то можно было бы через деструктуризацию сделать в нескольких редьюсерах
        //особенно в buySubscription
        //state.users = {...action.payload}
      }
    },
    signIn(
      state,
      action: {
        payload: Omit<LoginResponseType, "token">;
      }
    ) {
      state.users = { ...action.payload.user };
    },
    addSubscription(
      state,
      action: { payload: AddedSubscription & { id: number } }
    ) {
      state.currentSubscription = {...action.payload, priceId: action.payload.id++};
    },
    logOut(state, _) {
      state.users.username = "";
      state.users.email = "";
      state.users.id = null;
      Cookies.set(CookiesEnum.USERNAME, "");
      Cookies.set(CookiesEnum.TOKEN, "");
      //setTokenToCookies('')

      state.currentSubscription = { price: 0, title: "", priceId: 0 };
    },
    buySubscription(state, action: { payload: SubscribeType }) {
      state.subscribe = { ...action.payload };
    },
    codeActivate(state, action: { payload: Code }) {
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
