import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import 'react-toastify/dist/ReactToastify.css';
import Protected from "./routes/protected";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Movies from "./pages/Movies";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/details/:id",
    element: (
      <Protected>
        <Details />
      </Protected>
    ),
  },
  {
    path: "/my-movies",
    element: (
      <Protected>
        <Movies />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
