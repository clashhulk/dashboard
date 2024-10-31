import "./App.css";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./utils/auth/ProtectedRoutes";
import Dashboard from "./views/admin/Dashboard";
import Login from "./views/login/Login";

export default function App() {
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    setAuth(true);
  }, []);

  return (
    <Routes basename="/">
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes auth={auth} />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}
