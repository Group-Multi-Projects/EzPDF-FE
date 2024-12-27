import AppRouter from "./router/AppRouter";
import { Toast } from "./toast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/auth_slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Gọi action để cập nhật người dùng từ cookies
   let user = dispatch(setUser());
    console.log('user:', user)
  }, [dispatch]);
  return (
    <div className="App">
      <AppRouter/>
      <Toast/>
    </div>
  )
}

export default App;
