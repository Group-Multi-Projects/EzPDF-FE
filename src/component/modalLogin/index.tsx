import { Link } from "react-router-dom";
import ButtonCustom from "@/component/atoms/button/button";
import InputCustom from "@/component/atoms/input/input";
import { PRIMARY, WHITE } from "@/helper/colors";
import { useState } from "react";
import { handleLoginApi } from "@/service/login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setIsOpenSignup, setIsOpenLogin } from "@/store/client/login_register";
import { useDispatch } from "react-redux";
// import { useAuth } from "@/hooks/useAth";
function ModalLogin() {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const [email_login, setemail_login] = useState("");
  const [password_login, setpassword_login] = useState("");
  const [checkError, setCheckError] = useState(false);

  // const {loginContext} = useAuth()

  const handleLogin = async () => {
      let response = await handleLoginApi(email_login, password_login);
      console.log("check res:", response);
      let access_token = response.access
      if (response.success === true) {
        toast.success('Đăng nhập thành công');
        Cookies.set('accessToken', access_token?? '' , { expires: 365 })
        navigate('/editPage')
      }
      else{
        toast.error(response.message)
        setCheckError(true)
      }
  };

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
