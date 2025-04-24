import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Payout from "../routes/payout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//configuração das rotas por meio do React-Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "payout",
    element: <Payout />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
