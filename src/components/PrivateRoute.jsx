import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children, roles = [] }) => {
  const { user } = useSelector(state => state.user);
  // Если пользователь не авторизован — редирект на логин
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Если роли указаны и роль пользователя не совпадает — редирект на главную
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
