import NavbarLandingPage from "./navbar";
import { Slide } from "./slide";
import ButtonCustom from "@/component/atoms/button/button";
import mainSlider from "@/assets/svg/mainSlider_right.svg";
import { PRIMARY } from "@/helper/colors";

import { Data } from "./data";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenSignup, setIsOpenLogin } from "@/store/client/login_register";
import { RootState } from "@/store";
import Signup from "@/component/specific/signup";
import Login from "@/component/specific/login";

// hiển thị landing page (trang khách) trước khi đăng nhập
function LandingPage() {
  const DataSlider = Data;
  const dispatch = useDispatch();
  const isOpenSignup = useSelector(
    (state: RootState) => state.modalLogin_Signup.isOpenSignup
  );
  const isOpenLogin = useSelector(
    (state: RootState) => state.modalLogin_Signup.isOpenLogin
  );

  const handleOpenSignup = () => {
    dispatch(setIsOpenSignup(true)); // Mở modal signup
  };
  const handleEnterOpacity = () => {
    dispatch(setIsOpenSignup(false));
    dispatch(setIsOpenLogin(false));
  };
  return (
    <div>
      <NavbarLandingPage />
      <div className="landing-page-container md:px-10 mt-28">
        <Slide
          // Slide là 1 reuseable component
          leftChildren={
            <div className="text-center">
              <h1 className="font-black md:text-6xl text-4xl md:pe-16 md:text-left mb-5">
                We make PDF processing easier.
              </h1>
              <p className="md:text-2xl text-xl text-slate-500 md:text-left mb-4">
                All the tools you need to work smarter and more efficiently with
                documents.
              </p>
              <div className="lg:flex justify-between  ">
                <ButtonCustom
                  className="w-full lg:me-2 mb-2 lg:mb-0"
                  fontWeight="600"
                >
                  Explore all PDF tools
                </ButtonCustom>
                <button
                  className=" hover:text-white w-full font-bold border  px-4 py-4 rounded-md"
                  style={{
                    color: `${PRIMARY.MEDIUM}`,
                    borderColor: `${PRIMARY.MEDIUM}`,
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = PRIMARY.DARK;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = PRIMARY.MEDIUM;
                  }}
                  onClick={() => handleOpenSignup()}
                >
                  Try it for free &rarr;
                </button>
              </div>
            </div>
          }
          rightChildren={
            <>
              <img
                className="w-auto"
                alt="mainSlider"
                src={mainSlider}
                style={{ height: "420px" }}
              />
            </>
          }
        />
        {DataSlider.map((item) => (
          <Slide
            key={item.id}
            leftChildren={
              <div>
                <div className="font-bold text-2xl mb-2">{item.tittle}</div>
                <p className=" text-slate-800 font-medium mb-4">
                  {item.description}
                </p>
                <div
                  className="hover:underline"
                  style={{
                    color: `${PRIMARY.MEDIUM}`,
                  }}
                >
                  {item.link}
                </div>
              </div>
            }
            rightChildren={
              <>
                <img
                  className="w-auto object-cover"
                  alt="mainSlider"
                  src={item.image}
                  style={{ height: "400px" }}
                />
              </>
            }
          />
        ))}
      </div>
      {isOpenSignup && <Signup />}
      {isOpenLogin && <Login/>}
      {isOpenLogin || isOpenSignup ? (
        <div
          className="hidden z-0 lg:block lg:fixed lg:inset-y-0 lg:inset-x-0 bg-black opacity-70"
          onClick={() => handleEnterOpacity()}
        ></div>
      ) : null}
    </div>
  );
}

export default LandingPage;
