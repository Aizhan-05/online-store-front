import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="container">
      <h1 className="title">404 - Страница не найдена</h1>
      <p className="text">
        Проверьте адрес или вернитесь на <Link to="/">главную страницу</Link>
      </p>
    </div>
  );
}
