
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {  toast } from "react-toastify";
import ButtonCustom from "@/component/atoms/button/button";
import InputCustom from "@/component/atoms/input/input";
import { PRIMARY, WHITE } from "@/helper/colors";
import { handleSignupApi } from "@/service/signup";


function ModalSignUp() {
  
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [checkError, setCheckError] = useState(false)
    const [helperTextErrorEmail, setHelperTextErrorEmail] = useState('')
    const [helperTextErrorPasswordAll, setHelperTextErrorPasswordAll] = useState('')
    const [helperTextErrorUsername, setHelperTextErrorUsername] = useState('')
    const [helperTextErrorPassword1, setHelperTextErrorPassword1] = useState('')
    const [helperTextErrorPassword2, setHelperTextErrorPassword2] = useState('')

  const handleRegister = async () => {
        let res = await handleSignupApi(email, username, password1 , password2)
        console.log('check res signup: ', res)
        let errors = res.errors;
        if (res.success === true) {
          toast.success(res.message)
          setEmail('');
          setUserName('');
          setPassword1('');
          setPassword2('');
          navigate("/login"); 
        } else {
          toast.error(res.message)
          setCheckError(true)
          setHelperTextErrorEmail(errors?.email || '')
          setHelperTextErrorUsername(errors?.username || '')
          setHelperTextErrorPasswordAll(errors?.__all__ || '')
          setHelperTextErrorPassword1(errors?.password1 || '')
          setHelperTextErrorPassword2(errors?.password2 || '')
        }
  }
    
    return(
        <div className="w-full border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Sign up
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Nếu bạn chưa có tài khoản, hãy tạo tài khoản tại đây
                </p>
              </div>

              <div className="relative flex items-center">
                <InputCustom
                  label="Email address"
                  error={checkError}
                  value={email}
                  helperText={helperTextErrorEmail}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={username}
                  helperText={helperTextErrorUsername}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  style={{
                    width: "100%",
                  }}
                />
              </div> 
              <div className="relative flex items-center">
                <InputCustom
                  label="Password"
                  error={checkError}
                  value={password1}
                  helperText={helperTextErrorPasswordAll ? helperTextErrorPasswordAll : helperTextErrorPassword1}
                  onChange={(e) => setPassword1(e.target.value)}
                  type="password"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            
              <div className="relative flex items-center">
                <InputCustom
                  label="Confirm password"
                  value={password2}
                  error={checkError}
                  helperText={helperTextErrorPasswordAll ? helperTextErrorPasswordAll : helperTextErrorPassword2}
                  onChange={(e) => setPassword2(e.target.value)}
                  type="password"
                  style={{
                    width: "100%",
                  }}
                />
              </div>   
              <div className="mt-8 flex flex-col justify-center">
                <ButtonCustom
                  fontWeight="600"
                  onClick={() => handleRegister()}
                >
                  Đăng ký
                </ButtonCustom>
              </div>

              <p className="text-sm mt-8 text-center text-gray-800">
                Đã có tài khoản ?
                <Link
                  to="/login"
                  style={{ color: PRIMARY.MEDIUM }}
                  className=" font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Đăng nhập tại đây
                </Link>
              </p>
            </form>
          </div>
    )
}

export default ModalSignUp;