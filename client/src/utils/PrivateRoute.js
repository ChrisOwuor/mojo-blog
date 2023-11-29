import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Required from "../components/required";




const PrivateRoutes = () => {
  let { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Required/>;
};

export default PrivateRoutes;
