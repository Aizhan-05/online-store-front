import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../services/axios";
import Loader from "../../components/Loader";
import DeviceCard from "../../components/DeviceCard";
import FilterControls from "../../components/FilterControls";

export default function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ brandId: null, typeId: null });
  const [showModal, setShowModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const user = useSelector(state => state.user?.user);

  // Загрузка устройств
  useEffect(() => {
    fetchDevices();
  }, [filters]);

  async function fetchDevices() {
    try {
      setLoading(true);
      const params = { page: 1, limit: 12 };
      if (filters.brandId) params.brandId = filters.brandId;
      if (filters.typeId) params.typeId = filters.typeId;

      const res = await axiosInstance.get("/device", { params });
      const data = res.data?.data?.devices?.rows || [];
      setDevices(data);
    } catch (error) {
      console.error("Ошибка при загрузке устройств:", error);
    } finally {
      setLoading(false);
    }
  }

  // Фильтры
  function handleFilter({ brandId, typeId }) {
    setFilters({ brandId, typeId });
  }

  // Добавление нового устройства
  async function handleAddDevice(formData) {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("brandId", formData.brandId);
      form.append("typeId", formData.typeId);
      form.append("img", formData.img);
      if (formData.info) form.append("info", JSON.stringify(formData.info));

      await axiosInstance.post("/device", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Устройство успешно добавлено!");
      fetchDevices();
    } catch (error) {
      console.error("Ошибка при добавлении устройства:", error);
      alert(error.response?.data?.message || "Ошибка при добавлении");
    } finally {
      setShowModal(false);
    }
  }

  // Обновление устройства
  async function handleUpdateDevice(formData) {
    try {
      const form = new FormData();
      if (formData.name) form.append("name", formData.name);
      if (formData.price) form.append("price", formData.price);
      if (formData.brandId) form.append("brandId", formData.brandId);
      if (formData.typeId) form.append("typeId", formData.typeId);
      if (formData.img) form.append("img", formData.img);
      if (formData.info) form.append("info", JSON.stringify(formData.info));

      await axiosInstance.put(`/device/${formData.id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Устройство обновлено!");
      fetchDevices();
    } catch (error) {
      console.error("Ошибка при обновлении устройства:", error);
    } finally {
      setEditingDevice(null);
      setShowModal(false);
    }
  }

  //  Удаление устройства
  async function handleDeleteDevice(id) {
    if (!window.confirm("Удалить это устройство?")) return;
    try {
      await axiosInstance.delete(`/device/${id}`);
      setDevices(prev => prev.filter(d => d.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении устройства:", error);
    }
  }

  return (
    <section id="devices-page" className="home-part popular">
      <div className="header">
        <h2 className="title">Каталог товаров</h2>

        {user?.role === "ADMIN" && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Добавить устройство
          </button>
        )}
      </div>

      <FilterControls onFilter={handleFilter} />

      {loading ? (
        <Loader />
      ) : devices.length === 0 ? (
        <p>Товары не найдены.</p>
      ) : (
        <div className="device">
          {devices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              user={user}
              onEdit={() => {
                setEditingDevice(device);
                setShowModal(true);
              }}
              onDelete={() => handleDeleteDevice(device.id)}
            />
          ))}
        </div>
      )}

      {/*  Модальное окно прямо здесь */}
      {showModal && (
        <ModalForm
          onClose={() => {
            setShowModal(false);
            setEditingDevice(null);
          }}
          onSubmit={editingDevice ? handleUpdateDevice : handleAddDevice}
          initialData={editingDevice}
        />
      )}
    </section>
  );
}

/* Встроенная форма ModalForm */

function ModalForm({ onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(
    initialData || { name: "", price: "", brandId: "", typeId: "", info: [] }
  );
  const [img, setImg] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setImg(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...form, img };
    if (initialData) data.id = initialData.id;
    onSubmit(data);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{initialData ? "Редактировать устройство" : "Добавить устройство"}</h3>
        <form onSubmit={handleSubmit} className="device-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Название"
            required
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Цена"
            required
          />
          <input
            name="brandId"
            value={form.brandId}
            onChange={handleChange}
            placeholder="ID бренда"
            required
          />
          <input
            name="typeId"
            value={form.typeId}
            onChange={handleChange}
            placeholder="ID типа"
            required
          />
          <input type="file" onChange={handleFileChange} />

          <textarea
            name="info"
            placeholder='[{"title":"Характеристика","description":"Описание"}]'
            value={JSON.stringify(form.info)}
            onChange={e => {
              try {
                const parsed = JSON.parse(e.target.value);
                setForm({ ...form, info: parsed });
              } catch {
                setForm({ ...form, info: [] });
              }
            }}
          />

          <div className="actions">
            <button type="submit" className="btn btn-success">
              Сохранить
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
