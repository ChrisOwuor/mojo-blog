import React, { useState, useContext, useEffect } from "react";
import { TEInput } from "tw-elements-react";
import { TextareaAutosize } from "@mui/base";
import { useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

import { NavLink } from "react-router-dom";

export default function EditProfile() {
  const [image, setSelectedImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const { user_id } = useParams();
  const { AuthTokens, logoutUser } = useContext(AuthContext);
  const [active, setActive] = useState("profile");
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
    bio: "",
    age: "",
    country: "",
    gender: "",
    image: null,
    oldPassword: "",
    newPassword: "",
  });

  const updateData = async () => {
    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + String(AuthTokens.access),
      },
      body: form,
    };
    let endpoint = "";
    switch (active) {
      case "profile":
        endpoint = `/update_profile_picture/${user_id}/`;
        break;
      case "name":
        endpoint = `/update_user_name/${user_id}/`;
        break;
      case "email":
        endpoint = `/update_email/${user_id}/`;
        break;
      case "phone":
        endpoint = `/update_phone/${user_id}/`;
        break;
      case "info":
        endpoint = `/update_personal_info/${user_id}/`;
        break;
      case "bio":
        endpoint = `/update_my_bio/${user_id}/`;
        break;
      case "security":
        endpoint = `/update_security/${user_id}/`;
        break;
      default:
        break;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL + "/profiles" + endpoint}`,
        requestOptions
      );

      if (response.ok) {
        console.log(`Data updated successfully for ${active}`);
      } else {
        console.error(`Failed to update data for ${active}`);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const [data_p, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let getBlogs = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL + "/auth/profile/  " + user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(AuthTokens.access),
        },
      }
    );
    let data_p = await response.json();

    if (response.status === 200) {
      setData(data_p);
      setLoading(false);
    } else if (response.statusText === "Unauthorized") {
      setError(error);
      setLoading(false);
      logoutUser();
    }
  };

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const activate = (item) => {
    setActive(item);
  };
  const handleImageChange = async (event) => {
    const file = await event.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));

    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
    }
  };

  return (
    <div className="w-full ">
      <h1 className="text-center text-2xl font-semibold">Account Settings</h1>
      <hr />
      <div className=" grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 lg:gap-8  sm:p-12 sm:w-full lg:w-5/6 w-full lg:mx-auto ">
        <div className="profile col-span-1 lg:h-48 h-full w-full lg:mb-0  px-5 ">
          <div className="menu py-1 px-2 space-y-4 w-full mb-5">
            <p
              className={`${
                active === "profile" ? "bg-slate-300" : "bg-gray-100"
              } rounded-lg px-4 py-1 w-full cursor-pointer`}
              onClick={() => {
                activate("profile");
              }}
            >
              Profile Picture
            </p>
            <p
              className={`${
                active === "name" ? "bg-slate-300" : "bg-gray-100"
              } rounded-lg px-4 py-1 w-full cursor-pointer`}
              onClick={() => {
                activate("name");
              }}
            >
              user name{" "}
            </p>
            <p
              className={`${
                active === "bio" ? "bg-slate-300" : "bg-gray-100"
              } rounded-lg px-4 py-1 w-full cursor-pointer`}
              onClick={() => {
                activate("bio");
              }}
            >
              My Bio
            </p>
            <p
              className={`${
                active === "email" ? "bg-slate-300" : "bg-gray-100"
              } rounded-lg px-4 py-1 w-full cursor-pointer`}
              onClick={() => {
                activate("email");
              }}
            >
              Email
            </p>
            <p
              className={`${
                active === "phone" ? "bg-slate-300" : "bg-gray-100"
              } rounded-lg px-4 py-1 w-full cursor-pointer`}
              onClick={() => {
                activate("phone");
              }}
            >
              Phone
            </p>
            <p
              className={`${
                active === "security" ? "bg-slate-300" : "bg-gray-100"
              } rounded-lg px-4 py-1 w-full cursor-pointer`}
              onClick={() => {
                activate("security");
              }}
            >
              Security
            </p>

            <p
              className={`${
                active === "info" ? "bg-slate-300" : "bg-gray-100"
              } rounded-lg px-4 py-1 w-full cursor-pointer`}
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
              <div className="content  mb-4 rounded-lg w-full bg-white    ">
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg mb-8">
                    Set up Your Profile Picture{" "}
                  </h1>
                  <label htmlFor="pfimage">
                    {data_p && (
                      <img
                        src={`${
                          process.env.REACT_APP_API_BACKEND_URL +
                          data_p[0].user_data.image
                        }`}
                        className="rounded-md border  border-l object-cover max-h-[400px]  lg:max-h-[200px] w-full lg:w-2/5 "
                        alt=""
                      />
                    )}
                  </label>
                  <div className="preview grid grid-cols-1 lg:grid-cols-3 place-content-center lg:place-content-start">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Selected Preview"
                        className="rounded-md border  border-l object-cover max-h-[400px]  lg:max-h-[200px] w-full lg:w-2/5  "
                      />
                    )}
                  </div>
                  <div className="hidden w-full lg:w-3/5">
                    <input
                      type="file"
                      name="image"
                      id="pfimage"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="footer flex justify-end mt-2 p-3 rounded-lg bg-gray-100">
                  <button
                    className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white"
                    onClick={updateData}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "name" && (
              <div className="content  mb-4 rounded-lg w-full bg-white py-12  ">
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    UserName
                  </h1>
                  <p className="mt-3 mb-4 text-gray-500">
                    Please Enter your full name{" "}
                  </p>
                  <div className="in  w-full lg:w-3/5 mb-8">
                    <TEInput
                      type="text"
                      name="user_name"
                      // id="exampleFormControlInput1"
                      label="user_name"
                      onChange={handleChange}
                    ></TEInput>{" "}
                  </div>
                </div>
                <div className="footer flex justify-end bg-gray-100 mt-2 p-3 rounded-lg">
                  <button
                    className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white"
                    onClick={updateData}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "email" && (
              <div
                className={`content  mb-5 rounded-lg w-full  bg-white   py-12 `}
              >
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">Email</h1>
                  <p className="mt-3 mb-4 text-gray-500">
                    Please Enter A valid email{" "}
                  </p>
                  <div className="in  w-full lg:w-3/5 mb-8">
                    <TEInput
                      onChange={handleChange}
                      type="email"
                      // id="exampleFormControlInput1"
                      name="email"
                      label="email"
                    ></TEInput>{" "}
                  </div>
                </div>
                <div className="footer flex justify-end bg-gray-100 mt-2 p-3 rounded-lg">
                  <button
                    onClick={updateData}
                    className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "phone" && (
              <div
                className={`content  mb-5 rounded-lg w-full  bg-white  py-12`}
              >
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    Phone Number
                  </h1>
                  <p className="mt-3  text-gray-500 mb-8">
                    Please Enter Phone Number
                  </p>
                  <div className="in  w-full lg:w-3/5 mb-7">
                    <TEInput
                      onChange={handleChange}
                      type="number"
                      // id="exampleFormControlInput1"
                      name="phone"
                      label="phone number"
                    ></TEInput>{" "}
                  </div>
                </div>
                <div className="footer flex justify-end bg-gray-100 mt-2 p-3 rounded-lg">
                  <button
                    onClick={updateData}
                    className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "info" && (
              <div className="content bg-white   rounded-lg w-full py-6  mb-5 ">
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    Personal Information
                  </h1>
                  <div className="in  w-full space-y-4 lg:w-3/5 mb-5">
                    <TEInput
                      onChange={handleChange}
                      type="number"
                      // id="exampleFormControlInput1"
                      name="age"
                      label="age"
                    ></TEInput>{" "}
                    <TEInput
                      onChange={handleChange}
                      type="text"
                      name="country"
                      // id="exampleFormControlInput1"
                      label="Country"
                    ></TEInput>{" "}
                    <TEInput
                      onChange={handleChange}
                      type="text"
                      name="gender"
                      // id="exampleFormControlInput1"
                      label="Gender"
                    ></TEInput>{" "}
                  </div>
                </div>

                <div className="footer flex justify-end bg-gray-100 mt-2 p-3 rounded-lg">
                  <button
                    onClick={updateData}
                    className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            {active === "bio" && (
              <div className="content  mb-5 rounded-lg w-full  bg-white   py-8 ">
                <div className="p-4">
                  {" "}
                  <h1 className="font-semibold text-black text-lg ">
                    About Me
                  </h1>
                  <p className="mt-3 mb-4 text-gray-500">
                    Please Enter your bio
                  </p>
                  <div className="in  w-full  ">
                    <TextareaAutosize
                      onChange={handleChange}
                      // id="comment"
                      name="bio"
                      minRows={5}
                      className="px-0 h-max  w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write your bio "
                    />
                  </div>
                </div>
                <div className="footer flex justify-end bg-gray-100 mt-2 p-3 rounded-lg">
                  <button
                    onClick={updateData}
                    className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
          <>
            {active === "security" && (
              <div className="password mt-5 px-5 ">
                <div className="content  bg-white    rounded-lg w-full   mb-5  ">
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
                        onChange={handleChange}
                        type="text"
                        // id="exampleFormControlInput1"
                        name="password"
                        label="old password"
                      ></TEInput>{" "}
                    </div>
                    <p className="mt-3 mb-4 text-gray-500">
                      Please Enter Your new password
                    </p>
                    <div className="in  w-full lg:w-3/5">
                      <TEInput
                        onChange={handleChange}
                        type="text"
                        // id="exampleFormControlInput1"
                        label="new password"
                      ></TEInput>{" "}
                    </div>
                  </div>
                  <div className="footer flex justify-end bg-gray-100 mt-2 p-3 rounded-lg">
                    <button
                      onClick={updateData}
                      className="bg-blue-400 px-4 lg:py-2 py-1 rounded-lg text-white
                    "
                    >
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
