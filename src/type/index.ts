export interface ApiLoginResponse {
    success: boolean;
    message: string;
    access?:string;
    refresh?:string;
}

interface ValidateSignup{
  email:string;
  username:string;
  __all__?:string;
  password1:string;
  password2:string;

}

export interface ApiSignupResponse {
  success: boolean;
  message: string;
  errors?: ValidateSignup  
}  