import { Link } from "react-router";
import { useEffect, useState } from "react";

const API_URL = `https://online-store-backend-alpha.onrender.com/api/device?page=1&limit=4`;

export default function HomePage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setDevices(data.data.devices.rows);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, []);

  return (
    <section id="home">
      <div className="home-part intro">
        <h1 className="title">Добро пожаловать в Online-store</h1>
        <p className="home-text">
          Это учебный проект интернет-магазина, созданный в рамках изучения React JS, Express JS,
          Node JS. Все данные и товары представлены исключительно в демонстрационных целях.
        </p>
        <Link to="/device" className="home-btn">
          Перейти в каталог
        </Link>
      </div>

      <div className="home-part popular">
        <h2 className="title">Популярные товары</h2>

        {loading ? (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="device">
            {Array.isArray(devices) &&
              devices.map(({ id, name, img, price }) => (
                <Link to={`/device/${id}`} key={id} className="device-item">
                  <div className="device-img">
                    <img
                      src={`https://online-store-backend-alpha.onrender.com/static/${img}`}
                      alt={name}
                    />
                  </div>
                  <div className="device-info">
                    <h6 className="device-item-title">{name}</h6>
                    <span className="device-price">{price} ₸</span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
