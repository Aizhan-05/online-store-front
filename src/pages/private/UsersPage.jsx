import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/axios";
import Loader from "../../components/Loader";
import { FaTrash } from "react-icons/fa";

const API_BASE = "https://online-store-backend-alpha.onrender.com/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Получить список пользователей
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка при получении пользователей");

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Удалить пользователя
  const handleDelete = async id => {
    if (!window.confirm("Вы уверены, что хотите удалить пользователя?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка при удалении пользователя");

      await fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="admin-users-page">
      <h1>Управление пользователями</h1>

      {users.length === 0 ? (
        <p>Пользователей не найдено.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Логин</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username || user.name || "—"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role !== "ADMIN" && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                      title="Удалить"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
