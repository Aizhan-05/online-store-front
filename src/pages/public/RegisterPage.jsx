import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../services/axios";
import { LOGIN_PAGE_ROUTE, DASHBOARD_PROFILE_PAGE_ROUTE } from "../../utils/consts";
import Loader from "../../components/Loader";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    try {
      setErrorMessage("");

      if (!email || !password) {
        alert("Введите ваш e-mail и пароль!");
        return;
      }

      setIsLoading(true);

      const res = await axiosInstance.post("/user/registration", { email, password });

      // Если хочешь сразу логинить пользователя после регистрации:
      // localStorage.setItem("token", res.data.token);
      // const userResponse = await axiosInstance.get("/user/auth", {
      //   headers: { Authorization: localStorage.getItem("token") },
      // });
      // dispatch(login(userResponse.data));
      // navigate(DASHBOARD_PROFILE_PAGE_ROUTE);

      navigate(LOGIN_PAGE_ROUTE);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Ошибка при регистрации");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth">
      <form className="form" onSubmit={handleRegister}>
        <h1 className="form-title">Регистрация</h1>

        <div className="form-block">
          <span className="form-label">E-mail</span>
          <input
            type="email"
            className="form-input"
            placeholder="Введите свой email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-block">
          <span className="form-label">Пароль</span>
          <input
            type="password"
            className="form-input"
            placeholder="Введите свой пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn form-btn">
          Зарегистрироваться
        </button>

        <p className="form-link">
          Уже есть аккаунт? <Link to={LOGIN_PAGE_ROUTE}>Войти</Link>
        </p>

        {errorMessage && <p className="form-text-error">{errorMessage}</p>}
      </form>

      {isLoading && <Loader isFullPage={true} />}
    </div>
  );
}
