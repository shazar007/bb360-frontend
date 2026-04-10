import "./App.css";
import ToastNotification from "./components/toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../src/redux/store";

import MainRoutes from "./routing/mainRoutes";
import Login from "./pages/login";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/360-dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/360-dashboard" replace /> : <Login />
          }
        />

        <Route
          path="/*"
          element={
            isLoggedIn ? <MainRoutes /> : <Navigate to="/login" replace />
          }
        />
      </Routes>

      <ToastNotification />
    </div>
  );
}

export default App;
