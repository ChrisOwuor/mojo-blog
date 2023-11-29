import React from "react";
import log from "../assets/log.png";
import { NavLink } from "react-router-dom";
export default function required() {
  return (
    <div className=" w-full ">
      <div className="img w-full lg:w-5/6 mx-auto flex justify-center">
        <p className="font-semibold text-lg text-primary">
          <NavLink to={"/login"}>Login to create A blog</NavLink>
        </p>
      </div>
      <div className="img w-full lg:w-5/6 mx-auto flex justify-center">
        <img src={log} alt="w" className="lg:w-2/6 w-5/6" />
      </div>
    </div>
  );
}
