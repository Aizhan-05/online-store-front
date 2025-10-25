import { useState, useEffect } from "react";

export default function FilterControls({ onFilter }) {
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      const res = await fetch("https://online-store-backend-alpha.onrender.com/api/brand");
      const data = await res.json();
      setBrands(data);
    }

    async function fetchTypes() {
      const res = await fetch("https://online-store-backend-alpha.onrender.com/api/type");
      const data = await res.json();
      setTypes(data);
    }

    fetchBrands();
    fetchTypes();
  }, []);

  const handleApply = () => {
    onFilter({
      brandId: selectedBrand || null,
      typeId: selectedType || null,
    });
  };

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedType("");
    onFilter({ brandId: null, typeId: null });
  };

  return (
    <div className="filter-controls">
      <select
        value={selectedBrand}
        onChange={e => setSelectedBrand(e.target.value)}
        disabled={selectedType !== ""}
      >
        <option value="">Все бренды</option>
        {brands.map(brand => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={e => setSelectedType(e.target.value)}
        disabled={selectedBrand !== ""}
      >
        <option value="">Все типы</option>
        {types.map(type => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <button onClick={handleApply} disabled={!selectedBrand && !selectedType}>
        Отфильтровать
      </button>

      {(selectedBrand || selectedType) && (
        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Сбросить
        </button>
      )}
    </div>
  );
}
