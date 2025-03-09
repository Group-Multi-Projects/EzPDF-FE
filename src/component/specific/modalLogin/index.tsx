import { Link } from "react-router-dom";
import ButtonCustom from "@/component/atoms/button/button";
import InputCustom from "@/component/atoms/input/input";
import { PRIMARY, WHITE } from "@/helper/colors";
import { useState } from "react";
import { handleLoginApi } from "@/service/login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/store/auth_slice";
import Cookies from "js-cookie";
import { setIsOpenSignup, setIsOpenLogin } from "@/store/client/login_register";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
// import { useAuth } from "@/hooks/useAth";

 function ModalLogin() {
  const dispatch:AppDispatch = useDispatch()
  let navigate = useNavigate();
  const [email_login, setemail_login] = useState("");
  const [password_login, setpassword_login] = useState("");
  const [checkError, setCheckError] = useState(false);

  // const {loginContext} = useAuth()

  const handleLogin = async () => {
    try {
      // Gửi action loginUser
      const resultAction = await dispatch(
        loginUser({ email_login, password_login })
      );
    
      // Kiểm tra nếu kết quả là fulfilled
      const data = resultAction as ReturnType<typeof loginUser.fulfilled>;
    
      const access_token = data.payload?.access;
    
      if (data.payload?.success) {
        toast.success("Login successfully");
        Cookies.set("accessToken", access_token ?? "", { expires: 365 });
        navigate('/home')
      } else {
        toast.error(data.payload?.message || "Đăng nhập thất bại");
        setCheckError(true);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      console.error("Login error:", error);
      setCheckError(true);
    }
  } 

  const handleOpenSignup = () =>{
    dispatch(setIsOpenSignup(true))
    dispatch(setIsOpenLogin(false))
  }

  return (
    <div className="max-w-sm">
      <form className="space-y-4">
        <div className="mb-8">
          <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            Log in to your account and explore our helpful tools. Your journey
            starts here.
          </p>
        </div>

        <div className="relative flex items-center">
          <InputCustom
            label="Email or phone number"
            type="text"
            value={email_login}
            error={checkError}
            onChange={(e) => setemail_login(e.target.value)}
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="relative flex items-center">
          <InputCustom
            label="Password"
            type="password"
            value={password_login}
            error={checkError}
            onChange={(e) => setpassword_login(e.target.value)}
            style={{
              width: "100%",
            }}
          />
        </div>

        <div className="mt-8 flex flex-col justify-center">
          <ButtonCustom fontWeight="600" onClick={() => handleLogin()}>
            Sign in
          </ButtonCustom>
        </div>

        <p className="text-sm mt-8 text-center text-gray-800">
          Don't have an account
          <Link
            to=''
            style={{ color: PRIMARY.MEDIUM }}
            className=" font-semibold hover:underline ml-1 whitespace-nowrap"
            onClick={() => handleOpenSignup()}
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ModalLogin;
