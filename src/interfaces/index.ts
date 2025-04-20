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

export type ShapeType = "square" | "circle" | "triangle" | "star" | "text";


export interface IFieldData {
  fieldType: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  suffixIcon?: string;
  prefixIcon?: string;
  autoSize?: { minRows: number; maxRows: number };
  disabled?: boolean;
  defaultValue?: string;
  filters?: any;
  isShowTime?: boolean;
  countryField?: string;
  stateField?: string;
  style?: React.CSSProperties;
  className?: string;
  readonly?: boolean;
  required?: true | false | undefined;
  mode?: string;
  format?: string;
  isMulti?: boolean;
}