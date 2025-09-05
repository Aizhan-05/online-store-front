import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import SingleProductPage from "../pages/SingleProductPage";
import ReviewsPage from "./ReviewsPage";
import SearchPage from "../pages/SearchPage";
import SupportPage from "../pages/SupportPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import { useTheme } from "../providers/ThemeProvider";
import { useEffect } from "react";

export default function AppRouter() {
  const { isDark } = useTheme();

  useEffect(() => {
    document.body.style.background = isDark ? "#000" : "#fff";
  }, [isDark]);

  return (
    <main className={isDark ? "container dark" : "container"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}
