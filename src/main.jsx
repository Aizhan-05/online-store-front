import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import App from "./App.jsx";
import "./assets/css/style.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
