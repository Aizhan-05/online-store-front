import { useState } from "react";
import FilterControls from "../../components/FilterControls";
import DevicesGrid from "../../components/DevicesGrid";

export default function DevicesPage() {
  const [filters, setFilters] = useState({ brandId: null, typeId: null });

  const handleFilterChange = newFilters => {
    setFilters(newFilters);
  };

  return (
    <div className="devices-page">
      <h1 className="title">Каталог товаров</h1>

      <FilterControls onFilter={handleFilterChange} />

      <DevicesGrid brandId={filters.brandId} typeId={filters.typeId} />
    </div>
  );
}
