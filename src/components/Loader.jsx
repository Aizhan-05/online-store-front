import "../assets/css/style.css";

export default function Loader({ isFullPage = false }) {
  return (
    <div className={isFullPage ? "loader-overlay" : "sm-loader-container"}>
      <span className={isFullPage ? "loader" : "sm-loader"}></span>
    </div>
  );
}
