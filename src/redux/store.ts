import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/redux/service/auth";
import tokenSlice from "@/redux/feature/Auth/authSlice";
import userSlice from "@/redux/feature/userSlice";
import projectSlice from "@/redux/feature/loadingSlice";
// create store
export const makeStore = () => {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: tokenSlice,
      user: userSlice,
      project: projectSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
