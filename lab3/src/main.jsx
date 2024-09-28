import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from 'react-router-dom'

import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.esm.js";
import "./index.css";
import router from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
