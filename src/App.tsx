import "./App.css";
import ToastNotification from "./components/toast";
import AuthRoute from "./routing/authRoute";
import MainRoutes from "./routing/mainRoutes";
import { useSelector } from "react-redux";
import type { RootState } from "../src/redux/store";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      {isLoggedIn ? <MainRoutes /> : <AuthRoute />}
      <ToastNotification />
    </div>
  );
}

export default App;
