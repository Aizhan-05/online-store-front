import { Link } from "react-router";

export default function ProductCard({ id, title, price, image }) {
  return (
    <Link to={`/products/${id}`} className="product-item">
      <div className="product-img">
        <img src={image} alt={title} />
      </div>
      <div className="product-info">
        <h6 className="product-item-title">{title}</h6>
        <span className="product-price">{price}</span>
      </div>
    </Link>
  );
}
