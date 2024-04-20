import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Error.jsx";
import Home from "./components/Home.jsx";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./components/ProductDetails.jsx";
import Admin from "./components/admin/Admin.jsx";
import Role from "./components/admin/role/Role.jsx";
import User from "./components/admin/user/User.jsx";
import Category from "./components/admin/category/Category.jsx";
import Product from "./components/admin/product/Product.jsx";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { element: <ProductDetails />, path: "product/:id" },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "role", element: <Role /> },
      { path: "user", element: <User /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
