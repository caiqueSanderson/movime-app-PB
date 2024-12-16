import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("@VITE_PRIVATE_TOKEN");
  const apiKey = localStorage.getItem("@VITE_PRIVATE_API_KEY");

  if (!token || !apiKey) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
