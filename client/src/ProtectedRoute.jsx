import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ component : Component }) => {
  /* const Component = component; canwrite like this */
  const token = Cookies.get("token");

  if (token !== undefined) {
    return <Component />;
  }
  return <Navigate to={"/login"} />;
};

export default ProtectedRoute;
