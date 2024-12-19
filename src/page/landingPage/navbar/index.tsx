"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import ButtonCustom from "@/component/atoms/button/button";
import logo from "@/assets/png/logo.png"
import {  useDispatch, useSelector } from "react-redux";
import { setIsOpenLogin, setIsOpenSignup } from "@/store/client/login_register";
import { RootState } from "@/store";
import Login from "@/component/login";
import Signup from "@/component/signup";


const tools = [
  {
    name: "View & edit PDF",
    description: "Alow edit PDF file from your storage",
    href: "#",
    icon: PencilSquareIcon,
  },
  {
    name: "PDF conversion",
    description: "Convert PDF file to HTML, Word or other files...",
    href: "#",
    icon:ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];



export default function NavbarLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch()  
  const isOpenLogin = useSelector((state:RootState) => state.modalLogin_Signup.isOpenLogin)
  const isOpenSignup = useSelector((state:RootState) => state.modalLogin_Signup.isOpenSignup)

  const handleOpenLogin = () => {
    dispatch(setIsOpenLogin(true)); // Mở modal
  };
  const handleOpenSignup = () => {
    dispatch(setIsOpenSignup(true)); // Mở modal
  };
  return (
    <header className="bg-white fixed right-0 left-0 top-0">
      <nav
        aria-label="Global"
        className="mx-auto flex w-full items-center justify-between p-3 lg:px-8 shadow-lg"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src={logo}
              className="h-14 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
          {/* this navbar appear when your screen is greater than 1024px (>= 1024px) */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Tools
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {tools.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Technology
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            About us
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Company
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <span
            className="text-sm py-3 px-8 font-semibold me-2"
            onClick={() => handleOpenLogin()}
            style={{
              padding: "0.5rem 1.5rem",
              borderLeft: "1px solid",
              borderColor: "rgb(196, 196, 196)",
            }}
          >
            Login
          </span>

          <ButtonCustom
            className="text-sm p-3"
            padding="0.5rem 1rem"
            fontWeight="600"
            onClick={() => handleOpenSignup()}
          >
            Try it for free &rarr;
          </ButtonCustom>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >

        {/* navbar in equal to or less than 768p (<= 768px) */}
        <div className="fixed inset-0 z-10" />
        <DialogPanel className={`fixed  right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6  lg:ring-1 lg:ring-gray-900/10 
           ${isOpenLogin || isOpenSignup ? "" : "inset-y-0"}`}>
          <div className="flex items-center justify-between">
            <Link to="#" className="-m-1.5 p-1.5">
              <img
              alt="LOGO"
              src={logo}
              className="h-14 w-auto "
            />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Tools
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...tools, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Technology
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  About us
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <span className="text-sm p-3 font-semibold"
                onClick={() =>handleOpenLogin()}
                >Login</span>
                <ButtonCustom
                  className="text-sm p-3"
                  padding="0.5rem 1rem"
                  fontWeight="600"
                  onClick={() => handleOpenSignup()}
                >
                  Try it for free <span aria-hidden="true">&rarr;</span>
                </ButtonCustom>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {/* {
        isOpenLogin && <Login/>
      }
      {
        isOpenSignup && <Signup/>
      } */}
    </header>
  );
}
