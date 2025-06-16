import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  token: string;
  role: string;
  id: string;
}

interface AuthState {
  user: UserState;
}

const initialState: AuthState = {
  user: {
    email: "",
    token: "",
    role: "",
    id: "",
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetUserData: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = {
        email: "",
        token: "",
        role: "",
        id:""
      };
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
    },
  },
});

export const { SetUserData, Logout } = AuthSlice.actions;

export default AuthSlice.reducer;
