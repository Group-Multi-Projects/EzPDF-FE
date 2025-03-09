
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import {  setIsOpenSignup } from "@/store/client/login_register";

import { RootState } from "@/store";
import ModalSignUp from "../specific/modalSignup";
const Signup = () => {

  const dispatch = useDispatch()
  const isOpenSignup = useSelector((state:RootState) => state.modalLogin_Signup.isOpenSignup)

  const handleCloseSignup = () => {
    dispatch(setIsOpenSignup(false)); // Close modal signup
  };
  return (
    <div className="fixed top-0 right-0 grid inset-y-0 z-10 w-full lg:w-[90%] place-items-center bg-white ">
    <div className="fixed right-0 top-0 m-5 ">
      <XMarkIcon 
      className="size-7"
      onClick={() => handleCloseSignup()}
      />
    </div>
    <ModalSignUp/>
</div>
  );
};

export default Signup;

