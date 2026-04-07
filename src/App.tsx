import "./App.css";
import ToastNotification from "./components/toast";
import MainRoutes from "./routing/mainRoutes";

function App() {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <MainRoutes />
      <ToastNotification />
    </div>
  );
}

export default App;
