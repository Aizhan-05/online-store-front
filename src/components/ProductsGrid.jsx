import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const url = searchQuery
          ? `https://dummyjson.com/products/search?q=${searchQuery}`
          : `https://dummyjson.com/products?limit=12`;

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="products">
      {" "}
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={`$${product.price}`}
          image={product.thumbnail}
        />
      ))}
    </div>
  );
}
