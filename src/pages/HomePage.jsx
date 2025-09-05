import { Link } from "react-router";
import { useEffect, useState } from "react";

const PRODUCT_LIMIT = 4;
const API_URL = `https://dummyjson.com/products?limit=${PRODUCT_LIMIT}`;

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="home">
      <div className="home-part intro">
        <h1 className="title">Добро пожаловать в Qaz Market</h1>
        <p className="home-text">
          Это учебный проект интернет-магазина, созданный в рамках изучения React. Все данные и
          товары представлены исключительно в демонстрационных целях.
        </p>
        <Link to="/products" className="home-btn">
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
          <div className="products">
            {products.map(({ id, title, thumbnail, price }) => (
              <Link to={`/products/${id}`} key={id} className="product-item">
                <div className="product-img">
                  <img src={thumbnail} alt={title} />
                </div>
                <div className="product-info">
                  <h6 className="product-item-title">{title}</h6>
                  <span className="product-price">${price}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
