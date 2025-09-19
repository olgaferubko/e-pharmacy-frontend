import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://e-pharmacy-backend.onrender.com";

const ENDPOINTS = {
  register: "/user/register",
  login: "/user/login",
  refresh: "/user/refresh",
  logout: "/users/logout",
};

const token = {
  set(t) {
    axios.defaults.headers.common.Authorization = `Bearer ${t}`;
  },
  unset() {
    delete axios.defaults.headers.common.Authorization;
  },
};

const pickToken = (data) =>
  data?.token || data?.accessToken || data?.data?.token || null;

const pickUser = (data) =>
  data?.user ??
  data?.data?.user ?? 
  ((data?.email || data?.displayName || data?.id || data?._id)
    ? {
        id: data?.id ?? data?._id ?? null,
        email: data?.email ?? null,
        displayName: data?.displayName ?? data?.name ?? null,
      }
    : null);

const errMsg = (e) =>
  e?.response?.data?.message || e?.response?.data?.error || e.message || "Error";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(ENDPOINTS.register, {
        email,
        password,
        displayName,
      });

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

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(ENDPOINTS.login, { email, password });

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
      await axios.post(ENDPOINTS.logout).catch(() => {});
      token.unset();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("favorites");
      return true;
    } catch (e) {
      token.unset();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("favorites");
      return rejectWithValue(errMsg(e));
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
    const saved = getState()?.auth?.token || localStorage.getItem("auth_token");
        if (!saved) return rejectWithValue("No token");
        token.set(saved);

      const { data } = await axios.get(ENDPOINTS.refresh);

      const t = pickToken(data) || saved || null;
      if (t) {
        token.set(t);
        localStorage.setItem("auth_token", t);
      } else {
        token.unset();
        localStorage.removeItem("auth_token");
      }

      const user = pickUser(data);
      return { user, token: t };
    } catch (e) {
      token.unset();
      localStorage.removeItem("auth_token");
      return rejectWithValue(errMsg(e) || "Not authorized");
    }
  }
);
