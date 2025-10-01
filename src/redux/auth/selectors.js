export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user || null;
export const selectEmail = (state) => state.auth.user?.email || null;
export const selectDisplayName = (state) => state.auth.user?.displayName || null;
export const selectToken = (state) => state.auth.token || null;
export const selectIsLoggedIn = (state) => Boolean(state.auth.token && state.auth.user);
export const selectIsRefreshing = (state) => Boolean(state.auth.isRefreshing);
export const selectAuthLoading = (state) => Boolean(state.auth.loading);
export const selectAuthError = (state) => state.auth.error || null;