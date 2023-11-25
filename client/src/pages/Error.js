import React from "react";
import Footer from "../components/Footer";
import svg from "../assets/404.svg"
import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <>
      <div className="mx-auto w- max-w-[598px] text-center px-4 sm:px-8 lg:px-0">
        <img
          src={svg}
          alt="404"
          className="w-1/2 mx-auto mb-12.5"
        />
        <h1 className="mb-5 text-heading-6 sm:text-heading-4 lg:text-heading-3 font-bold text-dark">
          Oops! Page Not Found.
        </h1>
        <p className="mb-7.5">
          The page you are looking for is not available or has been moved. Try a
          different page or go to homepage with the button below.
        </p>
        <NavLink
          to="/"
          className="inline-flex rounded-md py-3.5 px-6 text-white mt-3  mb-5 font-medium bg-black ease-in duration-300 hover:opacity-95"
        >
          Go To Home
        </NavLink>
      </div>
      <Footer />
    </>
  );
}
