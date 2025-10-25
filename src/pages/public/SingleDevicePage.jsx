import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { axiosInstance } from "../../services/axios";
import Loader from "../../components/Loader";

export default function SingleDevicePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const deviceRes = await axiosInstance.get(`/device/${id}`);
        const deviceData = deviceRes.data.data.device;
        if (!deviceData) {
          setError("Устройство не найдено");
          return;
        }
        setDevice(deviceData);

        // Запрос названия бренда
        const brandRes = await axiosInstance.get(`/brand/${deviceData.brandId}`);
        setBrandName(brandRes.data.name);

        // Запрос названия типа
        const typeRes = await axiosInstance.get(`/type/${deviceData.typeId}`);
        setTypeName(typeRes.data.name);
      } catch (err) {
        console.error(err);
        setError("Ошибка загрузки устройства");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <section className="single-device">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <h1 className="device-title">{device.name}</h1>

      <div className="device-content">
        <div className="device-image-wrapper">
          <img
            className="device-image"
            src={`https://online-store-backend-alpha.onrender.com/static/${device.img}`}
            alt={device.name}
          />
        </div>

        <div className="device-info-block">
          <p className="device-price">Цена: {device.price} ₸</p>
          <p className="device-type">Тип: {typeName}</p>
          <p className="device-brand">Бренд: {brandName}</p>

          {device.info && device.info.length > 0 && (
            <ul className="device-info-list">
              {device.info.map((item, index) => (
                <li key={index}>
                  <strong>{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
