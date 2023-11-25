import { Fragment, useContext, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import mojo from "../assets/mojo.png";
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, NavLink } from "react-router-dom";
import ModalDialogScrollable from "./Modal";
import AuthContext from "../contexts/AuthContext";

const products = [
  {
    name: "Food",
    description: "Get a better understanding of your traffic",
    href: "/blogs/food",
    icon: ChartPieIcon,
  },
  {
    name: "Astronomy",
    description: "Speak directly to your customers",
    href: "/blogs/astronomy",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Nature",
    description: "Your customers’ data will be safe and secure",
    href: "/blogs/nature",
    icon: FingerPrintIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { logoutUser, user, data, loadingPage } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className=" w-full flex justify-center mb-8  z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between container lg:w-5/6 w-full px-6 p-4 lg:p-2 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="lg:h-8 h-8 w-auto " src={mojo} alt="" />
          </NavLink>
        </div>
        <div className="flex lg:hidden gap-3">
          <ModalDialogScrollable />

          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return (
                "text-2xl font-semibold leading-6  px-1 py-1 " +
                (isActive
                  ? "bg-blue-100 text-blue-800 rounded-md"
                  : "text-gray-900")
              );
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) => {
              return (
                "text-2xl font-semibold leading-6 px-1 py-1 " +
                (isActive
                  ? "bg-blue-100 text-blue-800 rounded-md "
                  : "text-gray-900")
              );
            }}
          >
            Blogs{" "}
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) => {
              return (
                "text-2xl font-semibold leading-6 px-1 py-1 " +
                (isActive
                  ? "bg-blue-100 text-blue-800 rounded-md "
                  : "text-gray-900")
              );
            }}
          >
            Write{" "}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return (
                "text-2xl font-semibold leading-6  px-1 py-1 " +
                (isActive
                  ? "bg-blue-100 text-blue-800 rounded-md"
                  : "text-gray-900")
              );
            }}
          >
            Our Story
          </NavLink>
          <p className="px-1 py-1 ">
            {" "}
            <ModalDialogScrollable />
          </p>{" "}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          {/* {user && (
            <p
              className="text-black 
                              rounded-md px-3 py-2 text-sm font-medium"
            >
              Welcome {user.user_name}
            </p>
          )} */}
          {user && (
            <NavLink to={`/profile/${user.user_id}/${user.user_name}`}>
              {!loadingPage && data && (
                <img
                  className="h-12 w-12 mx-auto rounded-full"
                  src={`http://127.0.0.1:8000/${data.user_info.image}`}
                  alt=""
                />
              )}
            </NavLink>
          )}
          {!user && (
            <NavLink
              to="/login"
              className="text-2xl font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </NavLink>
          )}
          {user && (
            <button
              onClick={logoutUser}
              className="text-lg font-semibold leading-6 text-black  rounded-md p-1"
            >
              LogOut
            </button>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        s
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 ">
              <span className="sr-only">Company logo</span>
              <img className=" h-8 w-auto" src={mojo} alt="" />
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {" "}
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>

                <NavLink
                  onClick={() => setMobileMenuOpen(false)}
                  to="/blogs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Blogs
                </NavLink>
                <NavLink
                  onClick={() => setMobileMenuOpen(false)}
                  to="/create"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Write
                </NavLink>
                <NavLink
                  onClick={() => setMobileMenuOpen(false)}
                  to="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Our Story
                </NavLink>
              </div>
              <div className="py-6">
                {user && (
                  <p
                    className="text-black  
                              rounded-md px-3 py-2 -mx-3 text-sm font-medium"
                  >
                    Welcome {user.user_name}
                  </p>
                )}
                {user && (
                  <p
                    className="text-black 
                              rounded-md px-3 py-2 text-sm font-medium"
                  >
                    <NavLink
                      to={`/profile/${user.user_id}/${user.user_name}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {!loadingPage && data && (
                        <img
                          className="h-12 w-12 ml-0 rounded-full"
                          src={`http://127.0.0.1:8000/${data.user_info.image}`}
                          alt=""
                        />
                      )}
                    </NavLink>
                  </p>
                )}{" "}
                {user ? (
                  <button onClick={logoutUser}>
                    {" "}
                    <p
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-black hover:bg-gray-700 
                              rounded-md w-max bg-primary-300 px-3 py-2 text-sm font-medium"
                    >
                      Logout{" "}
                    </p>
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    {" "}
                    <p
                      className="text-black hover:bg-gray-700 hover:text-white
                              rounded-md px-3 w-max py-2 text-sm font-medium bg-primary-300"
                    >
                      Login{" "}
                    </p>{" "}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
