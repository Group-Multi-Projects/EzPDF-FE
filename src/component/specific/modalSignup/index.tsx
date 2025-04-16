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
      let res = await dispatch(registerUser(signupValues));
      let result = res as ReturnType<typeof registerUser.fulfilled>;
      let data = result.payload.access;
      if (data?.EC === 0) {
        message.success(data.EM);
        dispatch(setIsOpenSignup(false));
      } else {
        message.error(data.EM);
        setCheckError(true);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
      console.error("Signup error:", error);
      setCheckError(true);
    }
  };

  return (
    <div className="max-w-sm w-full">
      <form className="space-y-4">
        <div className="mb-8">
          <h3 className="text-gray-800 text-3xl font-extrabold">Sign up</h3>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            If you don't have account, let create it here !
          </p>
        </div>
        <div className="relative flex items-center">
          <InputCustom
            label="Email address"
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
            label="User name"
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
            label="Phone"
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
            label="Password"
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
            Sign up
          </ButtonCustom>
        </div>
        <p className="text-sm mt-8 text-center text-gray-800">
          Do you already have an account?
          <Link
            to=""
            style={{ color: PRIMARY.MEDIUM }}
            className=" font-semibold hover:underline ml-1 whitespace-nowrap"
            onClick={() => handleOpenLogin()}
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ModalSignUp;
