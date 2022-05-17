import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  users: {
    name: string;
    email: string;
    password: string;
  };

  errors: string[];
};

export const initialState: StateType = {
  users: { name: "", email: "", password: "" },
  errors: [""],
};

const userSlice = createSlice({
  name: "Column",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
