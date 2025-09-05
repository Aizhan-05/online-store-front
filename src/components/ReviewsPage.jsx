import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();

        const allReviews = [];

        data.products.forEach(product => {
          if (product.reviews && product.reviews.length > 0) {
            product.reviews.forEach(review => {
              allReviews.push({
                ...review,
                productId: product.id,
                productTitle: product.title,
              });
            });
          }
        });

        setReviews(allReviews);
      } catch (err) {
        console.error("Ошибка при загрузке отзывов:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <section className="reviews-page container">
      <h2 className="title">Отзывы</h2>

      <div className="reviews-list">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="review-card"
            onClick={() => navigate(`/products/${r.productId}`)}
            style={{ cursor: "pointer" }}
          >
            <p className="review-body">"{r.comment}"</p>
            <div className="review-footer">
              <span className="review-user">{r.reviewerName}</span>
              <span className="review-rating">⭐ {r.rating}</span>
            </div>
            <p className="review-product">
              <i>
                Отзыв к товару: <b>{r.productTitle} </b>
              </i>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
