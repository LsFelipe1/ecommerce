import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Payout from "../routes/payout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeliveryForm from "../routes/streetForm.jsx";
import CreditCard from "../routes/creditCard.jsx";

//configuração das rotas por meio do React-Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "payout",
    element: <Payout />,
    children: [
      {
        path: "delivery",
        element: <DeliveryForm />,
      },
      {
        path: "card-info",
        element: <CreditCard />,
      },
      {
        path: "summary",
        element: <DeliveryForm />,
      },
      {
        path: "payment",
        element: <DeliveryForm />,
      },
      {
        path: "tracking",
        element: <DeliveryForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
