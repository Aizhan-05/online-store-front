import { useState, useEffect } from "react";
import DeviceCard from "./DeviceCard";

export default function DevicesGrid({ brandId, typeId }) {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDevices() {
      try {
        setIsLoading(true);

        let url = `https://online-store-backend-alpha.onrender.com/api/device?page=1&limit=10`;

        if (brandId || typeId) {
          const params = new URLSearchParams();
          if (brandId) params.append("brandId", brandId);
          if (typeId) params.append("typeId", typeId);
          url = `https://online-store-backend-alpha.onrender.com/api/device?${params.toString()}&page=1&limit=10`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setDevices(data.data.devices.rows);
      } catch (error) {
        console.error("Ошибка при загрузке устройств", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDevices();
  }, [brandId, typeId]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  if (devices.length === 0) return <p>Устройства не найдены.</p>;

  return (
    <div className="device">
      {devices.map(device => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
}
