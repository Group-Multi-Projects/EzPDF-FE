import axios from "@/config/axios"
import { ApiLoginResponse } from "@/type";

const handleLoginApi = (
  email_login: string | number,
  password_login: string | number
): Promise<ApiLoginResponse> => {
    return axios.post('/account/signin/', {
        email_login,
        password_login
    }
)
};

const handleLogout = () =>{
  return axios.post('/api/v1/logout')
}
export {handleLoginApi, handleLogout} ;