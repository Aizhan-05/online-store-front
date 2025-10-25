import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

const API_BASE = "https://online‑store‑backend‑alpha.onrender.com/api";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Загрузка корзины
  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Ошибка при загрузке корзины");
      const data = await res.json();

      setCart(data.data || data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Удалить товар из корзины
  const handleRemove = async deviceId => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/cart/${deviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Ошибка при удалении товара");
      await fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  // Изменить количество товара
  const handleUpdateQuantity = async (deviceId, quantity) => {
    if (quantity < 1) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deviceId, quantity }),
      });
      if (!res.ok) throw new Error("Ошибка при обновлении количества");
      await fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  // Очистить корзину
  const handleClear = async () => {
    if (!window.confirm("Очистить всю корзину?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/cart/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Ошибка при очистке корзины");
      await fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Loader />;

  if (!cart || (cart.CartDevices && cart.CartDevices.length === 0)) {
    return (
      <section className="cart-page">
        <h1 className="title">Корзина</h1>
        <p>Корзина пуста.</p>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1 className="title">Корзина</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Сумма</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cart.CartDevices.map(item => (
            <tr key={item.deviceId}>
              <td>
                <img
                  src={`${API_BASE.replace("/api", "")}/static/${item.Device.img}`}
                  alt={item.Device.name}
                  width="50"
                />
              </td>
              <td>{item.Device.name}</td>
              <td>{item.Device.price} ₸</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleUpdateQuantity(item.deviceId, +e.target.value)}
                />
              </td>
              <td>{(item.Device.price * item.quantity).toFixed(2)} ₸</td>
              <td>
                <button className="remove-btn" onClick={() => handleRemove(item.deviceId)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-footer">
        <button className="clear-btn" onClick={handleClear}>
          Очистить корзину
        </button>
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Перейти к оформлению
        </button>
      </div>
    </section>
  );
}
