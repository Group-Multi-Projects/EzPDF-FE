import { Link } from "react-router-dom";
import ButtonCustom from "@/component/atoms/button/button";
import InputCustom from "@/component/atoms/input/input";
import { PRIMARY, WHITE } from "@/helper/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setIsOpenSignup, setIsOpenLogin } from "@/store/client/login_register";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import apiService from "@/service";
import { message } from "antd";
import { loginUser } from "@/store/auth_slice";
// import { useAuth } from "@/hooks/useAth";

function ModalLogin() {
  const dispatch: AppDispatch = useDispatch();
  let navigate = useNavigate();
  const [login, setLogin] = useState({
    valueLogin: "",
    valuePassword: "",
  });
  const [checkError, setCheckError] = useState(false);

  const handleLogin = async () => {
    try {
      let res = await dispatch(loginUser(login));
      let result = res as ReturnType<typeof loginUser.fulfilled>;
      let data = result.payload.access;
      let access_token = data.DT.access_token;

      if (data?.EC === 0) {
        message.success(data.EM);
        Cookies.set("accessToken", access_token ?? "", { expires: 365 });

        dispatch(setIsOpenLogin(false));
        navigate("/home");
      } else {
        message.error(data.EM);
        setCheckError(true);
      }
    } catch (error) {
      message.error("Please try your network!");
      console.error("Login error:", error);
      setCheckError(true);
    }
  };

  const handleOpenSignup = () => {
    dispatch(setIsOpenSignup(true));
    dispatch(setIsOpenLogin(false));
  };

  return (
    <div className="max-w-sm">
      <form className="space-y-4">
        <div className="mb-8">
          <h3 className="text-gray-800 text-3xl font-extrabold">Đăng nhập</h3>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            Đăng nhập vào tài khoản của bạn và khám phá các công cụ hữu ích của
            chúng tôi. Hành trình của bạn bắt đầu từ đây.
          </p>
        </div>

        <div className="relative flex items-center">
          <InputCustom
            label="Email hoặc Số điện thoại"
            type="text"
            value={login.valueLogin}
            error={checkError}
            onChange={(e) =>
              setLogin((prev) => ({ ...prev, valueLogin: e.target.value }))
            }
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="relative flex items-center">
          <InputCustom
            label="Mật khẩu"
            type="password"
            value={login.valuePassword}
            error={checkError}
            onChange={(e) =>
              setLogin((prev) => ({ ...prev, valuePassword: e.target.value }))
            }
            style={{
              width: "100%",
            }}
          />
        </div>

        <div className="mt-8 flex flex-col justify-center">
          <ButtonCustom fontWeight="600" onClick={() => handleLogin()}>
            Đăng nhập
          </ButtonCustom>
        </div>

        <p className="text-sm mt-8 text-center text-gray-800">
          Chưa có tài khoản ?
          <Link
            to=""
            style={{ color: PRIMARY.MEDIUM }}
            className=" font-semibold hover:underline ml-1 whitespace-nowrap"
            onClick={() => handleOpenSignup()}
          >
            Đăng ký tại đây
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ModalLogin;
