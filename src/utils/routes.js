import HomePage from "../pages/public/HomePage";
import DevicesPage from "../pages/public/DevicesPage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import SingleDevicePage from "../pages/public/SingleDevicePage";
import DashboardProfilePage from "../pages/private/ProfilePage";
import DashboardDevicesPage from "../pages/private/DevicesPage";
import DashboardCartPage from "../pages/private/CartPage";
import DashboardUsersPage from "../pages/private/UsersPage";
import NotfoundPage from "../pages/public/NotFoundPage";
import {
  HOME_PAGE_ROUTE,
  DEVICES_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
  SINGLE_DEVICE_PAGE_ROUTE,
  DASHBOARD_PROFILE_PAGE_ROUTE,
  DASHBOARD_DEVICES_PAGE_ROUTE,
  DASHBOARD_CART_PAGE_ROUTE,
  DASHBOARD_USERS_PAGE_ROUTE,
  Roles,
} from "./consts";
import { RiUser3Line } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { LuUsers, LuList } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export const routes = [
  { path: HOME_PAGE_ROUTE, element: HomePage, roles: [Roles.GUEST] },
  { path: DEVICES_PAGE_ROUTE, element: DevicesPage, roles: [Roles.GUEST] },
  { path: LOGIN_PAGE_ROUTE, element: LoginPage, roles: [Roles.GUEST] },
  { path: REGISTER_PAGE_ROUTE, element: RegisterPage, roles: [Roles.GUEST] },
  { path: SINGLE_DEVICE_PAGE_ROUTE, element: SingleDevicePage, roles: [Roles.GUEST] },
  {
    path: DASHBOARD_PROFILE_PAGE_ROUTE,
    element: DashboardProfilePage,
    roles: [Roles.USER, Roles.ADMIN],
  },
  {
    path: DASHBOARD_DEVICES_PAGE_ROUTE,
    element: DashboardDevicesPage,
    roles: [Roles.USER, Roles.ADMIN],
  },
  { path: DASHBOARD_CART_PAGE_ROUTE, element: DashboardCartPage, roles: [Roles.USER] },
  { path: DASHBOARD_USERS_PAGE_ROUTE, element: DashboardUsersPage, roles: [Roles.ADMIN] },
  {
    path: "*",
    element: NotfoundPage,
    roles: [Roles.GUEST, Roles.USER, Roles.ADMIN],
  },
];

export const sidebarLinks = [
  {
    link: DASHBOARD_PROFILE_PAGE_ROUTE,
    icon: RiUser3Line,
    text: "Мой профиль",
    roles: [Roles.USER, Roles.ADMIN],
  },
  {
    link: DASHBOARD_DEVICES_PAGE_ROUTE,
    icon: LuList,
    text: "Каталог товаров",
    roles: [Roles.USER, Roles.ADMIN],
  },
  {
    link: DASHBOARD_CART_PAGE_ROUTE,
    icon: LuShoppingCart,
    text: "Моя корзина",
    roles: [Roles.USER],
  },
  {
    link: DASHBOARD_USERS_PAGE_ROUTE,
    icon: LuUsers,
    text: "Пользователи",
    roles: [Roles.ADMIN],
  },
];
