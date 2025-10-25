import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slices/userSlice";
import AppRouter from "./components/AppRouter";
import Layout from "./components/Layout";
import "./assets/css/style.css";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}
