import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';
import Details from './pages/Details';
import Movies from './pages/Movies'
import NotFound from './pages/not-found';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/my-movies",
    element: <Movies />,
  },
  {
    path: "*",
    element: <NotFound />,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)