import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../public/App.jsx";
import Payout from "../routes/payout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeliveryForm from "../routes/delivery.jsx";
import CreditCard from "../routes/creditCard.jsx";
import Summary from "../routes/summary.jsx";
import Payment from "../routes/payment.jsx";
import Tracking from "../routes/tracking.jsx";
import SearchPage from "../routes/searchPage.jsx";
import CreateAccount from "../profile/createAccount.jsx";
import { AuthProvider } from "../backend/authContext.jsx";

//configuração das rotas por meio do React-Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/SingUp",
    element: <CreateAccount />,
  },
  {
    path: "/search",
    element: <SearchPage />,
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
        element: <Summary />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "tracking",
        element: <Tracking />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
