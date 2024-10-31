import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const isAuth = props.auth;
  return isAuth ? <Outlet /> : <Navigate to={{ pathname: "/login" }} />;
};

// const ProtectedRoutes = ({ allowedRoles }) => {
//   var Suser = JSON.parse(localStorage.getItem("userIn"));
//   //   const isAuth = useAuth();
//   const location = useLocation();
//   return Suser &&
//     Suser.token &&
//     !isNaN(Suser.user.id) &&
//     allowedRoles.includes(Suser.user.roles[0].id) ? (
//     <Outlet />
//   ) : Suser && Suser.token && !isNaN(Suser.user.id) === true ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/" state={location.pathname} replace />
//   );
// };
// const ProtectedRoutes = () => {

//   return <></>;
// };

export default ProtectedRoutes;
