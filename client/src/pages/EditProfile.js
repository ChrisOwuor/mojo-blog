import React, { useState } from "react";
import { TEInput } from "tw-elements-react";
import { TextareaAutosize } from "@mui/base";

export default function EditProfile() {
  const [active, setActive] = useState("name");
  const activate = (item) => {
    setActive(item);
  };
  return (
    <div className="w-full ">
      <h1 className="text-center text-2xl font-semibold">Account Settings</h1>
      <hr />
      <div className=" grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 lg:gap-8  sm:p-12 sm:w-full lg:w-5/6 w-full lg:mx-auto ">
        <div className="profile col-span-1 lg:h-48 h-full w-full lg:mb-0  px-5 ">
          <div className="menu py-1 px-2 space-y-4 w-full mb-5" >
            <p
              className="bg-slate-300 rounded-lg px-4 py-1 w-full cursor-pointer "
              onClick={() => {
                activate("profile");
              }}
            >
              Profile Picture
            </p>
            <p
              className="bg-slate-300 rounded-lg px-4 py-1 w-full cursor-pointer "
              onClick={() => {
                activate("name");
              }}
            >
              user name{" "}
            </p>
            <p
              className="bg-slate-300 rounded-lg px-4 py-1 w-full cursor-pointer "
              onClick={() => {
                activate("bio");
              }}
            >
              My Bio
            </p>
            <p
              className="bg-slate-300 rounded-lg px-4 py-1 w-full cursor-pointer "
              onClick={() => {
                activate("email");
              }}
            >
              Email
            </p>
            <p
              className="bg-slate-300 rounded-lg px-4 py-1 w-full cursor-pointer "
              onClick={() => {
                activate("phone");
              }}
            >
              Phone
            </p>
            <p
              className="bg-slate-300 rounded-lg px-4 py-1 w-full cursor-pointer "
              onClick={() => {
                activate("security");
              }}
            >
              Security
            </p>

            <p
              className="bg-slate-300 rounded-lg px-4 py-1 w-full cursor-pointer "
              onClick={() => {
                activate("info");
              }}
            >
              Personal Info{" "}
            </p>
          </div>
        </div>
        <div className="main col-span-2  ">
          <div className="personal  px-5">
            {active === "profile" && (
              <div className="content  mb-4 rounded-lg w-full bg-white lg:shadow-xl border-blue-400 border-t  ">
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    Set up Your Profile Picture{" "}
                  </h1>
                  <div className="in  w-full lg:w-3/5">
                    <TEInput
                      type="text"
                      id="exampleFormControlInput1"
                      label="user name"
                    ></TEInput>{" "}
                  </div>
                </div>
                <div className="footer flex justify-end mt-2 p-3">
                  <button className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "name" && (
              <div className="content  mb-4 rounded-lg w-full bg-white lg:shadow-xl  border-t ">
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    UserName
                  </h1>
                  <p className="mt-3 mb-4 text-gray-500">
                    Please Enter your full name{" "}
                  </p>
                  <div className="in  w-full lg:w-3/5">
                    <TEInput
                      type="text"
                      id="exampleFormControlInput1"
                      label="user name"
                    ></TEInput>{" "}
                  </div>
                </div>
                <div className="footer flex justify-end bg-gray-100 mt-2 p-3">
                  <button className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "email" && (
              <div
                className={`content  mb-5 rounded-lg w-full  bg-white lg:shadow-xl  border-t `}
              >
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">Email</h1>
                  <p className="mt-3 mb-4 text-gray-500">
                    Please Enter A valid email{" "}
                  </p>
                  <div className="in  w-full lg:w-3/5">
                    <TEInput
                      type="email"
                      id="exampleFormControlInput1"
                      label="email"
                    ></TEInput>{" "}
                  </div>
                </div>
                <div className="footer flex justify-end bg-gray-100 mt-2 p-3">
                  <button className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "phone" && (
              <div
                className={`content  mb-5 rounded-lg w-full  bg-white lg:shadow-xl  border-t `}
              >
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    Phone Number
                  </h1>
                  <p className="mt-3 mb-4 text-gray-500">
                    Please Enter Phone Number
                  </p>
                  <div className="in  w-full lg:w-3/5">
                    <TEInput
                      type="number"
                      id="exampleFormControlInput1"
                      label="phone number"
                    ></TEInput>{" "}
                  </div>
                </div>
                <div className="footer flex justify-end bg-gray-100 mt-2 p-3">
                  <button className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "info" && (
              <div className="content bg-white lg:shadow-xl  border-t rounded-lg w-full  mb-5 ">
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    Personal Information
                  </h1>
                  <div className="in  w-full space-y-3 lg:w-3/5">
                    <TEInput
                      type="number"
                      id="exampleFormControlInput1"
                      label="age"
                    ></TEInput>{" "}
                    <TEInput
                      type="text"
                      id="exampleFormControlInput1"
                      label="Country"
                    ></TEInput>{" "}
                    <TEInput
                      type="text"
                      id="exampleFormControlInput1"
                      label="Gender"
                    ></TEInput>{" "}
                  </div>
                </div>

                <div className="footer flex justify-end bg-gray-100 mt-2 p-3">
                  <button className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "bio" && (
              <div className="content  mb-5 rounded-lg w-full  bg-white lg:shadow-xl  border-t ">
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    About Me
                  </h1>
                  <p className="mt-3 mb-4 text-gray-500">
                    Please Enter your bio
                  </p>
                  <div className="in  w-full ">
                    <TextareaAutosize
                      id="comment"
                      minRows={5}
                      className="px-0 h-max  w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write your bio "
                    />
                  </div>
                </div>
                <div className="footer flex justify-end bg-gray-100 mt-2 p-3">
                  <button className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
          <>
            {active === "security" && (
              <div className="password mt-5 px-5 ">
                <div className="content  bg-white lg:shadow-xl  border-t rounded-lg w-full   mb-5  ">
                  <div className="p-4">
                    {" "}
                    <h1 className="font-semibold text-black text-lg ">
                      Update Password
                    </h1>
                    <p className="mt-3 mb-4 text-gray-500">
                      Please Enter Your old password
                    </p>
                    <div className="in  w-full lg:w-3/5">
                      <TEInput
                        type="text"
                        id="exampleFormControlInput1"
                        label="old password"
                      ></TEInput>{" "}
                    </div>
                    <p className="mt-3 mb-4 text-gray-500">
                      Please Enter Your new password
                    </p>
                    <div className="in  w-full lg:w-3/5">
                      <TEInput
                        type="text"
                        id="exampleFormControlInput1"
                        label="new password"
                      ></TEInput>{" "}
                    </div>
                  </div>
                  <div className="footer flex justify-end bg-gray-100 mt-2 p-3">
                    <button className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white">
                      update password
                    </button>
                  </div>
                </div>{" "}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
