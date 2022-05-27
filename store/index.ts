import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./UserSlice";
import { userApi } from "./RegisterApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  users: userSlice,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
