import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenLogin } from "@/store/client/login_register";
import { RootState } from "@/store";
import ModalLogin from "../modalLogin";
const Login = () => {
  const dispatch = useDispatch();
  const isOpenLogin = useSelector(
    (state: RootState) => state.modalLogin_Signup.isOpenLogin
  );
  const handleCloseLogin = () => {
    dispatch(setIsOpenLogin(false)); // Close modal login
  };
  return (
    <div
      className={`fixed top-0 right-0 z-10 grid min-h-screen place-items-center bg-white  ${
        isOpenLogin ? "w-full lg:w-[90%]" : "w-0"
      } `}
      style={{transition:'0.3s'}}
    >
      <div className="fixed right-0 top-0 m-5 ">
        <XMarkIcon onClick={() => handleCloseLogin()} className="size-7" />
      </div>
      <ModalLogin />
    </div>
  );
};

export default Login;
