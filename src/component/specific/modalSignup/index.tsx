import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonCustom from "@/component/atoms/button/button";
import InputCustom from "@/component/atoms/input/input";
import { PRIMARY, WHITE } from "@/helper/colors";
import { setIsOpenSignup, setIsOpenLogin } from "@/store/client/login_register";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { registerUser } from "@/store/auth_slice";
import { AppDispatch } from "@/store";
import apiService from "@/service";

function ModalSignUp() {
  let dispatch = useDispatch<AppDispatch>();
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    phone: "",
    username: "",
  });

  const [checkError, setCheckError] = useState(false);
  const [helperTextErrorEmail, setHelperTextErrorEmail] = useState("");
  const [helperTextErrorPasswordAll, setHelperTextErrorPasswordAll] =
    useState("");
  const [helperTextErrorUsername, setHelperTextErrorUsername] = useState("");
  const [helperTextErrorPassword1, setHelperTextErrorPassword1] = useState("");

  const handleOpenLogin = () => {
    dispatch(setIsOpenSignup(false));
    dispatch(setIsOpenLogin(true));
  };
  const handleRegister = async () => {
    try {
      let data = await apiService.auth.register(signupValues)
      const {EC, EM} = data.data
      if (EC === 0) {
        message.success(EM);
        dispatch(setIsOpenSignup(false));
      } else {
        message.error(EM);
        setCheckError(true);
      }
    } catch (error) {
      message.error("Please try again the system !");
      console.error("Signup error:", error);
      setCheckError(true);
    }
  };

  return (
    <div className="max-w-sm w-full">
      <form className="space-y-4">
        <div className="mb-8">
          <h3 className="text-gray-800 text-3xl font-extrabold">Đăng ký</h3>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            Nếu bạn không có tài khoản, hãy tạo nó ở đây!
          </p>
        </div>
        <div className="relative flex items-center">
          <InputCustom
            label="Email "
            error={checkError}
            value={signupValues.email}
            helperText={helperTextErrorEmail}
            onChange={(e) =>
              setSignupValues((prev) => ({ ...prev, email: e.target.value }))
            }
            type="text"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="relative flex items-center">
          <InputCustom
            label="Tên người dùng"
            error={checkError}
            value={signupValues.username}
            helperText={helperTextErrorUsername}
            onChange={(e) =>
              setSignupValues((prev) => ({ ...prev, username: e.target.value }))
            }
            type="text"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="relative flex items-center">
          <InputCustom
            label="Số điện thoại"
            error={checkError}
            value={signupValues.phone}
            onChange={(e) =>
              setSignupValues((prev) => ({ ...prev, phone: e.target.value }))
            }
            type="text"
            style={{
              width: "100%",
            }}
          />
        </div>{" "}
        <div className="relative flex items-center">
          <InputCustom
            label="Mật khẩu"
            error={checkError}
            value={signupValues.password}
            helperText={
              helperTextErrorPasswordAll
                ? helperTextErrorPasswordAll
                : helperTextErrorPassword1
            }
            onChange={(e) =>
              setSignupValues((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="mt-8 flex flex-col justify-center">
          <ButtonCustom fontWeight="600" onClick={() => handleRegister()}>
            Đăng ký
          </ButtonCustom>
        </div>
        <p className="text-sm mt-8 text-center text-gray-800">
          Bạn đã có tài khoản ?
          <Link
            to=""
            style={{ color: PRIMARY.MEDIUM }}
            className=" font-semibold hover:underline ml-1 whitespace-nowrap"
            onClick={() => handleOpenLogin()}
          >
            Đăng nhập tại đây
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ModalSignUp;
