import { Link } from "react-router";

export default function DeviceCard({ device }) {
  if (!device) return null;

  const { id, name, img, price } = device;

  return (
    <Link to={`/device/${id}`} className="device-item">
      <div className="device-img">
        <img src={`https://online-store-backend-alpha.onrender.com/static/${img}`} alt={name} />
      </div>
      <div className="device-info">
        <h6 className="device-item-title">{name}</h6>
        <span className="device-price">{price} ₸</span>
      </div>
    </Link>
  );
}
