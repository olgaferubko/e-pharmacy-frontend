import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://e-pharmacy-backend-bad9.onrender.com/api";

const authApi = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

const ENDPOINTS = {
  register: "/user/register",
  login: "/user/login",
  refresh: "/user/refresh",
  logout: "/user/logout",
};

const token = {
  set(t) {
    authApi.defaults.headers.common.Authorization = `Bearer ${t}`;
  },
  unset() {
    delete authApi.defaults.headers.common.Authorization;
  },
};

const pickToken = (data) =>
  data?.data?.accessToken || data?.accessToken || data?.token || data?.data?.token || null;

const pickUser = (data) =>
  data?.data?.user || data?.user || {
    name: "User",
    email: null,
  };


const errMsg = (e) =>
  e?.response?.data?.message || e?.response?.data?.error || e.message || "Error";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, phone }, { rejectWithValue }) => {
    try {
      const payload = { name, email, password };
      if (phone) payload.phone = phone;

      await authApi.post(ENDPOINTS.register, payload);

      const { data } = await authApi.post(ENDPOINTS.login, { email, password });

      const t = data?.data?.accessToken || data?.accessToken || null;
      if (t) {
        token.set(t);
        localStorage.setItem("auth_token", t);
      }

      const user = data?.data?.user || data?.user || { name, email };
      return { user, token: t ?? null };
    } catch (e) {
      return rejectWithValue(errMsg(e));
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.post(ENDPOINTS.login, { email, password });
      const t = pickToken(data);

      if (t) {
        token.set(t);
        localStorage.setItem("auth_token", t);
      }

      const user = pickUser(data);
      return { user, token: t ?? null };
    } catch (e) {
      return rejectWithValue(errMsg(e));
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.post(ENDPOINTS.logout);
      token.unset();
      localStorage.removeItem("auth_token");
      return true;
    } catch (e) {
      token.unset();
      localStorage.removeItem("auth_token");
      return rejectWithValue(errMsg(e));
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authApi.get("/user/refresh", {
        withCredentials: true,
      });

      const t =
        data?.data?.accessToken || data?.accessToken || null;

      if (!t) throw new Error("No access token");

      token.set(t);
      localStorage.setItem("auth_token", t);

      const user =
        data?.data?.user ||
        data?.user ||
        JSON.parse(localStorage.getItem("auth_user") || "{}");

      localStorage.setItem("auth_user", JSON.stringify(user));

      return { user, token: t };
    } catch (e) {
      token.unset();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      return rejectWithValue(
        e?.response?.data?.message || e.message || "Error"
      );
    }
  }
);
