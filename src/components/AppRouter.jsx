import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import { routes } from "../utils/routes";
import { Roles } from "../utils/consts";

export default function AppRouter() {
  const user = useSelector(state => state.user.user);
  const userRole = user ? user.role : Roles.GUEST;

  return (
    <Routes>
      {routes
        .filter(route => route.roles.includes(userRole))
        .map(route => {
          const Component = route.element;
          return <Route key={route.path} path={route.path} element={<Component />} />;
        })}
    </Routes>
  );
}
