import imageLogin from "@/assets/svg/img1.svg"
import ModalSignUp from "@/component/modalSignup";
import { useLocation } from "react-router-dom";
const Signup = () => {
  let location = useLocation();
  console.log('pathname :', location.pathname)
  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full place-items-center">
            <ModalSignUp/>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src={imageLogin}
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
