import AppRoutes from "./components/AppRoutes/AppRoutes";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  return (
    <div>
      <AuthContext>
        <AppRoutes />
      </AuthContext>
    </div>
  );
}

export default App;
