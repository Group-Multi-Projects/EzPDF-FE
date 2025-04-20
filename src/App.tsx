import AppRouter from "./router/AppRouter";
import { Toast } from "./toast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/auth_slice";
import Layout from "./component/layout/main/layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import './App.scss'

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setUser()); // Cập nhật user khi auth thay đổi
  }, [dispatch, isAuthenticated]); // Theo dõi isAuthenticated

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <Layout>
            <AppRouter />
            <Toast />
          </Layout>
        </>
      ) : (
        <>
          <AppRouter/>
          <Toast/>
        </>
      )}
    </div>
  );
}

export default App;
