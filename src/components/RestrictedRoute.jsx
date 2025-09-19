import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";

function RestrictedRoute({ children, redirectTo = "/" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  if (isRefreshing) return null;
  return isLoggedIn ? <Navigate to={redirectTo} state={{ from: location }} replace /> : children;
}

export default RestrictedRoute;
