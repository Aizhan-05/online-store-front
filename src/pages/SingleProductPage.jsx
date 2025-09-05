import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function SingleProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <section className="product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <h1 className="product-title">{product.title}</h1>

      <div className="product-content">
        <img src={product.thumbnail} alt={product.title} className="product-image" />

        <div className="product-info-block">
          <p className="product-price">${product.price}</p>
          <p className="product-brand">
            <b>Бренд: {product.brand}</b>
          </p>
          <p className="product-rating">
            <b>Рейтинг: {product.rating} </b> ⭐
          </p>
          <p className="product-description">{product.description}</p>

          {/* 👉 БЛОК ОТЗЫВОВ */}
          {product.reviews?.length > 0 && (
            <div className="reviews-list">
              <p className="reviews-text">
                <b>Отзывы о товаре:</b>
              </p>
              {product.reviews.map((r, idx) => (
                <div key={idx} className="review-card">
                  <p className="review-body">"{r.comment}"</p>
                  <div className="review-footer">
                    <span className="review-user">{r.reviewerName}</span>
                    <span className="review-rating">⭐ {r.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
