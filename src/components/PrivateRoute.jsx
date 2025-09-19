import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";

function PrivateRoute({ children, redirectTo = "/login" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  if (isRefreshing) return null;
  return isLoggedIn ? children : <Navigate to={redirectTo} state={{ from: location }} replace />;
}

export default PrivateRoute;
