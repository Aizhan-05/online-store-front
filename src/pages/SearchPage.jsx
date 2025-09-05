import { useSearchParams } from "react-router";
import ProductsGrid from "../components/ProductsGrid";

export default function SearchPage() {
  const [params] = useSearchParams();

  return (
    <section id="search">
      <h1 className="title">Результаты поиска</h1>
      <ProductsGrid searchQuery={params.get("query")} />
    </section>
  );
}
