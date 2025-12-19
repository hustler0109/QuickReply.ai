import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--toast-bg, #fff)",
          color: "var(--toast-text, #000)",
        },
      }}
    />
    <App />
  </React.StrictMode>
);