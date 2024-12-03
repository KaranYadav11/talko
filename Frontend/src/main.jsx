import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          },
          duration: 2000,
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
