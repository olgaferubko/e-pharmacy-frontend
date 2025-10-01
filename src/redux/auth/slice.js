import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refresh } from "./operations";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token ?? state.token;
        state.isLoggedIn = Boolean(state.user && (state.token || true));
      })
      .addCase(register.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload || error.message;
      });

    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token ?? state.token;
        state.isLoggedIn = Boolean(state.user && (state.token || true));
      })
      .addCase(logIn.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload || error.message;
      });

    builder
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload || error.message;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      });

    builder
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        if (payload.user) state.user = payload.user;
        if (payload.token) state.token = payload.token;
        state.isLoggedIn = Boolean(state.token); 
      })
      .addCase(refresh.rejected, (state, { payload, error }) => {
        state.isRefreshing = false;
        state.error =
          (typeof payload === "string" && payload) || error?.message || null;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
