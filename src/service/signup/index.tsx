import axios from "@/config/axios"
import { ApiSignupResponse } from "@/type";

export const handleSignupApi = (
  email: string | number,
  username: string,
  password1: string | number,
  password2: string | number  
): Promise<ApiSignupResponse> => {
    return axios.post('/account/signup/', {
        email,
        username,
        password1,
        password2
    }
)
};

