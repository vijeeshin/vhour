import AppRouter from "@/app/router/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { permissionsRequested } from "@/shared/store/permissionsSlice";
import useAuth from "@/shared/hooks/useAuth";

function App() {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(permissionsRequested());
  }, [isLoggedIn, dispatch]);

  return <AppRouter />;
}

export default App;
