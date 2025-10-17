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
  logout:  "/user/logout", 
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
  ((data?.email || data?.name || data?.displayName || data?.id || data?._id)
    ? {
        id: data?.id ?? data?._id ?? null,
        email: data?.email ?? null,
        displayName: data?.name ?? data?.displayName ?? null,
      }
    : null);

const errMsg = (e) =>
  e?.response?.data?.message || e?.response?.data?.error || e.message || "Error";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, phone }, { rejectWithValue }) => {
    try {
      const payload = { name, email, password };
      if (phone) payload.phone = phone;

      const { data } = await axios.post(ENDPOINTS.register, payload);

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
      await authApi.post(ENDPOINTS.logout).catch(() => {});
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
      const { data } = await axios.get(ENDPOINTS.refresh);

      const t = data?.data?.accessToken || data?.accessToken || null;
      if (!t) throw new Error("No access token");

      axios.defaults.headers.common.Authorization = `Bearer ${t}`;
      localStorage.setItem("auth_token", t);

      return { user: null, token: t };
    } catch (e) {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("auth_token");
      return rejectWithValue(e?.response?.data?.message || e.message || "Not authorized");
    }
  }
);


