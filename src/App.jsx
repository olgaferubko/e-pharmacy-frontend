import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";

import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import RestrictedRoute from "./components/RestrictedRoute";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const StorePage = lazy(() => import("./pages/StoresPage/StoresPage"));
const MedicinePage = lazy(() => import("./pages/MedicinePage/MedicinePage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => { dispatch(refresh()); }, [dispatch]);

  if (isRefreshing) return <Loader />;


  return (
    <>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/medicine" element={<MedicinePage />} />


            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <RestrictedRoute>
                  <RegisterPage />
                </RestrictedRoute>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
